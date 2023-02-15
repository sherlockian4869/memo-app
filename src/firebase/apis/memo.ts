import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import { userState } from '~/src/states/userState';
import { auth, db } from '../firebase';

/** ユーザマスタPath */
const userMaster = 'version/1/users';

/**
 * メモ登録
 * @param type 種別
 * @param title タイトル
 * @param content コンテンツ
 */
export const registMemo = async (
  type: string,
  title: string,
  content: string
) => {
  const user = useRecoilValue(userState);
  const registDate = serverTimestamp();
  const colRef = collection(db, userMaster, user.id, 'memo');

  const memoDocRef = doc(collection(db, colRef.path));
  const docId = memoDocRef.id;
  await setDoc(memoDocRef, {
    id: docId,
    title: title,
    type: type,
    content: content,
    createdAt: registDate,
  });
};

/**
 * 全てのメモを取得
 * @returns メモデータ
 */
export const getMemoListSnapshot = async () => {
  const user = auth.currentUser;
  const colRef = collection(db, userMaster, user.uid, 'memos');

  const snapshot = await getDocs(colRef);
  return snapshot;
};
