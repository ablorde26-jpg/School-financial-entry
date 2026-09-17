// main.js - Electron shell for the School Financial Entry System.
// Loads app.html into a native window. All the app's logic (data storage,
// entry forms, search, printing) is the same HTML/JS you already have and
// tested -- this file just gives it a real Windows window, taskbar icon,
// Start Menu entry, and installer, instead of running inside a browser tab.

const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1300,
    height: 820,
    minWidth: 1000,
    minHeight: 650,
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    title: 'School Financial Entry System',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile('app.html');

  // Open any external links (none currently in the app) in the system browser
  // instead of inside the app window.
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  const isMac = process.platform === 'darwin';
  const template = [
    {
      label: 'File',
      submenu: [
        { role: 'reload' },
        { type: 'separator' },
        { label: 'Print...', accelerator: 'CmdOrCtrl+P', click: () => win.webContents.print() },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'zoomIn' }, { role: 'zoomOut' }, { role: 'resetZoom' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
