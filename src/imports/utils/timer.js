class Timer {
    _intervalId = null;
    events = {};

    checkRunInterval() {
        let t = false;
        if (Object.keys(this.events).length > 0) {
            Object.keys(this.events).forEach(e => {
                if (this.events[e]) {
                    t = true;
                }
            });
        }
        return t;
    }

    runInterval() {
        const run = this.checkRunInterval();
        if (run) {
            if (this._intervalId) {
                return this._intervalId;
            }
            this._intervalId = setInterval(() => {
                const goOn = this.checkRunInterval();
                if (goOn) {
                    const timer = new Event('timer');
                    window.dispatchEvent(timer);
                } else {
                    this.stopTimer();
                }
            }, 1000);
        }
        return this._intervalId;
    }

    setEvent(key, value) {
        this.events[key] = value;
    }

    addEventListener(callback) {
        window.addEventListener('timer', callback);
    }

    removeEventListener(callback) {
        window.removeEventListener('timer', callback);
    }

    stopTimer() {
        clearInterval(this._intervalId);
    }
}
const timer = new Timer();
export default timer;