let duplicateTabs = [];
let allTabs = [];
let allGroups = [];
let settings = { warning: 20, danger: 30 };
let showAllDomains = false;
let showGroupDetails = false;
let domainTabsMap = {};
let undoStack = [];
let currentLang = 'en';

const GROUP_COLORS = ['grey', 'blue', 'red', 'yellow', 'green', 'pink', 'purple', 'cyan', 'orange'];

const LANGS = {
  en: {
    tabsOpen: 'tabs open',
    searchPlaceholder: 'Type name or URL to find tab...',
    searchTab: '🔍 Search tab',
    noAudioTabs: 'No tabs playing audio',
    audioTabs: '🔊 Tabs playing audio',
    mute: 'Mute',
    goTo: 'Go to',
    noDuplicates: 'No duplicate tabs',
    duplicateTabs: '🔄 Duplicate tabs',
    duplicateGroups: 'duplicate groups found:',
    noGroups: 'No groups',
    tabGroups: '📁 Tab Groups',
    tabs: 'tabs',
    collapsed: '(collapsed)',
    expand: 'Expand',
    collapse: 'Collapse',
    edit: 'Edit',
    ungroup: 'Ungroup',
    closeGroup: 'Close group',
    showAll: 'Show all',
    hideDetails: 'Hide details',
    showDetails: 'Show details',
    hideSome: 'Hide some',
    groupByDomain: 'Group by domain',
    closeAll: 'Close all tabs',
    byWindow: '📂 By window',
    byDomain: '🌐 By domain',
    window: 'Window',
    incognito: '(Incognito)',
    closeWindow: 'Close',
    noTemplates: 'No templates yet',
    yourTemplates: '📋 Your templates',
    open: 'Open',
    deleteTemplate: 'Delete template',
    editTemplate: 'Edit',
    templateName: 'Template name:',
    urlList: 'URL list (one URL per line):',
    colorPrompt: 'Color (grey/blue/red/yellow/green/pink/purple/cyan/orange):',
    saved: 'Saved!',
    updated: 'Updated template!',
    createdTemplate: 'Created new template!',
    createTemplate: '➕ Create template',
    saveCurrentTabs: '💾 Save current tabs',
    quickActions: '⚡ Quick actions',
    sortByDomain: '📑 Sort by domain',
    sortByTime: '🕐 Sort by time',
    closeLeft: '⬅️ Close left tabs',
    closeRight: '➡️ Close right tabs',
    pinAll: '📌 Pin all',
    unpinAll: '📍 Unpin all',
    suspendTabs: '💤 Suspend other tabs',
    bookmarkAll: '🔖 Bookmark all',
    sortedByDomain: 'Tabs sorted by domain!',
    sortedByTime: 'Tabs sorted by time!',
    pinnedAll: 'Pinned all tabs!',
    unpinnedAll: 'Unpinned all tabs!',
    suspended: 'Suspended tabs to save RAM!',
    suspendedCount: 'Suspended tabs to save RAM!',
    suspendExplain: 'Tabs will free up RAM but keep URL. Click tab to reload.',
    bookmarked: 'Saved tabs to bookmark!',
    undone: 'Undone!',
    undo: 'Undo',
    undoCloseLeft: 'Close left',
    undoCloseRight: 'Close right',
    undoSortDomain: 'Sort by domain',
    undoSortTime: 'Sort by time',
    confirm: 'Confirm',
    closeWindowConfirm: 'Close this window and all tabs?',
    closeDomainConfirm: 'Close all tabs of',
    closeGroupConfirm: 'Close tabs in this group?',
    ungroupConfirm: 'Remove tabs from all groups?',
    deleteConfirm: 'Delete template',
    importConfirm: 'Open tabs from file?',
    tooManyTabs: '🔥 Too many tabs! Close some for better performance.',
    manyTabs: '⚠️ Many tabs open, consider closing some!',
    minTime: 'Minimum time is 10 seconds!',
    copiedClipboard: 'Copied tabs list to clipboard!\nYou can paste and share.',
    invalidFile: 'Invalid file!',
    createdGroups: 'Created groups by domain!',
    openedTemplate: 'Opened template',
    groupedDomain: 'Grouped tabs into',
    avgTabs: 'Average',
    maxTabs: 'Highest',
    minTabs: 'Lowest',
    noData: 'No data yet',
    collapseAll: '🔽 Collapse all',
    expandAll: '🔼 Expand all',
    ungroupAll: '📤 Ungroup all',
    autoGroup: '🤖 Auto-group by domain',
    saveGroups: '💾 Save groups',
    loadGroups: '📂 Load groups',
    exportImport: '💾 Export/Import/Share',
    export: 'Export',
    import: 'Import',
    share: 'Share',
    autoClose: '🕐 Auto-close old tabs',
    closeAfter: 'Close unused tabs after:',
    hours: 'hrs',
    minutes: 'min',
    seconds: 'sec',
    saveTime: 'Save time',
    alertSettings: '⚙️ Alert settings',
    yellowFrom: 'Yellow from:',
    redFrom: 'Red from:',
    saveSettings: 'Save settings',
    shortcuts: '⌨️ Shortcuts',
    closeDuplicates: 'Close duplicates',
    sortTabs: 'Sort by domain',
    stats: '📊 Stats (24h)',
    recentHistory: '📜 Recent history',
    focusMode: '🎯 Focus Mode',
    focusModeOn: 'Focus mode ON',
    focusModeOff: 'Focus mode OFF',
    tabTimer: '⏱️ Tab Timer',
    tabNotes: '📝 Tab Notes',
    notePlaceholder: 'Add note for this tab...',
    saveNote: 'Save',
    timeSpent: 'Time spent',
    noTimeData: 'No time data yet'
  },
  vi: {
    tabsOpen: 'tabs đang mở',
    searchPlaceholder: 'Gõ tên hoặc URL để tìm tab...',
    searchTab: '🔍 Tìm kiếm tab',
    noAudioTabs: 'Không có tab nào đang phát âm thanh',
    audioTabs: '🔊 Tab đang phát âm thanh',
    mute: 'Tắt âm',
    goTo: 'Đi tới',
    noDuplicates: 'Không có tab trùng',
    duplicateTabs: '🔄 Tab trùng',
    duplicateGroups: 'nhóm tab trùng:',
    noGroups: 'Không có group nào',
    tabGroups: '📁 Tab Groups',
    tabs: 'tabs',
    collapsed: '(thu gọn)',
    expand: 'Mở rộng',
    collapse: 'Thu gọn',
    edit: 'Chỉnh sửa',
    ungroup: 'Bỏ group',
    closeGroup: 'Đóng group',
    showAll: 'Hiện tất cả',
    hideDetails: 'Ẩn chi tiết',
    showDetails: 'Hiện chi tiết',
    hideSome: 'Ẩn bớt',
    groupByDomain: 'Gom vào nhóm',
    closeAll: 'Đóng tất cả tabs',
    byWindow: '📂 Theo cửa sổ',
    byDomain: '🌐 Theo domain',
    window: 'Cửa sổ',
    incognito: '(Ẩn danh)',
    closeWindow: 'Đóng',
    noTemplates: 'Chưa có template nào',
    yourTemplates: '📋 Templates của bạn',
    open: 'Mở',
    deleteTemplate: 'Xóa template',
    editTemplate: 'Sửa',
    templateName: 'Tên template:',
    urlList: 'Danh sách URLs (mỗi URL một dòng):',
    colorPrompt: 'Màu (grey/blue/red/yellow/green/pink/purple/cyan/orange):',
    saved: 'Đã lưu!',
    updated: 'Đã cập nhật template!',
    createdTemplate: 'Đã tạo template mới!',
    createTemplate: '➕ Tạo template',
    saveCurrentTabs: '💾 Lưu tabs hiện tại',
    quickActions: '⚡ Thao tác nhanh',
    sortByDomain: '📑 Sắp xếp theo domain',
    sortByTime: '🕐 Sắp xếp theo thời gian',
    closeLeft: '⬅️ Đóng tabs bên trái',
    closeRight: '➡️ Đóng tabs bên phải',
    pinAll: '📌 Ghim tất cả',
    unpinAll: '📍 Bỏ ghim tất cả',
    suspendTabs: '💤 Tạm dừng các tab khác',
    suspendedCount: 'Đã tạm dừng tabs để tiết kiệm RAM!',
    suspendExplain: 'Tabs tạm dừng sẽ giải phóng RAM nhưng giữ URL. Click vào tab để tải lại.',
    bookmarkAll: '🔖 Bookmark tất cả',
    sortedByDomain: 'Đã sắp xếp tabs theo domain!',
    sortedByTime: 'Đã sắp xếp tabs theo thời gian mở!',
    pinnedAll: 'Đã ghim tất cả tabs!',
    unpinnedAll: 'Đã bỏ ghim tất cả tabs!',
    suspended: 'Đã suspend tabs để tiết kiệm RAM!',
    bookmarked: 'Đã lưu tabs vào bookmark!',
    undone: 'Đã hoàn tác!',
    undo: 'Hoàn tác',
    undoCloseLeft: 'Đóng bên trái',
    undoCloseRight: 'Đóng bên phải',
    undoSortDomain: 'Sắp xếp theo domain',
    undoSortTime: 'Sắp xếp theo thời gian',
    confirm: 'Xác nhận',
    closeWindowConfirm: 'Đóng cửa sổ này và tất cả tabs trong đó?',
    closeDomainConfirm: 'Đóng tất cả tabs của',
    closeGroupConfirm: 'Đóng tabs trong group này?',
    ungroupConfirm: 'Bỏ tabs khỏi tất cả groups?',
    deleteConfirm: 'Xóa template',
    importConfirm: 'Mở tabs từ file?',
    tooManyTabs: '🔥 Quá nhiều tabs! Hãy đóng bớt để máy chạy mượt hơn.',
    manyTabs: '⚠️ Đang mở khá nhiều tabs, cân nhắc đóng bớt nhé!',
    minTime: 'Thời gian tối thiểu là 10 giây!',
    copiedClipboard: 'Đã copy danh sách tabs vào clipboard!\nBạn có thể paste và gửi cho người khác.',
    invalidFile: 'File không hợp lệ!',
    createdGroups: 'Đã tạo groups theo domain!',
    openedTemplate: 'Đã mở template',
    groupedDomain: 'Đã gom tabs vào nhóm',
    avgTabs: 'Trung bình',
    maxTabs: 'Cao nhất',
    minTabs: 'Thấp nhất',
    noData: 'Chưa có dữ liệu',
    collapseAll: '🔽 Thu gọn tất cả',
    expandAll: '🔼 Mở rộng tất cả',
    ungroupAll: '📤 Bỏ tất cả groups',
    autoGroup: '🤖 Auto-group theo domain',
    saveGroups: '💾 Lưu groups',
    loadGroups: '📂 Khôi phục groups',
    exportImport: '💾 Export/Import/Chia sẻ',
    export: 'Export',
    import: 'Import',
    share: 'Chia sẻ',
    autoClose: '🕐 Tự động đóng tab cũ',
    closeAfter: 'Đóng tab không dùng sau:',
    hours: 'giờ',
    minutes: 'phút',
    seconds: 'giây',
    saveTime: 'Lưu thời gian',
    alertSettings: '⚙️ Cài đặt cảnh báo',
    yellowFrom: 'Vàng từ:',
    redFrom: 'Đỏ từ:',
    saveSettings: 'Lưu cài đặt',
    shortcuts: '⌨️ Phím tắt',
    closeDuplicates: 'Đóng tabs trùng',
    sortTabs: 'Sắp xếp theo domain',
    stats: '📊 Thống kê (24h qua)',
    recentHistory: '📜 Lịch sử gần đây',
    focusMode: '🎯 Chế độ tập trung',
    focusModeOn: 'Chế độ tập trung BẬT',
    focusModeOff: 'Chế độ tập trung TẮT',
    tabTimer: '⏱️ Thời gian sử dụng',
    tabNotes: '📝 Ghi chú tab',
    notePlaceholder: 'Thêm ghi chú cho tab này...',
    saveNote: 'Lưu',
    timeSpent: 'Thời gian dùng',
    noTimeData: 'Chưa có dữ liệu'
  }
};

