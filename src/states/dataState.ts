import { atom } from 'recoil';
import { Data } from '../common/data.type';
import { AtomKeys } from '../common/recoilKeys';

export const dataState = atom<Data[]>({
  key: AtomKeys.DATA_STATE,
  default: [],
});
