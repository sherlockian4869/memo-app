import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil';
import { Memo } from '../common/memo.type';
import { AtomKeys } from '../common/recoilKeys';

export const memoState = atom<Memo>({
  key: AtomKeys.MEMO_STATE,
  default: {
    id: 1,
    url: 'URL',
    title: 'テストタイトル',
    content: 'テストコンテンツ',
    createdAt: Timestamp.now(),
  },
});