function t(key) {
  return LANGS[currentLang][key] || key;
}

function loadLang() {
  chrome.storage.local.get(['lang'], (result) => {
    currentLang = result.lang || 'en';
    document.getElementById('langToggle').textContent = currentLang.toUpperCase();
    updateAllText();
  });
}

document.getElementById('langToggle').addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'vi' : 'en';
  chrome.storage.local.set({ lang: currentLang });
  document.getElementById('langToggle').textContent = currentLang.toUpperCase();
  updateAllText();
});

function updateAllText() {
  // Update placeholders and labels
  document.getElementById('searchInput').placeholder = t('searchPlaceholder');
  document.getElementById('toggleGroups').textContent = showGroupDetails ? t('hideDetails') : t('showDetails');
  document.getElementById('toggleDomains').textContent = showAllDomains ? t('hideSome') : t('showAll');
  
  // Update section titles
  document.getElementById('titleSearch').textContent = t('searchTab');
  document.getElementById('titleAudio').textContent = t('audioTabs');
  document.getElementById('titleDuplicates').textContent = t('duplicateTabs');
  document.getElementById('titleGroups').textContent = t('tabGroups');
  document.getElementById('titleWindows').textContent = t('byWindow');
  document.getElementById('titleDomains').textContent = t('byDomain');
  document.getElementById('titleTemplates').textContent = t('yourTemplates');
  document.getElementById('titleQuickActions').textContent = t('quickActions');
  document.getElementById('titleExport').textContent = t('exportImport');
  document.getElementById('titleAutoClose').textContent = t('autoClose');
  document.getElementById('titleAlerts').textContent = t('alertSettings');
  document.getElementById('titleShortcuts').textContent = t('shortcuts');
  document.getElementById('titleStats').textContent = t('stats');
  document.getElementById('titleHistory').textContent = t('recentHistory');
  
  // Update buttons
  document.getElementById('sortByDomain').textContent = t('sortByDomain');
  document.getElementById('sortByTime').textContent = t('sortByTime');
  document.getElementById('closeLeft').textContent = t('closeLeft');
  document.getElementById('closeRight').textContent = t('closeRight');
  document.getElementById('pinAll').textContent = t('pinAll');
  document.getElementById('unpinAll').textContent = t('unpinAll');
  document.getElementById('suspendTabs').textContent = t('suspendTabs');
  document.getElementById('bookmarkAll').textContent = t('bookmarkAll');
  document.getElementById('collapseAll').textContent = t('collapseAll');
  document.getElementById('expandAll').textContent = t('expandAll');
  document.getElementById('ungroupAll').textContent = t('ungroupAll');
  document.getElementById('autoGroupByDomain').textContent = t('autoGroup');
  document.getElementById('saveGroups').textContent = t('saveGroups');
  document.getElementById('loadGroups').textContent = t('loadGroups');
  document.getElementById('createTemplate').textContent = t('createTemplate');
  document.getElementById('saveCurrentAsTemplate').textContent = t('saveCurrentTabs');
  document.getElementById('exportTabs').textContent = t('export');
  document.getElementById('importTabs').textContent = t('import');
  document.getElementById('shareTabs').textContent = t('share');
  document.getElementById('saveAutoClose').textContent = t('saveTime');
  document.getElementById('saveSettings').textContent = t('saveSettings');
  
  // Update labels
  document.getElementById('labelCloseAfter').textContent = t('closeAfter');
  document.getElementById('labelHours').textContent = t('hours');
  document.getElementById('labelMinutes').textContent = t('minutes');
  document.getElementById('labelSeconds').textContent = t('seconds');
  document.getElementById('labelYellow').textContent = t('yellowFrom');
  document.getElementById('labelRed').textContent = t('redFrom');
  
  // Update shortcuts
  const shortcutDuplicates = document.getElementById('shortcutDuplicates');
  const shortcutQuickSwitch = document.getElementById('shortcutQuickSwitch');
  if (shortcutDuplicates) shortcutDuplicates.innerHTML = `<kbd>Ctrl+Shift+D</kbd> ${t('closeDuplicates')}`;
  if (shortcutQuickSwitch) shortcutQuickSwitch.innerHTML = `<kbd>Ctrl+Shift+Q</kbd> Quick switch`;
  const shortcutSuspend = document.getElementById('shortcutSuspend');
  if (shortcutSuspend) shortcutSuspend.innerHTML = `<kbd>Ctrl+Shift+S</kbd> Suspend tabs`;
  
  // Update new sections
  const titleFocusMode = document.getElementById('titleFocusMode');
  const titleTabNotes = document.getElementById('titleTabNotes');
  const titleTabTimer = document.getElementById('titleTabTimer');
  if (titleFocusMode) titleFocusMode.textContent = t('focusMode');
  if (titleTabNotes) titleTabNotes.textContent = t('tabNotes');
  if (titleTabTimer) titleTabTimer.textContent = t('tabTimer');
  
  // Re-render dynamic content
  if (allTabs.length > 0) {
    updateCount(allTabs);
    updateGroups();
    updateWindows();
    updateDomains(allTabs);
    findDuplicates(allTabs);
    updateAudioTabs(allTabs);
    renderTemplates();
    showStats();
    showHistory();
    updateUndoButton();
  }
}

