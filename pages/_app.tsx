import "../styles/styles.css";
import type { AppProps } from "next/app";
import localFont from "@next/font/local";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
const kato = localFont({
  src: "../public/assets/fonts/kato.ttf",
  fallback: ["sans-serif"],
  weight: "400",
  variable: "--font-kato",
  preload: true,
});
const hirosh = localFont({
  src: "../public/assets/fonts/hirosh.ttf",
  fallback: ["sans-serif"],
  weight: "400",
  variable: "--font-hirosh",
  preload: true,
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <style className="dynamic-fonts">
          {
            //method 1
            `:root{   --font-kato: ${kato.style.fontFamily}; 
          --font-hirosh: ${hirosh.style.fontFamily} ; }`
          }
        </style>
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
