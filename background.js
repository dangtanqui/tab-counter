// === SETTINGS ===
async function getSettings() {
  const result = await chrome.storage.local.get(['warningLimit', 'dangerLimit', 'alertEnabled', 'lang']);
  return { 
    warning: result.warningLimit || 20, 
    danger: result.dangerLimit || 30,
    alertEnabled: result.alertEnabled !== false,
    lang: result.lang || 'en'
  };
}

// === BADGE ===
async function updateBadge() {
  const tabs = await chrome.tabs.query({});
  const count = tabs.length;
  const settings = await getSettings();
  
  chrome.action.setBadgeText({ text: count.toString() });
  chrome.action.setBadgeBackgroundColor({ color: '#4285f4' });
  
  // Only show warnings if alerts are enabled
  if (settings.alertEnabled) {
    if (count >= settings.danger) {
      chrome.action.setBadgeBackgroundColor({ color: '#db4437' });
      showWarningNotification(count, 'danger');
    } else if (count >= settings.warning) {
      chrome.action.setBadgeBackgroundColor({ color: '#f4b400' });
      showWarningNotification(count, 'warning');
    }
  }
  
  saveHistory(count);
}

async function showWarningNotification(count, level) {
  const result = await chrome.storage.local.get(['lang']);
  const isVI = result.lang === 'vi';
  
  let msg;
  if (level === 'danger') {
    msg = isVI 
      ? `🔥 Bạn đang mở ${count} tabs! Hãy đóng bớt để máy chạy mượt hơn.`
      : `🔥 Too many tabs (${count})! Close some for better performance.`;
  } else {
    msg = isVI
      ? `⚠️ Bạn đang mở ${count} tabs, cân nhắc đóng bớt nhé!`
      : `⚠️ Many tabs open (${count}), consider closing some!`;
  }
  
  showNotification(msg);
}

// === NOTIFICATION ===
let lastNotificationCount = 0;
function showNotification(message) {
  chrome.tabs.query({}, (tabs) => {
    if (tabs.length !== lastNotificationCount) {
      lastNotificationCount = tabs.length;
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Tab Counter',
        message: message
      });
    }
  });
}

// === HISTORY ===
function saveHistory(count) {
  const now = new Date();
  const entry = {
    count,
    time: now.toLocaleTimeString('vi-VN'),
    date: now.toLocaleDateString('vi-VN')
  };
  
  chrome.storage.local.get(['history'], (result) => {
    let history = result.history || [];
    history.unshift(entry);
    history = history.slice(0, 100);
    chrome.storage.local.set({ history });
  });
}

// === TAB TIMER ===
let tabTimeSpent = {};
let currentActiveTab = null;
let lastActiveTime = Date.now();

async function updateTabTimer() {
  if (currentActiveTab) {
    const now = Date.now();
    const elapsed = now - lastActiveTime;
    tabTimeSpent[currentActiveTab] = (tabTimeSpent[currentActiveTab] || 0) + elapsed;
    await chrome.storage.local.set({ tabTimeSpent });
  }
  lastActiveTime = Date.now();
}

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  await updateTabTimer();
  currentActiveTab = activeInfo.tabId;
  tabLastActive[activeInfo.tabId] = Date.now();
  
  // Save to recent tabs for quick switch
  const result = await chrome.storage.local.get(['recentTabs']);
  let recentTabs = result.recentTabs || [];
  recentTabs = recentTabs.filter(id => id !== activeInfo.tabId);
  recentTabs.unshift(activeInfo.tabId);
  recentTabs = recentTabs.slice(0, 10);
  await chrome.storage.local.set({ recentTabs });
});