// === DARK MODE ===
function loadDarkMode() {
  chrome.storage.local.get(['darkMode'], (result) => {
    if (result.darkMode) {
      document.body.classList.add('dark');
      document.getElementById('darkModeToggle').textContent = '☀️';
    }
  });
}

document.getElementById('darkModeToggle').addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  document.getElementById('darkModeToggle').textContent = isDark ? '☀️' : '🌙';
  chrome.storage.local.set({ darkMode: isDark });
});

// === SETTINGS ===
async function loadSettings() {
  const result = await chrome.storage.local.get(['warningLimit', 'dangerLimit', 'autoCloseSeconds', 'autoCloseEnabled', 'alertEnabled']);
  settings.warning = result.warningLimit || 20;
  settings.danger = result.dangerLimit || 30;
  settings.alertEnabled = result.alertEnabled !== false; // default true
  
  document.getElementById('warningLimit').value = settings.warning;
  document.getElementById('dangerLimit').value = settings.danger;
  
  const totalSeconds = result.autoCloseSeconds || 3600;
  document.getElementById('autoCloseHours').value = Math.floor(totalSeconds / 3600);
  document.getElementById('autoCloseMinutes').value = Math.floor((totalSeconds % 3600) / 60);
  document.getElementById('autoCloseSeconds').value = totalSeconds % 60;
  
  updateAutoCloseToggle(result.autoCloseEnabled);
  updateAlertToggle(settings.alertEnabled);
}

document.getElementById('saveSettings').addEventListener('click', async () => {
  const warning = parseInt(document.getElementById('warningLimit').value) || 20;
  const danger = parseInt(document.getElementById('dangerLimit').value) || 30;
  await chrome.storage.local.set({ warningLimit: warning, dangerLimit: danger });
  settings = { warning, danger };
  updateCount(allTabs);
  alert(t('saved'));
});

// === COUNT ===
function updateCount(tabs) {
  const countEl = document.getElementById('count');
  const msgEl = document.getElementById('warningMsg');
  const count = tabs.length;
  countEl.textContent = count;
  document.getElementById('tabsLabel').textContent = t('tabsOpen');
  
  countEl.className = '';
  msgEl.className = 'warning-msg';
  
  // Only show warning if alerts are enabled
  if (settings.alertEnabled) {
    if (count >= settings.danger) {
      countEl.classList.add('danger');
      msgEl.classList.add('show', 'danger');
      msgEl.textContent = t('tooManyTabs');
    } else if (count >= settings.warning) {
      countEl.classList.add('warning');
      msgEl.classList.add('show', 'warning');
      msgEl.textContent = t('manyTabs');
    }
  }
}

// === WINDOWS ===
async function updateWindows() {
  const windows = await chrome.windows.getAll({ populate: true });
  
  const html = windows.map((win, i) => {
    const incognitoText = win.incognito ? ` <span class="incognito">${t('incognito')}</span>` : '';
    return `<div class="window-item">
      <div class="info">
        <span>${t('window')} ${i + 1}${incognitoText}</span>
        <span> - ${win.tabs.length} ${t('tabs')}</span>
      </div>
      ${windows.length > 1 ? `<button class="close-btn" data-windowid="${win.id}" title="${t('closeWindow')}">${t('closeWindow')}</button>` : ''}
    </div>`;
  }).join('');
  
  document.getElementById('windows').innerHTML = html || `<div style="color:var(--text2)">${t('noData')}</div>`;
}

document.getElementById('windows').addEventListener('click', (e) => {
  if (e.target.classList.contains('close-btn')) {
    const windowId = parseInt(e.target.dataset.windowid);
    if (confirm(t('closeWindowConfirm'))) {
      chrome.windows.remove(windowId, () => location.reload());
    }
  }
});

