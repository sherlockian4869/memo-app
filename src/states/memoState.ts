import { atom } from 'recoil';
import { Memo } from '../common/memo.type';
import { AtomKeys } from '../common/recoilKeys';

export const memoState = atom<Memo>({
  key: AtomKeys.MEMO_STATE,
  default: {
    id: '',
    url: '',
    type: '',
    important: '',
    title: '',
    content: '',
  },
});
