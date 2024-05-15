import type { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { lazy } from "react";
const StoreProvider = lazy(() => import("store/store"));

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <AppCacheProvider {...pageProps}>
        <Component {...pageProps} />
      </AppCacheProvider>
    </StoreProvider>
  );
}
