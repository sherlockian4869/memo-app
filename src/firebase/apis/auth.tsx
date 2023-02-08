import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from '../../common/user.type';
import { auth, db } from '../firebase';

// コンテクスト用の型
type UserContextType = User | null | undefined;
// コンテクストを作成
const AuthContext = createContext<UserContextType>(undefined);

/**
 * google認証
 */
export const googleLogin = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(async function (result) {
      const user = result.user;
      const docRef = doc(db, 'version/1/users/${firebaseUser.uid}');
      await setDoc(docRef, {
        id: result.user.uid,
        name: user.displayName,
        email: user.email,
        createdAt: Timestamp.now(),
      });
    })
    .catch((error) => {
      console.error(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode);
      console.error(errorMessage);
    });
};

/**
 * ログイン状態の監視
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserContextType>();
  useEffect(() => {
    // ログイン状態の監視
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // ログインしている場合、userCollectionからデータを参照
        const docRef = doc(db, 'version/1/users/${firebaseUser.uid}');
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          // データを取得して格納
          const appUser = (await getDoc(docRef)).data() as User;
          setUser(appUser);
        } else {
          // user未作成の場合、新規作成して格納
          const appUser: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName!,
            email: firebaseUser.email!,
            createdAt: Timestamp.now(),
          };
          // Firestoreにuserデータを保存
          setDoc(docRef, appUser).then(() => {
            // 保存後、userデータをコンテクストに格納
            setUser(appUser);
          });
        }
      } else {
        // ログインしていない場合、user情報をnullに設定
        setUser(null);
      }
      // 不要になったら監視を修了
      return unsubscribe;
    });
  }, []);
  // プロバイダーを作成、userを格納
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
