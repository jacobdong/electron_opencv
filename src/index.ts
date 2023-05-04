import {app, ipcMain, BrowserWindow} from 'electron';
// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
import process from "process";
import * as console from "console";


// 一定要放在 import opencv 之前，
// 在 import 的时候会自动构建 （当前系统中的环境变量会丢失，在 package.json 中配置
// 的 opencv 相关属性也会丢失


// Make sure to put it before importing opencv,
// it will be automatically built during the import
// the environment variables in the current system will be lost,
// and the opencv-related properties configured in package.json will also be lost during the import.

const env = process.env;
env.OPENCV4NODEJS_DISABLE_AUTOBUILD = "1"
import opencv from '@u4/opencv4nodejs'

const opencvInfo = () => {
    console.log(opencv.getBuildInformation())
    return {
        version: opencv.getVersionMajor() + "." + opencv.getVersionMinor() + "." + opencv.getVersionRevision()
    }
}
ipcMain.handle('app:opencvStatus', opencvInfo);

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = (): void => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        height: 900,
        width: 1600,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
    });

    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
