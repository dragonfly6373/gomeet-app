import { ipcRenderer, IpcRendererEvent } from "electron";

// import FileUtils from "./file-utils";

const initModule = (module) => {
    Object.keys(module).forEach(name => {
        ipcRenderer.on(name, module[name]);
    });
}

export default { initModule };
