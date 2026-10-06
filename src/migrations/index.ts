import * as migration_20260902_172919_initial from './20260902_172919_initial';
import * as migration_20260906_175249_retours_v1 from './20260906_175249_retours_v1';
import * as migration_20261006_163646_couleurs_modulables from './20261006_163646_couleurs_modulables';

export const migrations = [
  {
    up: migration_20260902_172919_initial.up,
    down: migration_20260902_172919_initial.down,
    name: '20260902_172919_initial',
  },
  {
    up: migration_20260906_175249_retours_v1.up,
    down: migration_20260906_175249_retours_v1.down,
    name: '20260906_175249_retours_v1',
  },
  {
    up: migration_20261006_163646_couleurs_modulables.up,
    down: migration_20261006_163646_couleurs_modulables.down,
    name: '20261006_163646_couleurs_modulables'
  },
];