// === DOMAINS ===
function updateDomains(tabs) {
  const domains = {};
  domainTabsMap = {};
  
  tabs.forEach(tab => {
    try {
      const url = new URL(tab.url);
      const domain = url.hostname || 'Khác';
      domains[domain] = (domains[domain] || 0) + 1;
      if (!domainTabsMap[domain]) domainTabsMap[domain] = [];
      domainTabsMap[domain].push(tab);
    } catch {
      domains['Khác'] = (domains['Khác'] || 0) + 1;
    }
  });
  
  const sorted = Object.entries(domains).sort((a, b) => b[1] - a[1]);
  const display = showAllDomains ? sorted : sorted.slice(0, 5);
  
  const html = display.map(([domain, count]) => 
    `<div class="domain-item">
      <div class="info"><span>${domain}</span> - <span>${count} ${t('tabs')}</span></div>
      <button class="group-btn" data-domain="${domain}" title="${t('groupByDomain')}">📑</button>
      <button class="close-btn" data-domain="${domain}" title="${t('closeAll')}">${t('closeWindow')}</button>
    </div>`
  ).join('');
  
  document.getElementById('domains').innerHTML = html;
  document.getElementById('toggleDomains').textContent = showAllDomains ? t('hideSome') : `${t('showAll')} (${sorted.length})`;
}

document.getElementById('toggleDomains').addEventListener('click', () => {
  showAllDomains = !showAllDomains;
  updateDomains(allTabs);
});

document.getElementById('domains').addEventListener('click', async (e) => {
  const domain = e.target.dataset.domain;
  if (!domain) return;
  
  if (e.target.classList.contains('close-btn')) {
    const tabIds = domainTabsMap[domain]?.map(t => t.id);
    if (tabIds && confirm(`${t('closeDomainConfirm')} ${domain}?`)) {
      chrome.tabs.remove(tabIds, () => location.reload());
    }
  } else if (e.target.classList.contains('group-btn')) {
    const tabs = domainTabsMap[domain];
    if (tabs && tabs.length > 0) {
      const tabIds = tabs.map(t => t.id);
      const group = await chrome.tabs.group({ tabIds });
      try { await chrome.tabGroups.update(group, { title: domain, collapsed: false }); } catch {}
      alert(`${t('groupedDomain')} "${domain}"`);
    }
  }
});

// === DUPLICATES ===
function findDuplicates(tabs) {
  const urlMap = {};
  
  tabs.forEach(tab => {
    if (!urlMap[tab.url]) urlMap[tab.url] = [];
    urlMap[tab.url].push(tab);
  });
  
  const duplicateGroups = Object.entries(urlMap).filter(([_, list]) => list.length > 1);
  const section = document.getElementById('duplicatesSection');
  const container = document.getElementById('duplicates');
  
  if (duplicateGroups.length === 0) {
    section.style.display = 'none';
    return;
  }
  
  section.style.display = 'block';
  let html = `<div style="margin-bottom:8px;color:var(--text2)">${duplicateGroups.length} ${t('duplicateGroups')}</div>`;
  
  duplicateGroups.forEach(([url, tabList]) => {
    const shortUrl = url.length > 40 ? url.substring(0, 40) + '...' : url;
    html += `<div class="duplicate-group"><div class="duplicate-group-title">🔗 ${shortUrl}</div>`;
    tabList.forEach((tab, index) => {
      html += `<div class="duplicate-item">
        <div class="info"><div class="title">${index + 1}. ${tab.title}</div></div>
        <button class="close-btn" data-tabid="${tab.id}">${t('closeWindow')}</button>
      </div>`;
    });
    html += '</div>';
  });
  
  container.innerHTML = html;
}

document.getElementById('duplicates').addEventListener('click', (e) => {
  if (e.target.classList.contains('close-btn')) {
    chrome.tabs.remove(parseInt(e.target.dataset.tabid), () => location.reload());
  }
});

// === SEARCH ===
document.getElementById('searchInput').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const resultsEl = document.getElementById('searchResults');
  
  if (!query) { resultsEl.innerHTML = ''; return; }
  
  const matches = allTabs.filter(tab => 
    tab.title.toLowerCase().includes(query) || tab.url.toLowerCase().includes(query)
  ).slice(0, 10);
  
  resultsEl.innerHTML = matches.map(tab => `
    <div class="search-item" data-tabid="${tab.id}" data-windowid="${tab.windowId}">
      <div class="title">${tab.title}</div>
      <div class="url">${tab.url}</div>
    </div>
  `).join('') || `<div style="padding:8px;color:var(--text2)">${t('noData')}</div>`;
});

document.getElementById('searchResults').addEventListener('click', (e) => {
  const item = e.target.closest('.search-item');
  if (item) {
    chrome.windows.update(parseInt(item.dataset.windowid), { focused: true });
    chrome.tabs.update(parseInt(item.dataset.tabid), { active: true });
  }
});

// === AUDIO TABS ===
function updateAudioTabs(tabs) {
  const audioTabs = tabs.filter(tab => tab.audible);
  const section = document.getElementById('audioSection');
  const container = document.getElementById('audioTabs');
  
  if (audioTabs.length === 0) {
    section.style.display = 'none';
    return;
  }
  
  section.style.display = 'block';
  container.innerHTML = audioTabs.map(tab => `
    <div class="audio-item">
      <span class="title">🔊 ${tab.title}</span>
      <button class="mute-btn" data-tabid="${tab.id}">${t('mute')}</button>
      <button class="goto-btn" data-tabid="${tab.id}" data-windowid="${tab.windowId}">${t('goTo')}</button>
    </div>
  `).join('');
}

document.getElementById('audioTabs').addEventListener('click', (e) => {
  const tabId = parseInt(e.target.dataset.tabid);
  if (e.target.classList.contains('goto-btn')) {
    chrome.windows.update(parseInt(e.target.dataset.windowid), { focused: true });
    chrome.tabs.update(tabId, { active: true });
  } else if (e.target.classList.contains('mute-btn')) {
    chrome.tabs.update(tabId, { muted: true }, () => {
      chrome.tabs.query({}, tabs => { allTabs = tabs; updateAudioTabs(tabs); });
    });
  }
});

// === AUTO CLOSE ===
function updateAutoCloseToggle(enabled) {
  document.getElementById('autoCloseToggle').classList.toggle('active', enabled);
  document.getElementById('autoCloseContent').classList.toggle('show', enabled);
}

document.getElementById('autoCloseToggle').addEventListener('click', async () => {
  const result = await chrome.storage.local.get(['autoCloseEnabled']);
  const newState = !result.autoCloseEnabled;
  await chrome.storage.local.set({ autoCloseEnabled: newState });
  updateAutoCloseToggle(newState);
  chrome.runtime.sendMessage({ action: 'updateAutoClose' });
});

// === ALERT SETTINGS ===
function updateAlertToggle(enabled) {
  document.getElementById('alertToggle').classList.toggle('active', enabled);
  document.getElementById('alertContent').classList.toggle('show', enabled);
}

document.getElementById('alertToggle').addEventListener('click', async () => {
  const result = await chrome.storage.local.get(['alertEnabled']);
  const newState = !result.alertEnabled;
  await chrome.storage.local.set({ alertEnabled: newState });
  updateAlertToggle(newState);
});

