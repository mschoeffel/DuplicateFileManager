'use strict';

import {app, protocol, BrowserWindow, Menu, ipcMain} from 'electron';
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib';
import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer';
import {autoUpdater} from 'electron-updater';
const isDevelopment = process.env.NODE_ENV !== 'production';
import fs from 'fs';

//Wait for: https://github.com/electron/remote/issues/52 / https://github.com/electron/remote/pull/58
import {initialize} from '@electron/remote/dist/src/main';
initialize();

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  {scheme: 'app', privileges: {secure: true, standard: true}},
]);

let win: BrowserWindow;

async function createWindow() {
  Menu.setApplicationMenu(null);

  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Required for Spectron testing
      enableRemoteModule: true,

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
    title: 'Duplicate File Manager',
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }

  protocol.registerFileProtocol('atom', (request, callback) => {
    try {
      let url = request.url.substr(7);
      url = url.replaceAll('%C3%84', '??');
      url = url.replaceAll('%C3%96', '??');
      url = url.replaceAll('%C3%9C', '??');
      url = url.replaceAll('%C3%A4', '??');
      url = url.replaceAll('%C3%B6', '??');
      url = url.replaceAll('%C3%BC', '??');
      callback({path: url});
    } catch (err) {
      console.log('Error atom %v', err);
    }
  });

  createWindow();

  autoUpdater.checkForUpdates();
});

autoUpdater.on('checking-for-update', () => {
  win.webContents.send('electron-update', {
    state: 'checking',
    message: 'checking for update',
  });
});

autoUpdater.on('update-available', info => {
  win.webContents.send('electron-update', {
    state: 'available',
    message: 'update available',
  });
});

autoUpdater.on('update-not-available', info => {
  win.webContents.send('electron-update', {
    state: 'none-available',
    message: 'no update available',
  });
});

autoUpdater.on('error', err => {
  win.webContents.send('electron-update', {
    state: 'error',
    message: 'update error',
  });
});

autoUpdater.on('download-progress', progressObj => {
  win.webContents.send('electron-update', {
    state: 'downloading',
    message: 'update downloading',
  });
});

autoUpdater.on('update-downloaded', info => {
  win.webContents.send('electron-update', {
    state: 'downloaded',
    message: 'update downloaded',
  });
  setTimeout(function () {
    autoUpdater.quitAndInstall();
  }, 5000);
});

ipcMain.on('read-file', (event, arg) => {
  try {
    const raw = fs.readFileSync(arg, 'utf8');
    event.returnValue = {data: raw, error: null};
  } catch (err) {
    event.returnValue = {data: null, error: err};
  }
});

ipcMain.on('exists-file', (event, arg) => {
  try {
    if (fs.existsSync(arg)) {
      event.returnValue = true;
    } else {
      event.returnValue = false;
    }
  } catch (err) {
    event.returnValue = false;
  }
});

ipcMain.on('delete-file', (event, arg) => {
  try {
    fs.unlinkSync(arg);
    event.returnValue = {data: null, error: null};
  } catch (err) {
    event.returnValue = {data: null, error: err};
  }
});

ipcMain.on('write-json-file', (event, arg) => {
  try {
    const path = arg.path;
    const data = arg.data;
    fs.writeFileSync(path, JSON.stringify(data));
    event.returnValue = {data: null, error: null};
  } catch (err) {
    event.returnValue = {data: null, error: err};
  }
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
