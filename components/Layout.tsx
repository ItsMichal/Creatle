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
    <div className="bg-gray-900 text-blue-400 rounded-xl p-10 w-4/5 mx-auto">{props.children}</div>
    <ParticlesBg color="#60A5FA" num={50} type={'cobweb'} bg={true}/>
  </div>
);

export default Layout;
