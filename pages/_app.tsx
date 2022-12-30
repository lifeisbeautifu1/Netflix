import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "../hooks/useAuth";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Toaster position="bottom-center" />
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </AuthProvider>
  );
}

export default MyApp;
