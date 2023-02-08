import { atom } from 'recoil';
import { Memo } from '../common/memo.type';
import { AtomKeys } from '../common/recoilKeys';

export const memoListState = atom<Memo[]>({
  key: AtomKeys.MEMOS_STATE,
  default: [
    {
      id: 1,
      title: 'テスト1',
      content: 'テスト1の内容',
    },
    {
      id: 2,
      title: 'テスト2',
      content: 'テスト2の内容',
    },
  ],
});