document.getElementById('saveAutoClose').addEventListener('click', async () => {
  const h = parseInt(document.getElementById('autoCloseHours').value) || 0;
  const m = parseInt(document.getElementById('autoCloseMinutes').value) || 0;
  const s = parseInt(document.getElementById('autoCloseSeconds').value) || 0;
  const total = h * 3600 + m * 60 + s;
  
  if (total < 10) { alert(t('minTime')); return; }
  
  await chrome.storage.local.set({ autoCloseSeconds: total });
  chrome.runtime.sendMessage({ action: 'updateAutoClose' });
  alert(t('saved'));
});

// === QUICK ACTIONS ===

// Sort by domain
document.getElementById('sortByDomain').addEventListener('click', async () => {
  await saveStateForUndo('undoSortDomain');
  const tabs = await chrome.tabs.query({ currentWindow: true });
  const sorted = [...tabs].sort((a, b) => {
    try {
      return new URL(a.url).hostname.localeCompare(new URL(b.url).hostname);
    } catch { return 0; }
  });
  for (let i = 0; i < sorted.length; i++) {
    await chrome.tabs.move(sorted[i].id, { index: i });
  }
  alert(t('sortedByDomain'));
});

// Sort by time (reverse current order)
document.getElementById('sortByTime').addEventListener('click', async () => {
  await saveStateForUndo('undoSortTime');
  const tabs = await chrome.tabs.query({ currentWindow: true });
  const sorted = [...tabs].sort((a, b) => a.id - b.id);
  for (let i = 0; i < sorted.length; i++) {
    await chrome.tabs.move(sorted[i].id, { index: i });
  }
  alert(t('sortedByTime'));
});

// Close tabs to the left
document.getElementById('closeLeft').addEventListener('click', async () => {
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const tabs = await chrome.tabs.query({ currentWindow: true });
  const toClose = tabs.filter(tab => tab.index < activeTab.index && !tab.pinned);
  if (toClose.length && confirm(`${t('closeLeft')} (${toClose.length})?`)) {
    await saveStateForUndo('undoCloseLeft');
    chrome.tabs.remove(toClose.map(tab => tab.id), () => location.reload());
  }
});

// Close tabs to the right
document.getElementById('closeRight').addEventListener('click', async () => {
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const tabs = await chrome.tabs.query({ currentWindow: true });
  const toClose = tabs.filter(tab => tab.index > activeTab.index && !tab.pinned);
  if (toClose.length && confirm(`${t('closeRight')} (${toClose.length})?`)) {
    await saveStateForUndo('undoCloseRight');
    chrome.tabs.remove(toClose.map(tab => tab.id), () => location.reload());
  }
});

// Update close left/right buttons state
async function updateCloseButtons() {
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const tabs = await chrome.tabs.query({ currentWindow: true });
  
  const leftTabs = tabs.filter(tab => tab.index < activeTab.index && !tab.pinned);
  const rightTabs = tabs.filter(tab => tab.index > activeTab.index && !tab.pinned);
  
  document.getElementById('closeLeft').disabled = leftTabs.length === 0;
  document.getElementById('closeRight').disabled = rightTabs.length === 0;
}

// Pin all
document.getElementById('pinAll').addEventListener('click', async () => {
  const tabs = await chrome.tabs.query({ currentWindow: true, pinned: false });
  // Pin theo thứ tự index để giữ thứ tự
  const sorted = [...tabs].sort((a, b) => a.index - b.index);
  for (const tab of sorted) {
    await chrome.tabs.update(tab.id, { pinned: true });
  }
  alert(`${t('pinnedAll')} (${tabs.length})`);
});

// Unpin all
document.getElementById('unpinAll').addEventListener('click', async () => {
  const tabs = await chrome.tabs.query({ currentWindow: true, pinned: true });
  // Unpin từ cuối lên để giữ thứ tự
  const sorted = [...tabs].sort((a, b) => b.index - a.index);
  for (const tab of sorted) {
    await chrome.tabs.update(tab.id, { pinned: false });
  }
  alert(`${t('unpinnedAll')} (${tabs.length})`);
});

// Suspend tabs (discard)
document.getElementById('suspendTabs').addEventListener('click', async () => {
  const tabs = await chrome.tabs.query({ currentWindow: true, active: false, discarded: false });
  let count = 0;
  for (const tab of tabs) {
    if (!tab.pinned && !tab.audible) {
      try { await chrome.tabs.discard(tab.id); count++; } catch {}
    }
  }
  alert(`${t('suspendedCount')} (${count})\n\n${t('suspendExplain')}`);
});

// Bookmark all
document.getElementById('bookmarkAll').addEventListener('click', async () => {
  const tabs = await chrome.tabs.query({ currentWindow: true });
  const folderName = `Tabs - ${new Date().toLocaleString()}`;
  const folder = await chrome.bookmarks.create({ title: folderName });
  for (const tab of tabs) {
    await chrome.bookmarks.create({ parentId: folder.id, title: tab.title, url: tab.url });
  }
  alert(`${t('bookmarked')} (${tabs.length})`);
});

