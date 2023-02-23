import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

/** ユーザマスタPath */
const userMaster = 'version/1/users';

/**
 * メモ登録
 * @param url url
 * @param type 種別
 * @param title タイトル
 * @param content コンテンツ（一言）
 * @param important 重要度
 * @param document ドキュメント（詳細）
 */
export const registMemo = async (
  url: string,
  type: string,
  title: string,
  content: string,
  important: string,
  document: string
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
    document: document,
  });
};

/**
 * メモ更新
 * @param id documentId
 * @param url url
 * @param type 種別
 * @param title タイトル
 * @param content コンテンツ（一言）
 * @param important 重要度
 * @param document ドキュメント（詳細）
 */
export const updateMemo = async (
  id: string,
  url: string,
  type: string,
  title: string,
  content: string,
  important: string,
  document: string
) => {
  const user = auth.currentUser;
  const docRef = doc(db, userMaster, user.uid, 'memos', id);

  await updateDoc(docRef, {
    url: url,
    type: type,
    title: title,
    content: content,
    important: important,
    document: document,
  });
};

/**
 * 全件メモ取得
 * @returns 複数メモ
 */
export const getMemoListSnapshot = async () => {
  const user = auth.currentUser;
  const colRef = collection(db, userMaster, user.uid, 'memos');

  const snapshot = await getDocs(colRef);
  return snapshot;
};

/**
 * 単一メモ取得
 * @param id documentId
 * @returns 単位メモ
 */
export const getMemo = async (id: string) => {
  const user = auth.currentUser;
  const docRef = doc(db, userMaster, user.uid, 'memos', id);

  const document = await getDoc(docRef);
  return document;
};
