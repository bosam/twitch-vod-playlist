import process from 'child_process';
import SettingsService from './settings.service';

class SpawnService {
    spawnMedia(url, mode) {
        mode = mode || '480p';
        let bridge = this;

        SettingsService.load().then(settings => {
            const scriptUrl = settings.paths.script + ' ' + url + ' ' + mode;
            console.info('running: ' + scriptUrl);
            let cmd = process.spawn('cmd', ['/c', scriptUrl]);
            cmd.stdout.on('data', function(data) {
                if (-1 !== data.indexOf('could not be found.')) {
                    bridge.spawnMedia(url, 'best');
                }
            });
        });
    }
}

export default new SpawnService();
