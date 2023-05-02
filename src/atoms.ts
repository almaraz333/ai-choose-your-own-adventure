import { atom } from 'recoil';

export interface Character {name: string, race: string, class: string}

export const characterState = atom({
  key: 'characterState',
  default: [] as Character[]
});