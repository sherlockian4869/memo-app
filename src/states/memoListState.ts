import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil';
import { Memo } from '../common/memo.type';
import { AtomKeys } from '../common/recoilKeys';

export const memoListState = atom<Memo[]>({
  key: AtomKeys.MEMOS_STATE,
  default: [
    {
      id: 1,
      url: 'URL',
      title: 'テストタイトル1',
      content: 'テストコンテンツ1',
      createdAt: Timestamp.now(),
    },
    {
      id: 2,
      url: 'URL',
      title: 'テストタイトル2',
      content: 'テストコンテンツ2',
      createdAt: Timestamp.now(),
    },
  ],
});
