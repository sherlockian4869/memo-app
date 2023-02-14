import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import { userState } from '~/src/states/userState';
import { db } from '../firebase';

/** ユーザマスタPath */
const userMaster = 'version/1/users';
/** メモマスタPath */
const memoMaster = 'version/1/types';

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
 * タイプの取得
 * @returns snapshot 種別
 */
export const getType = async () => {
  const colRef = collection(db, memoMaster);
  let results = [];
  await getDocs(colRef).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      results.push(doc.data().typeName);
    });
  });
  return results;
};
