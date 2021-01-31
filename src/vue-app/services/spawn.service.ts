import child, { ChildProcess } from 'child_process';
import SettingsService from './settings.service';

class SpawnService {
  async spawnChildProcess(url: string) : Promise<ChildProcess> {
    return SettingsService.load()
      .then(settings => {
        console.info('running: ', settings.paths.script, url);
        const process = child.spawn(settings.paths.script, [url]);
        process.stderr.setEncoding('utf-8');
        process.stdout.setEncoding('utf-8');

        return process;
      });
  }
}

export default new SpawnService();
