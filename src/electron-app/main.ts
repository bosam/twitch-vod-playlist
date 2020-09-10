// Modules to control application life and create native browser window
import { app, BrowserWindow }  from 'electron';
import { resolve } from 'path';
import { format } from 'url';
import windowStateKeeper from 'electron-window-state';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let isDev = 'development' === process.env.NODE_ENV;

async function createWindow() {
    // Load the previous state with fallback to defaults
    let mainWindowState = windowStateKeeper({
        defaultWidth: 800,
        defaultHeight: 600
    });

    // Create the browser window.
    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        icon: resolve(__dirname, 'icon.png'),
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Remove menu from browser window.
    mainWindow.setMenu(null);

    // Load the index.html of the app.
    await mainWindow.loadURL(isDev ? format({
        hostname: 'localhost',
        pathname: 'index.html',
        protocol: 'http',
        slashes: true,
        port: 8080
    }) : format({
        pathname: resolve(__dirname, '..', 'vue-app/index.html'),
        protocol: 'file',
        slashes: true
    }));

    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools();
        require('vue-devtools').install();
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    // Let us register listeners on the window, so we can update the state
    // automatically (the listeners will be removed when the window is closed)
    // and restore the maximized or full screen state
    mainWindowState.manage(mainWindow);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if ('darwin' !== process.platform) {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (null === mainWindow) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
