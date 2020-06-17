import storage from 'electron-storage';

class SettingsService {
    constructor() {
        this.FILENAME = 'settings';
        this.defaultSettings = {
            'credentials' : {
                'client_id': '',
                'client_secret': ''
            },
            'paths': {
                'script': ''
            },
            'channels': [
                { id: 0, channel: 'gamesdonequick', label: 'GamesDoneQuick' }
            ]
        };
        this.settings = this._clone(this.defaultSettings);
        this.previousSettings = {};
        this.HAS_LOADED = false;
    }

    init() {
        return storage.set(this.FILENAME, this.defaultSettings, (err) => {
            console.error('Cannot create default settings file.', err);
        });
    }

    loadFile() {
        let bridge = this;
        if (!storage.isPathExists(this.FILENAME)) {
            return this.init().then(() => {
                return bridge.defaultSettings;
            });
        }

        return storage.get(this.FILENAME).then(settings => {
            console.log(settings);
            bridge.HAS_LOADED = true;
            bridge.settings = settings;
            bridge.previousSettings = this._clone(settings);

            return settings;
        }).catch(err => {
            console.error('No settings file created.', err);
            return bridge.defaultSettings;
        });
    }

    load() {
        if (this.HAS_LOADED) {
            return Promise.resolve(this.settings);
        }

        return this.loadFile().then(settings => {
            return settings;
        });
    }

    save(settings) {
        if (this.isIdentical(settings)) {
            console.info('Abort saving identical settings.');
            return;
        }

        let bridge = this;
        storage.set(this.FILENAME, settings).then(() => {
            bridge.settings = settings;
            bridge.previousSettings = this._clone(settings);
        });
    }

    isIdentical(settings) {
        return JSON.stringify(settings) === JSON.stringify(this.previousSettings);
    }

    _clone(a) {
        return JSON.parse(JSON.stringify(a));
    }
}

export default new SettingsService();