// === EXPORT/IMPORT/SHARE ===
document.getElementById('exportTabs').addEventListener('click', () => {
  const data = allTabs.map(tab => ({ title: tab.title, url: tab.url }));
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `tabs-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
});

document.getElementById('importTabs').addEventListener('click', () => {
  document.getElementById('importFile').click();
});

document.getElementById('importFile').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const tabs = JSON.parse(event.target.result);
      if (confirm(`${t('importConfirm')} (${tabs.length})`)) {
        tabs.forEach(tab => chrome.tabs.create({ url: tab.url, active: false }));
      }
    } catch { alert(t('invalidFile')); }
  };
  reader.readAsText(file);
});

document.getElementById('shareTabs').addEventListener('click', () => {
  const data = allTabs.map(tab => `${tab.title}\n${tab.url}`).join('\n\n');
  navigator.clipboard.writeText(data).then(() => {
    alert(t('copiedClipboard'));
  });
});

// === STATS ===
function showStats() {
  chrome.storage.local.get(['history'], (result) => {
    const history = result.history || [];
    const last24h = history.slice(0, 24);
    
    if (last24h.length === 0) {
      document.getElementById('statsChart').innerHTML = `<div style="color:var(--text2);font-size:12px">${t('noData')}</div>`;
      return;
    }
    
    const max = Math.max(...last24h.map(h => h.count));
    const html = last24h.reverse().map(h => {
      const height = Math.max(5, (h.count / max) * 80);
      return `<div class="stats-bar" style="height:${height}px" data-info="${h.time}: ${h.count} ${t('tabs')}"></div>`;
    }).join('');
    
    document.getElementById('statsChart').innerHTML = html;
    
    const avg = Math.round(last24h.reduce((sum, h) => sum + h.count, 0) / last24h.length);
    const maxCount = Math.max(...last24h.map(h => h.count));
    const minCount = Math.min(...last24h.map(h => h.count));
    document.getElementById('statsInfo').innerHTML = `${t('avgTabs')}: ${avg} | ${t('maxTabs')}: ${maxCount} | ${t('minTabs')}: ${minCount}`;
  });
}

// === HISTORY ===
function showHistory() {
  chrome.storage.local.get(['history'], (result) => {
    const history = (result.history || []).slice(0, 5);
    document.getElementById('history').innerHTML = history.map(h => 
      `<div class="history-item"><span>${h.time}</span><span>${h.count} ${t('tabs')}</span></div>`
    ).join('') || `<div style="color:var(--text2);font-size:12px">${t('noData')}</div>`;
  });
}

// === UNDO ===
async function saveStateForUndo(action) {
  const tabs = await chrome.tabs.query({ currentWindow: true });
  
  // Lưu thông tin groups
  const groupsInfo = {};
  for (const tab of tabs) {
    if (tab.groupId && tab.groupId !== -1 && !groupsInfo[tab.groupId]) {
      try {
        const group = await chrome.tabGroups.get(tab.groupId);
        groupsInfo[tab.groupId] = { title: group.title, color: group.color, collapsed: group.collapsed };
      } catch {
        groupsInfo[tab.groupId] = { title: '', color: 'blue', collapsed: false };
      }
    }
  }
  
  const state = {
    action,
    tabs: tabs.map(t => ({ id: t.id, index: t.index, url: t.url, title: t.title, groupId: t.groupId, pinned: t.pinned })),
    groups: groupsInfo
  };
  
  undoStack.push(state);
  if (undoStack.length > 10) undoStack.shift();
  
  // Lưu vào storage để giữ sau khi reload
  await chrome.storage.local.set({ undoStack });
  updateUndoButton();
}

async function loadUndoStack() {
  const result = await chrome.storage.local.get(['undoStack']);
  undoStack = result.undoStack || [];
  updateUndoButton();
}

function updateUndoButton() {
  const btn = document.getElementById('undoBtn');
  if (undoStack.length > 0) {
    const action = undoStack[undoStack.length - 1].action;
    const actionText = t(action) || action;
    btn.disabled = false;
    btn.textContent = `↩️ ${t('undo')} (${actionText})`;
  } else {
    btn.disabled = true;
    btn.textContent = `↩️ ${t('undo')}`;
  }
}

document.getElementById('undoBtn').addEventListener('click', async () => {
  if (undoStack.length === 0) return;
  
  const state = undoStack.pop();
  await chrome.storage.local.set({ undoStack });
  const currentTabs = await chrome.tabs.query({ currentWindow: true });
  const currentTabIds = currentTabs.map(t => t.id);
  
  // Tìm tabs đã bị đóng và mở lại
  const closedTabs = state.tabs.filter(t => !currentTabIds.includes(t.id));
  const oldIdToNewId = {};
  
  for (const tab of closedTabs) {
    try {
      const newTab = await chrome.tabs.create({ url: tab.url, active: false });
      oldIdToNewId[tab.id] = newTab.id;
    } catch {}
  }
  
  // Cập nhật lại tabs hiện tại
  const updatedCurrentTabs = await chrome.tabs.query({ currentWindow: true });
  
  // Ungroup tất cả tabs trước
  const groupedTabs = updatedCurrentTabs.filter(t => t.groupId !== -1);
  if (groupedTabs.length > 0) {
    try {
      await chrome.tabs.ungroup(groupedTabs.map(t => t.id));
    } catch {}
  }
  
  // Restore vị trí tabs theo thứ tự index
  const sortedTabs = [...state.tabs].sort((a, b) => a.index - b.index);
  for (const tab of sortedTabs) {
    const tabId = oldIdToNewId[tab.id] || tab.id;
    try {
      await chrome.tabs.move(tabId, { index: tab.index });
    } catch {}
  }
  
  // Tạo lại groups và thêm tabs vào
  const groupTabs = {};
  for (const tab of state.tabs) {
    if (tab.groupId && tab.groupId !== -1) {
      if (!groupTabs[tab.groupId]) groupTabs[tab.groupId] = [];
      const tabId = oldIdToNewId[tab.id] || tab.id;
      groupTabs[tab.groupId].push(tabId);
    }
  }
  
  for (const [oldGroupId, tabIds] of Object.entries(groupTabs)) {
    try {
      const newGroupId = await chrome.tabs.group({ tabIds });
      const groupInfo = state.groups[oldGroupId] || { title: '', color: 'blue' };
      try {
        await chrome.tabGroups.update(newGroupId, { 
          title: groupInfo.title, 
          color: groupInfo.color,
          collapsed: groupInfo.collapsed 
        });
      } catch {}
    } catch {}
  }
  
  updateUndoButton();
  alert(t('undone'));
  location.reload();
});

// === TAB GROUPS ===
async function updateGroups() {
  allGroups = [];
  
  // Lấy tất cả groupId từ tabs  
  const groupIds = new Set();
  for (const tab of allTabs) {
    if (tab.groupId !== undefined && tab.groupId !== -1) {
      groupIds.add(tab.groupId);
    }
  }
  
  // Thử query trực tiếp từ chrome.tabGroups
  try {
    const groups = await chrome.tabGroups.query({});
    if (groups && groups.length > 0) {
      allGroups = groups;
    }
  } catch {}
  
  // Fallback: tạo thông tin group từ tabs nếu API không trả về
  if (allGroups.length === 0 && groupIds.size > 0) {
    let index = 1;
    for (const gid of groupIds) {
      const groupTabs = allTabs.filter(t => t.groupId === gid);
      if (groupTabs.length > 0) {
        allGroups.push({
          id: gid,
          title: `Group ${index}`,
          color: 'blue',
          collapsed: false,
          tabCount: groupTabs.length
        });
        index++;
      }
    }
  }
  
  const container = document.getElementById('groupsList');
  const toggleBtn = document.getElementById('toggleGroups');
  
  if (allGroups.length === 0) {
    container.innerHTML = `<div style="color:var(--text2);font-size:12px">${t('noGroups')}</div>`;
    toggleBtn.style.display = 'none';
    return;
  }
  
  toggleBtn.style.display = 'inline';
  
  let html = '';
  for (const group of allGroups) {
    const tabs = allTabs.filter(t => t.groupId === group.id);
    const colorHex = getColorHex(group.color);
    
    html += `<div class="group-item" style="border-left-color:${colorHex}" data-groupid="${group.id}">
      <div class="info">
        <div class="title">${group.title || 'Untitled'}</div>
        <div class="count">${tabs.length} ${t('tabs')} ${group.collapsed ? t('collapsed') : ''}</div>
      </div>
      <div class="actions">
        <button class="toggle-collapse-btn" data-groupid="${group.id}" title="${group.collapsed ? t('expand') : t('collapse')}">${group.collapsed ? '🔼' : '🔽'}</button>
        <button class="edit-group-btn" data-groupid="${group.id}" title="${t('edit')}">✏️</button>
        <button class="ungroup-btn" data-groupid="${group.id}" title="${t('ungroup')}">📤</button>
        <button class="close-btn" data-groupid="${group.id}" title="${t('closeGroup')}">✖️</button>
      </div>
    </div>`;
    
    if (showGroupDetails) {
      html += `<div class="group-tabs" data-groupid="${group.id}">`;
      html += `<div class="color-picker">`;
      GROUP_COLORS.forEach(c => {
        html += `<button class="color-btn" style="background:${getColorHex(c)}" data-groupid="${group.id}" data-color="${c}"></button>`;
      });
      html += `</div>`;
      html += `<div style="margin-top:5px">
        <input type="text" class="group-name-input" data-groupid="${group.id}" value="${group.title || ''}" placeholder="Tên group" style="width:100%;padding:5px;border:1px solid var(--border);border-radius:4px;background:var(--bg);color:var(--text)">
      </div>`;
      html += `<div style="margin-top:8px;font-size:11px;color:var(--text2)">Di chuyển tab sang group khác:</div>`;
      tabs.forEach(tab => {
        html += `<div class="group-tab-item">
          <span class="tab-title">${tab.title}</span>
          <select class="move-tab-select" data-tabid="${tab.id}">
            <option value="">-- Chọn --</option>
            <option value="-1">Bỏ khỏi group</option>
            ${allGroups.filter(g => g.id !== group.id).map(g => `<option value="${g.id}">${g.title || 'Untitled'}</option>`).join('')}
          </select>
        </div>`;
      });
      html += `</div>`;
    }
  }
  
  container.innerHTML = html;
}

function getColorHex(color) {
  const colors = {
    grey: '#5f6368', blue: '#4285f4', red: '#ea4335', yellow: '#fbbc04',
    green: '#34a853', pink: '#e91e63', purple: '#9c27b0', cyan: '#00bcd4', orange: '#ff9800'
  };
  return colors[color] || '#5f6368';
}

document.getElementById('toggleGroups').addEventListener('click', () => {
  showGroupDetails = !showGroupDetails;
  document.getElementById('toggleGroups').textContent = showGroupDetails ? t('hideDetails') : t('showDetails');
  updateGroups();
});

document.getElementById('groupsList').addEventListener('click', async (e) => {
  const groupId = parseInt(e.target.dataset.groupid);
  if (!groupId) return;
  
  if (e.target.classList.contains('toggle-collapse-btn')) {
    const group = allGroups.find(g => g.id === groupId);
    try {
      await chrome.tabGroups.update(groupId, { collapsed: !group.collapsed });
    } catch {
      // Fallback: focus vào tab đầu tiên của group
      const firstTab = allTabs.find(t => t.groupId === groupId);
      if (firstTab) {
        await chrome.tabs.update(firstTab.id, { active: true });
      }
    }
    location.reload();
  } else if (e.target.classList.contains('ungroup-btn')) {
    const tabs = allTabs.filter(t => t.groupId === groupId);
    await chrome.tabs.ungroup(tabs.map(t => t.id));
    location.reload();
  } else if (e.target.classList.contains('close-btn')) {
    const tabs = allTabs.filter(t => t.groupId === groupId);
    if (confirm(`Đóng ${tabs.length} tabs trong group này?`)) {
      await chrome.tabs.remove(tabs.map(t => t.id));
      location.reload();
    }
  } else if (e.target.classList.contains('edit-group-btn')) {
    showGroupDetails = true;
    document.getElementById('toggleGroups').textContent = t('hideDetails');
    updateGroups();
  } else if (e.target.classList.contains('color-btn')) {
    await chrome.tabGroups.update(groupId, { color: e.target.dataset.color });
    updateGroups();
  }
});

document.getElementById('groupsList').addEventListener('change', async (e) => {
  if (e.target.classList.contains('move-tab-select')) {
    const tabId = parseInt(e.target.dataset.tabid);
    const targetGroupId = parseInt(e.target.value);
    
    if (targetGroupId === -1) {
      await chrome.tabs.ungroup(tabId);
    } else if (targetGroupId) {
      await chrome.tabs.group({ tabIds: tabId, groupId: targetGroupId });
    }
    location.reload();
  } else if (e.target.classList.contains('group-name-input')) {
    const groupId = parseInt(e.target.dataset.groupid);
    await chrome.tabGroups.update(groupId, { title: e.target.value });
  }
});

document.getElementById('groupsList').addEventListener('input', async (e) => {
  if (e.target.classList.contains('group-name-input')) {
    const groupId = parseInt(e.target.dataset.groupid);
    await chrome.tabGroups.update(groupId, { title: e.target.value });
  }
});

// Collapse/Expand all
document.getElementById('collapseAll').addEventListener('click', async () => {
  for (const group of allGroups) {
    await chrome.tabGroups.update(group.id, { collapsed: true });
  }
  updateGroups();
});

document.getElementById('expandAll').addEventListener('click', async () => {
  for (const group of allGroups) {
    await chrome.tabGroups.update(group.id, { collapsed: false });
  }
  updateGroups();
});

// Ungroup all
document.getElementById('ungroupAll').addEventListener('click', async () => {
  const groupedTabs = allTabs.filter(tab => tab.groupId !== -1);
  if (groupedTabs.length && confirm(`${t('ungroupConfirm')} (${groupedTabs.length})`)) {
    await chrome.tabs.ungroup(groupedTabs.map(tab => tab.id));
    location.reload();
  }
});

// Auto-group by domain
document.getElementById('autoGroupByDomain').addEventListener('click', async () => {
  const domainTabs = {};
  allTabs.forEach(tab => {
    if (tab.groupId !== -1) return; // Skip already grouped
    try {
      const domain = new URL(tab.url).hostname;
      if (!domainTabs[domain]) domainTabs[domain] = [];
      domainTabs[domain].push(tab.id);
    } catch {}
  });
  
  let count = 0;
  for (const [domain, tabIds] of Object.entries(domainTabs)) {
    if (tabIds.length >= 2) {
      const groupId = await chrome.tabs.group({ tabIds });
      await chrome.tabGroups.update(groupId, { title: domain });
      count++;
    }
  }
  
  alert(`${t('createdGroups')} (${count})`);

  location.reload();
});

// Save groups
document.getElementById('saveGroups').addEventListener('click', async () => {
  const groupsData = [];
  for (const group of allGroups) {
    const tabs = allTabs.filter(t => t.groupId === group.id);
    groupsData.push({
      title: group.title,
      color: group.color,
      collapsed: group.collapsed,
      tabs: tabs.map(t => ({ title: t.title, url: t.url }))
    });
  }
  
  const blob = new Blob([JSON.stringify(groupsData, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `tab-groups-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
});

