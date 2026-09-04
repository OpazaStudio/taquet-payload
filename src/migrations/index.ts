import * as migration_20260902_172919_initial from './20260902_172919_initial';

export const migrations = [
  {
    up: migration_20260902_172919_initial.up,
    down: migration_20260902_172919_initial.down,
    name: '20260902_172919_initial'
  },
];
