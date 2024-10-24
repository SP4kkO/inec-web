"use client";

import Historico from "app/historico/page";
import Image from "next/image";
import logoImage from "../../public/img/logo.png";
import BoxDados from "components/outros-dados/index";
import useStore from "context/zustand/store";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    useStore.getState().loadInitialData();
  }, []);

  return (
    <div
      className="tw-w-screen tw-h-screen tw-m-0
    "
    >
      <title>INEC ASSESSORES WEB</title>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <div className="tw-w-11/12 tw-h-full tw-mx-auto">
        <div className="tw-flex tw-h-1/6">
          <Image
            className="tw-mx-auto tw-my-auto"
            alt="inec logo image"
            src={logoImage}
            width={274}
            height={108}
          />
        </div>

        <div className="tw-flex tw-flex-col tw-h-5/6 tw-relative tw-w-full tw-gap-6">
          <div className="tw-w-full tw-h-[45%]">
            <Historico />
          </div>

          <div className="tw-w-full tw-h-[45%]">
            <BoxDados />
          </div>
        </div>
      </div>
    </div>
  );
}
