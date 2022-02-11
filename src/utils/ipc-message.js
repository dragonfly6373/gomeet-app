const EventEmitter = require('events');
const ipcRenderer = require('electron').ipcRenderer;

export default class IpcMessage {
    constructor(events) {
        this.eventEmitter = new EventEmitter();
        if (events && events.length) {
            events.forEach((evt) => {
                var emetter = new IpcEmitter(evt, this.eventEmitter);
                this[evt] = emetter;
            });
        }
    }

    addListener(name, handler) {
        var emitter = this[name];
        if (!emitter) {
            emitter = new IpcEmitter(name, this.eventEmitter);
            this[name] = emitter;
        } else {
            emitter.addListener(handler);
        }
    }

    removeAllListeners(name) {
        var emitter = this[name];
        if (!emitter) this.eventEmitter.removeAllListeners();
        else emitter.removeAllListeners();
    }
}

class IpcEmitter {
    constructor(name, eventEmitter) {
        this.name = name;
        this.eventEmitter = eventEmitter;
    }

    addListener(fn) {
        this.eventEmitter.on(this.name, fn);
    }

    emit(data) {
        ipcRenderer.send(this.name, JSON.stringify({data}));
    }

    removeListener(fn) {
        this.eventEmitter.removeListener(this.name, fn);
    }

    removeAllListeners() {
        this.eventEmitter.removeAllListeners(this.name);
    }
}
