import storage from 'electron-storage';

class SettingsService {
    settings: unknown;
    previousSettings: unknown;
    HAS_LOADED: boolean;
    defaultSettings: { channels: { channel: string; id: number; label: string }[]; credentials: { client_secret: string; client_id: string }; paths: { script: string } };
    private FILENAME = 'settings';

    constructor() {
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
        if (!storage.isPathExists(this.FILENAME)) {
            return this.init().then(() => {
                return this.defaultSettings;
            });
        }

        return storage.get(this.FILENAME).then(settings => {
            this.HAS_LOADED = true;
            this.settings = settings;
            this.previousSettings = this._clone(settings);

            return settings;
        }).catch(err => {
            console.error('No settings file created.', err);
            return this.defaultSettings;
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

        storage.set(this.FILENAME, settings).then(() => {
            this.settings = settings;
            this.previousSettings = this._clone(settings);
        });
    }

    isIdentical(settings): boolean {
        return JSON.stringify(settings) === JSON.stringify(this.previousSettings);
    }

    _clone(a) {
        return JSON.parse(JSON.stringify(a));
    }
}

export default new SettingsService();