// Load groups
document.getElementById('loadGroups').addEventListener('click', () => {
  document.getElementById('loadGroupsFile').click();
});

document.getElementById('loadGroupsFile').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = async (event) => {
    try {
      const groupsData = JSON.parse(event.target.result);
      
      for (const groupData of groupsData) {
        // Create tabs
        const tabIds = [];
        for (const tab of groupData.tabs) {
          const newTab = await chrome.tabs.create({ url: tab.url, active: false });
          tabIds.push(newTab.id);
        }
        
        // Create group
        if (tabIds.length > 0) {
          const groupId = await chrome.tabs.group({ tabIds });
          await chrome.tabGroups.update(groupId, {
            title: groupData.title,
            color: groupData.color,
            collapsed: groupData.collapsed
          });
        }
      }
      
      alert(`Đã khôi phục ${groupsData.length} groups!`);
      location.reload();
    } catch { alert('File không hợp lệ!'); }
  };
  reader.readAsText(file);
});

// === CUSTOM TEMPLATES ===
async function loadTemplates() {
  const result = await chrome.storage.local.get(['customTemplates']);
  return result.customTemplates || [];
}

async function saveTemplates(templates) {
  await chrome.storage.local.set({ customTemplates: templates });
}

async function renderTemplates() {
  const templates = await loadTemplates();
  const container = document.getElementById('templatesList');
  
  if (templates.length === 0) {
    container.innerHTML = `<div style="color:var(--text2);font-size:12px">${t('noTemplates')}</div>`;
    return;
  }
  
  container.innerHTML = templates.map((tpl, i) => `
    <div class="template-item" data-index="${i}">
      <div class="info">
        <span class="title">${tpl.title}</span>
        <span class="count">(${tpl.urls.length} ${t('tabs')})</span>
      </div>
      <div class="actions">
        <button class="use-template-btn btn-green" data-index="${i}" title="${t('open')}">${t('open')}</button>
        <button class="edit-template-btn" data-index="${i}" title="${t('edit')}">✏️</button>
        <button class="close-btn delete-template-btn" data-index="${i}" title="${t('deleteTemplate')}">✖️</button>
      </div>
    </div>
  `).join('');
}

