import type { AppProps } from 'next/app';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { AuthProvider } from '../firebase/apis/auth';

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </AuthProvider>
  );
}

export default App;
