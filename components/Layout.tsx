import dynamic from 'next/dynamic';

const ParticlesBg = dynamic(() => import('particles-bg'), {
  ssr: false,
});
import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <div className="bg-gray-900 text-blue-400 rounded-xl p-8 w-5/6 min-w-fit mx-auto">{props.children}</div>
    <div className="grad text-center p-10">Created for HackCU 2022 by Michal Bodzianowski!</div>
    <ParticlesBg color="#60A5FA" num={50} type={'cobweb'} bg={true}/>
  </div>
);

export default Layout;
