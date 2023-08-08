const { app, BrowserWindow, ipcMain } = require('electron');
const { uploadFile, downloadFile, updateFile } = require('./script');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

ipcMain.on('upload-file', async (event, filePath) => {
  await uploadFile(filePath);
  event.sender.send('upload-file-done');
});

ipcMain.on('download-file', async (event, fileName) => {
  const data = await downloadFile(fileName);
  event.sender.send('download-file-done', data);
});

ipcMain.on('update-file', async (event, fileName, newFilePath, newFileName) => {
  await updateFile(fileName, newFilePath, newFileName);
  event.sender.send('update-file-done');
});
