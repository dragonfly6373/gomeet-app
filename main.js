import Electron, { app, BrowserWindow } from "electron";
import path from "path";
import url from "url";

import IpcMessage from './src/utils/ipc-message.js';

function createMainWindow() {
  let mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  });
  if (process.env.NODE_ENV === "development") {
    console.log("# app development is running...");
    mainWindow.loadURL(`http://localhost:8080/app.html`);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "app.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  }
  return mainWindow;
}

let mainWindow = Electron.BrowserWindow;

function createMeetingWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    },
  });

  if (process.env.NODE_ENV === "development") {
    console.log("# app development is running...");
    mainWindow.loadURL(`http://localhost:8080/meeting.html`);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "meeting.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

var windowList = [];
var ipcMessage = new IpcMessage(["login", "joinMeeting", "logout", "endMeeting", "meetingEnded"]);

app.on("ready", () => {
  let mainWindow = createMainWindow();
  windowList.push(mainWindow);
  
});
app.allowRendererProcessReuse = true;