document.getElementById('templatesList').addEventListener('click', async (e) => {
  const index = parseInt(e.target.dataset.index);
  const templates = await loadTemplates();
  
  if (e.target.classList.contains('use-template-btn')) {
    const template = templates[index];
    const tabIds = [];
    for (const url of template.urls) {
      const tab = await chrome.tabs.create({ url, active: false });
      tabIds.push(tab.id);
    }
    if (tabIds.length > 0) {
      const groupId = await chrome.tabs.group({ tabIds });
      try { await chrome.tabGroups.update(groupId, { title: template.title, color: template.color || 'blue' }); } catch {}
    }
    alert(`${t('openedTemplate')} "${template.title}"!`);
  } else if (e.target.classList.contains('delete-template-btn')) {
    if (confirm(`${t('deleteConfirm')} "${templates[index].title}"?`)) {
      templates.splice(index, 1);
      await saveTemplates(templates);
      renderTemplates();
    }
  } else if (e.target.classList.contains('edit-template-btn')) {
    editTemplate(index);
  }
});

function editTemplate(index = -1) {
  loadTemplates().then(templates => {
    const template = index >= 0 ? templates[index] : { title: '', color: 'blue', urls: [] };
    
    const title = prompt(t('templateName'), template.title);
    if (!title) return;
    
    const urlsStr = prompt(t('urlList'), template.urls.join('\n'));
    if (urlsStr === null) return;
    
    const urls = urlsStr.split('\n').map(u => u.trim()).filter(u => u.startsWith('http'));
    if (urls.length === 0) { alert(t('invalidFile')); return; }
    
    const color = prompt(t('colorPrompt'), template.color) || 'blue';
    
    if (index >= 0) {
      templates[index] = { title, color, urls };
    } else {
      templates.push({ title, color, urls });
    }
    
    saveTemplates(templates).then(() => {
      renderTemplates();
      alert(index >= 0 ? t('updated') : t('createdTemplate'));
    });
  });
}

document.getElementById('saveCurrentAsTemplate').addEventListener('click', async () => {
  const title = prompt(t('templateName'));
  if (!title) return;
  
  const tabs = await chrome.tabs.query({ currentWindow: true });
  const urls = tabs.map(tab => tab.url).filter(u => u.startsWith('http'));
  
  const templates = await loadTemplates();
  templates.push({ title, color: 'blue', urls });
  await saveTemplates(templates);
  await renderTemplates();
  alert(`${t('saved')} ${urls.length} tabs → "${title}"`);
});

document.getElementById('createTemplate').addEventListener('click', () => editTemplate(-1));

// === INIT ===
// === FOCUS MODE ===
async function updateFocusMode() {
  const result = await chrome.storage.local.get(['focusModeActive', 'focusModeHiddenTabs']);
  const isActive = result.focusModeActive || false;
  document.getElementById('focusModeToggle').classList.toggle('active', isActive);
  
  const hiddenCount = (result.focusModeHiddenTabs || []).length;
  document.getElementById('focusModeStatus').textContent = isActive 
    ? `${t('focusModeOn')} (${hiddenCount} tabs hidden)` 
    : '';
}

document.getElementById('focusModeToggle').addEventListener('click', async () => {
  chrome.runtime.sendMessage({ action: 'toggleFocusMode' });
  setTimeout(() => location.reload(), 500);
});

// === TAB NOTES ===
async function loadTabNote() {
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const result = await chrome.storage.local.get(['tabNotes']);
  const notes = result.tabNotes || {};
  document.getElementById('tabNoteInput').value = notes[activeTab.url] || '';
  document.getElementById('tabNoteInput').placeholder = t('notePlaceholder');
  document.getElementById('saveTabNote').textContent = t('saveNote');
}

document.getElementById('saveTabNote').addEventListener('click', async () => {
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const note = document.getElementById('tabNoteInput').value;
  const result = await chrome.storage.local.get(['tabNotes']);
  const notes = result.tabNotes || {};
  
  if (note.trim()) {
    notes[activeTab.url] = note;
  } else {
    delete notes[activeTab.url];
  }
  
  await chrome.storage.local.set({ tabNotes: notes });
  alert(t('saved'));
});

// === TAB TIMER ===
async function updateTabTimer() {
  const result = await chrome.storage.local.get(['tabTimeSpent']);
  const timeSpent = result.tabTimeSpent || {};
  const container = document.getElementById('tabTimerList');
  
  // Get tab info for current tabs
  const tabsWithTime = [];
  for (const tab of allTabs) {
    if (timeSpent[tab.id]) {
      tabsWithTime.push({
        title: tab.title,
        time: timeSpent[tab.id],
        id: tab.id
      });
    }
  }
  
  if (tabsWithTime.length === 0) {
    container.innerHTML = `<div style="color:var(--text2);font-size:12px">${t('noTimeData')}</div>`;
    return;
  }
  
  // Sort by time spent
  tabsWithTime.sort((a, b) => b.time - a.time);
  
  container.innerHTML = tabsWithTime.slice(0, 10).map(tab => {
    const mins = Math.floor(tab.time / 60000);
    const secs = Math.floor((tab.time % 60000) / 1000);
    const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    return `<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border);font-size:12px">
      <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${tab.title}</span>
      <span style="margin-left:10px;color:var(--text2)">${timeStr}</span>
    </div>`;
  }).join('');
}

async function init() {
  loadDarkMode();
  loadLang();
  await loadSettings();
  await loadUndoStack();
  
  allTabs = await chrome.tabs.query({});
  updateCount(allTabs);
  await updateFocusMode();
  await loadTabNote();
  await updateTabTimer();
  await updateGroups();
  await updateWindows();
  updateDomains(allTabs);
  findDuplicates(allTabs);
  updateAudioTabs(allTabs);
  await renderTemplates();
  showStats();
  showHistory();
  updateUndoButton();
  await updateCloseButtons();
}

init();
