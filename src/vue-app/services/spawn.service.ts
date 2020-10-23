import process from 'child_process';
import SettingsService from './settings.service';
import { sprintf } from 'sprintf-js';
import { StringDecoder } from 'string_decoder';

const decoder = new StringDecoder('utf-8');

class SpawnService {
  spawnMedia(url) {
    SettingsService.load().then(settings => {
      const scriptUrl = sprintf('%s %s', settings.paths.script, url);
      console.info('running: ' + scriptUrl);
      const cmd = process.spawn('cmd', ['/c', scriptUrl]);
      cmd.stdout.on('data', (data) => {
        const decoded = decoder.write(data);
        console.info(decoded);
        if (-1 !== decoded.indexOf('could not be found.')) {
          console.error('Could not find', url);
        }
      });
    });
  }
}

export default new SpawnService();
