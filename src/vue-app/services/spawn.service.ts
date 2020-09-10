import process from 'child_process';
import SettingsService from './settings.service';

class SpawnService {
    spawnMedia(url, mode) {
        mode = mode || '480p';

        SettingsService.load().then(settings => {
            const scriptUrl = settings.paths.script + ' ' + url + ' ' + mode;
            console.info('running: ' + scriptUrl);
            const cmd = process.spawn('cmd', ['/c', scriptUrl]);
            cmd.stdout.on('data', (data) => {
                if (-1 !== data.indexOf('could not be found.')) {
                    this.spawnMedia(url, 'best');
                }
            });
        });
    }
}

export default new SpawnService();
