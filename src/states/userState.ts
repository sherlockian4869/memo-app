import { atom } from 'recoil';
import { User } from '../common/user.type';
import { AtomKeys } from '../common/recoilKeys';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'user-recoil-persist',
  storage: typeof window === 'undefined' ? undefined : sessionStorage,
});

export const userState = atom<User>({
  key: AtomKeys.USER_STATE,
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
