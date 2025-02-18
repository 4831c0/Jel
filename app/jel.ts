import { watch } from 'chokidar';
import openExplorer from 'explorer-opener';
import { existsSync, mkdirSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { getMainWindow } from './main';

export const Jel = {
  themes: {
    init: () => {
      if (!existsSync('themes')) mkdirSync('themes');
      const watcher = watch('themes', { persistent: true });

      // TODO: Implement proper hot reloading

      watcher
        .on('add', () => {
          process.stdout.write('add\n');
          getMainWindow()?.webContents.reload();
        })
        .on('change', () => {
          process.stdout.write('change\n');
          getMainWindow()?.webContents.reload();
        })
        .on('unlink', () => {
          process.stdout.write('unlink\n');
          getMainWindow()?.webContents.reload();
        });
    },
    open: () => {
      openExplorer(path.join(process.cwd(), 'themes'));
    },
    list: () => {
      return readdirSync('themes');
    },
    read: (name: string) => {
      if (!name) return '';
      process.stdout.write(`read: ${name}\n`);
      const fn = path.join(process.cwd(), 'themes', path.normalize(name));
      process.stdout.write(`fn: ${fn}\n`);
      if (!existsSync(fn)) return '';

      return readFileSync(fn, 'utf8');
    },
  },
};
