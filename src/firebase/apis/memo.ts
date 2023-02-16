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
 * @param url url
 * @param type 種別
 * @param title タイトル
 * @param content コンテンツ
 * @param important 重要度
 */
export const registMemo = async (
  url: string,
  type: string,
  title: string,
  content: string,
  important: string
) => {
  const user = auth.currentUser;
  const registDate = serverTimestamp();
  const colRef = collection(db, userMaster, user.uid, 'memos');

  const memoDocRef = doc(collection(db, colRef.path));
  const docId = memoDocRef.id;
  await setDoc(memoDocRef, {
    id: docId,
    title: title,
    url: url,
    type: type,
    important: important,
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