// === FOCUS MODE ===
async function toggleFocusMode() {
  const result = await chrome.storage.local.get(['focusModeActive', 'focusModeHiddenTabs', 'focusModeGroups']);
  
  if (result.focusModeActive) {
    // Exit focus mode - restore hidden tabs with groups
    const hiddenTabs = result.focusModeHiddenTabs || [];
    const groupsInfo = result.focusModeGroups || {};
    const groupTabs = {}; // oldGroupId -> [newTabIds]
    
    // Create tabs and track which group they belong to
    for (const tabData of hiddenTabs) {
      try {
        const newTab = await chrome.tabs.create({ url: tabData.url, active: false });
        if (tabData.groupId && tabData.groupId !== -1) {
          if (!groupTabs[tabData.groupId]) groupTabs[tabData.groupId] = [];
          groupTabs[tabData.groupId].push(newTab.id);
        }
      } catch {}
    }
    
    // Recreate groups - same logic as popup.js undo
    for (const [oldGroupId, tabIds] of Object.entries(groupTabs)) {
      try {
        const newGroupId = await chrome.tabs.group({ tabIds });
        const groupInfo = groupsInfo[oldGroupId] || { title: '', color: 'blue' };
        try {
          await chrome.tabGroups.update(newGroupId, { 
            title: groupInfo.title, 
            color: groupInfo.color
          });
        } catch {}
      } catch {}
    }
    
    await chrome.storage.local.set({ focusModeActive: false, focusModeHiddenTabs: [], focusModeGroups: {} });
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'Tab Counter',
      message: 'Focus mode OFF - Tabs restored'
    });
  } else {
    // Enter focus mode - hide other tabs
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const allTabs = await chrome.tabs.query({ currentWindow: true });
    const tabsToHide = allTabs.filter(t => t.id !== activeTab.id && !t.pinned);
    
    // Save group info - same logic as popup.js saveStateForUndo
    const groupsInfo = {};
    for (const tab of tabsToHide) {
      if (tab.groupId && tab.groupId !== -1 && !groupsInfo[tab.groupId]) {
        try {
          const group = await chrome.tabGroups.get(tab.groupId);
          groupsInfo[tab.groupId] = { title: group.title, color: group.color, collapsed: group.collapsed };
        } catch {
          groupsInfo[tab.groupId] = { title: '', color: 'blue', collapsed: false };
        }
      }
    }
    
    const hiddenTabs = tabsToHide.map(t => ({ url: t.url, title: t.title, groupId: t.groupId }));
    await chrome.storage.local.set({ focusModeActive: true, focusModeHiddenTabs: hiddenTabs, focusModeGroups: groupsInfo });
    
    await chrome.tabs.remove(tabsToHide.map(t => t.id));
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'Tab Counter',
      message: `Focus mode ON - ${tabsToHide.length} tabs hidden`
    });
  }
}

// === QUICK SWITCH ===
async function quickSwitch() {
  const result = await chrome.storage.local.get(['recentTabs']);
  const recentTabs = result.recentTabs || [];
  
  if (recentTabs.length >= 2) {
    const previousTab = recentTabs[1];
    try {
      await chrome.tabs.update(previousTab, { active: true });
    } catch {
      // Tab might be closed, try next one
      if (recentTabs.length >= 3) {
        try {
          await chrome.tabs.update(recentTabs[2], { active: true });
        } catch {}
      }
    }
  }
}

// === AUTO CLOSE ===
let tabLastActive = {};

// Tab activity tracking is handled in the onActivated listener above (line 101)

chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabLastActive[tabId];
});

async function checkInactiveTabs() {
  const result = await chrome.storage.local.get(['autoCloseEnabled', 'autoCloseSeconds']);
  if (!result.autoCloseEnabled) return;
  
  const maxAge = (result.autoCloseSeconds || 3600) * 1000;
  const now = Date.now();
  const tabs = await chrome.tabs.query({});
  
  for (const tab of tabs) {
    if (tab.pinned || tab.audible || tab.active) continue;
    const lastActive = tabLastActive[tab.id] || now;
    if (now - lastActive > maxAge) {
      chrome.tabs.remove(tab.id);
    }
  }
}

setInterval(checkInactiveTabs, 60000);

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === 'updateAutoClose') checkInactiveTabs();
  if (msg.action === 'toggleFocusMode') toggleFocusMode();
});

// Initialize tab activity
chrome.tabs.query({}, (tabs) => {
  const now = Date.now();
  tabs.forEach(tab => { tabLastActive[tab.id] = now; });
});

// === KEYBOARD SHORTCUTS ===
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'close-duplicates') {
    const tabs = await chrome.tabs.query({});
    const urlMap = {};
    const toClose = [];
    tabs.forEach(tab => {
      if (urlMap[tab.url]) toClose.push(tab.id);
      else urlMap[tab.url] = true;
    });
    if (toClose.length) chrome.tabs.remove(toClose);
  }
  
  if (command === 'sort-tabs') {
    const tabs = await chrome.tabs.query({ currentWindow: true });
    const sorted = [...tabs].sort((a, b) => {
      try { return new URL(a.url).hostname.localeCompare(new URL(b.url).hostname); }
      catch { return 0; }
    });
    for (let i = 0; i < sorted.length; i++) {
      await chrome.tabs.move(sorted[i].id, { index: i });
    }
  }
  
  if (command === 'suspend-tabs') {
    const tabs = await chrome.tabs.query({ currentWindow: true, active: false, discarded: false });
    for (const tab of tabs) {
      if (!tab.pinned && !tab.audible) {
        try { await chrome.tabs.discard(tab.id); } catch {}
      }
    }
  }
  
  if (command === 'quick-switch') {
    await quickSwitch();
  }
  
  if (command === 'focus-mode') {
    await toggleFocusMode();
  }
});

// === EVENTS ===
chrome.tabs.onCreated.addListener(updateBadge);
chrome.tabs.onRemoved.addListener(updateBadge);

updateBadge();
