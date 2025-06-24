//import Navigation from "@/components/Navigation";

import "@unocss/reset/tailwind.css";
import "@/styles/yorha.css";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Navigation /> */}
      <Component {...pageProps} />
    </>
  );
}
