import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userState } from '../../states/userState';
import { auth, db } from '../firebase';

/**
 * google認証
 */
export const googleLogin = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(async function (result) {
      const user = result.user;
      const docRef = doc(db, 'version/1/users/', user.uid);
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
 * ログアウト処理
 */
export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    alert('サインアウトに失敗しました。');
  }
};

/**
 * ログイン状態の監視
 */
export const useAuth = () => {
  const [signInUser, setSignInUser] = useRecoilState(userState);
  const resetStatus = useResetRecoilState(userState);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setSignInUser({
          id: authUser.uid,
          name: authUser.displayName!,
          email: authUser.email!,
        });
      } else {
        resetStatus();
      }
    });
    return () => unSub();
  }, [setSignInUser, resetStatus]);

  return signInUser;
};
