import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;


  return (
    <>
    <Head>
      <link rel="icon" href="favicon.ico"></link>
    </Head>
    <header className="w-full p-10">
      <h1 className="font-extrabold mx-auto my-5 text-6xl grad w-fit p-2 bg-black rounded-xl text-center">🛠 Creatle<br></br><small className="text-sm font-bold italic">DIY Wordle Game</small></h1>
      
    </header>
    </>
  );
};

export default Header;
