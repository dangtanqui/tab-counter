# Tab Counter - Professional Tab Management

A Chrome extension to help you manage, organize, and optimize your browsing experience.

![Version](https://img.shields.io/badge/version-4.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **Tab Counter** - Count tabs across all windows including incognito
- **Search Tabs** - Find tabs by title or URL instantly
- **Tab Groups** - Manage, create, edit Chrome tab groups
- **Sort Tabs** - Organize by domain or time opened
- **Duplicate Detection** - Find and close duplicate tabs
- **Auto-close** - Automatically close inactive tabs after set time
- **Quick Actions** - Pin, suspend, bookmark all tabs
- **Export/Import** - Save and restore tab sessions
- **Tab Timer** - Track time spent on each tab
- **Tab Notes** - Add notes to individual tabs
- **Templates** - Save custom tab group templates
- **Keyboard Shortcuts** - Quick access to common actions
- **Dark Mode** - Easy on the eyes
- **Multi-language** - English & Vietnamese

## 🚀 Installation

### From Chrome Web Store (Coming Soon)
1. Visit Chrome Web Store
2. Search "Tab Counter"
3. Click "Add to Chrome"

### Manual Installation (Developer Mode)
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked"
5. Select the `tab-counter` folder

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+D` | Close duplicate tabs |
| `Ctrl+Shift+Q` | Quick switch to recent tab |
| `Ctrl+Shift+S` | Suspend inactive tabs |

## 📸 Screenshots

<!-- Add screenshots here after taking them -->
<!-- ![Screenshot 1](screenshots/screenshot1.png) -->

## 🔒 Privacy

This extension does not collect, store, or transmit any personal data. All data is stored locally on your device using Chrome's storage API.

## 📄 License

MIT License - feel free to use and modify.

---

# 📋 Chrome Web Store Publishing Checklist

## Prerequisites
- [ ] Chrome Web Store Developer account verified ($5 one-time fee)
- [ ] All files ready in `tab-counter` folder

## Step 1: Prepare Assets

### Required
- [ ] **Icon 128x128** - `icon.png` (already have)
- [ ] **Screenshots** (1-5 images)
  - Size: 1280x800 or 640x400
  - Show main features: tab count, search, groups, settings
  - Save to `screenshots/` folder

### Optional but Recommended
- [ ] **Small promo tile**: 440x280 px
- [ ] **Large promo tile**: 920x680 px
- [ ] **Marquee promo tile**: 1400x560 px

## Step 2: Create ZIP Package

```bash
cd /home/dtqui/Desktop/dangtanqui/first_project
zip -r tab-counter.zip tab-counter -x "*.git*" -x "*screenshots*" -x "*.md"
```

## Step 3: Prepare Store Listing

### Title
```
Tab Counter - Professional Tab Management
```

### Summary (132 characters max)
```
Count, search, sort, group tabs. Auto-close inactive tabs, export sessions, keyboard shortcuts. Boost productivity!
```

### Description
```
Tab Counter - Professional Tab Management

✨ FEATURES:

📊 Tab Counter
• Count tabs across all windows
• Visual warnings when too many tabs open
• Track tab history and statistics

🔍 Search & Find
• Search tabs by title or URL
• Find and close duplicate tabs instantly
• Navigate to any tab with one click

📁 Tab Groups
• View and manage Chrome tab groups
• Auto-group tabs by domain
• Save and load group configurations
• Custom templates for quick setup

⚡ Quick Actions
• Sort tabs by domain or time
• Pin/unpin all tabs
• Suspend inactive tabs to save RAM
• Bookmark all tabs at once
• Close tabs to left/right

🕐 Auto Management
• Auto-close tabs after set inactive time
• Customizable warning thresholds
• Smart tab activity tracking

💾 Export & Import
• Export tabs to JSON file
• Import tab sessions
• Share tabs list via clipboard

⏱️ Productivity Tools
• Tab Timer - track time on each tab
• Tab Notes - add notes to tabs
• Focus Mode - hide distractions

🎨 Customization
• Dark/Light mode
• English & Vietnamese language
• Configurable keyboard shortcuts

🔒 PRIVACY:
This extension does NOT collect any personal data. All information stays on your device.

⌨️ KEYBOARD SHORTCUTS:
• Ctrl+Shift+D - Close duplicate tabs
• Ctrl+Shift+Q - Quick switch tabs
• Ctrl+Shift+S - Suspend tabs

Perfect for researchers, developers, students, and anyone who works with many browser tabs!
```

### Category
```
Productivity
```

### Language
```
English (United States)
```

## Step 4: Privacy Policy

Create a public page with this content (use GitHub Pages, Google Docs, or Notion):

```
Privacy Policy for Tab Counter

Last updated: December 2024

1. DATA COLLECTION
Tab Counter does NOT collect, store, or transmit any personal data to external servers.

2. LOCAL STORAGE
The extension stores the following data locally on your device:
- Tab count history
- User preferences (dark mode, language, alert settings)
- Custom templates
- Tab notes

3. PERMISSIONS
- "tabs": To count and manage browser tabs
- "storage": To save settings locally
- "notifications": To show tab count alerts
- "tabGroups": To manage Chrome tab groups
- "bookmarks": To bookmark tabs feature

4. DATA SHARING
We do not share any data with third parties.

5. CONTACT
For questions, contact: [your-email@example.com]
```

## Step 5: Upload to Chrome Web Store

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Click "New Item"
3. Upload `tab-counter.zip`
4. Fill in store listing:
   - Title, Summary, Description
   - Upload screenshots
   - Select category: Productivity
   - Set language: English
   - Add Privacy Policy URL
5. Set visibility: Public
6. Submit for review

## Step 6: Wait for Review
- Usually takes 1-3 business days
- May take longer if flagged for manual review
- You'll receive email when approved/rejected

## Step 7: After Publishing
- [ ] Share on social media
- [ ] Add Chrome Web Store link to README
- [ ] Monitor reviews and feedback
- [ ] Plan updates based on user feedback

---

## 💰 Monetization Options (Future)

### Option 1: Freemium
Free: Basic features
Paid: Auto-close, Templates, Tab Timer

### Option 2: Donations
Add "Buy Me a Coffee" or "Ko-fi" link

### Option 3: One-time Purchase
Sell on Chrome Web Store ($1.99 - $4.99)

---

## 🛠️ Development

### File Structure
```
tab-counter/
├── manifest.json    # Extension config
├── popup.html       # UI layout
├── popup.js         # Frontend logic
├── background.js    # Background tasks
├── icon.png         # Extension icon
└── README.md        # This file
```

### Local Development
1. Make changes to files
2. Go to `chrome://extensions/`
3. Click reload button on the extension
4. Test changes

---

Made with ❤️ by [Your Name]
