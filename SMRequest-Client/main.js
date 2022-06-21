const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/images/icon.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  });

  win.loadFile('index.html');
}

// when app has finished preparing, create the window
app.whenReady().then(() => {
  createWindow();

  // on macOS, create the window on activation
  app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// stop process when all windows are closed
app.on('window-all-closed', () => {
  // close application unless macOS
  if (process.platform !== 'darwin') app.quit();
});