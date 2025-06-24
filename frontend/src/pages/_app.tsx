import "@unocss/reset/tailwind.css";
import "@/styles/yorha.css";
import "@/styles/globals.css";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="max-w-5xl mx-auto">
      <Component {...pageProps} />
    </div>
  );
}
