'use client'

import '@/app/main/scss/layout.scss'
import { useEffect } from 'react'
import Left from '@/app/main/component/top/Left'
import Center from '@/app/main/component/top/Center'
import Right from '@/app/main/component/top/Right'
import { calcStyle } from "@/app/main/lib/calcStyleRegion"
import clsx from 'clsx'

//Global Navigation Bar
export default function TopContainer() {

    //페이지가 새로고침 되거나 다른 사이트로 이동할 때 경고 메시지를 보여준다.
    useEffect(() => {
        window.addEventListener("beforeunload", alertUser);
        return () => {
          window.removeEventListener("beforeunload", alertUser);
        };
      }, []
    );

    const alertUser = (e : any) => {
        e.preventDefault();
        e.returnValue = "";
    };

    return (
        <div className={clsx("top-head bg-titlebg-1",
                "border-borderclr-bold border-b-2 flex flex-row items-center")}
            style={{
                position: 'absolute',
                height:calcStyle.getTopHeight(),
            }}
        >
            {/* Logo */}
            <div style={{
                position: 'absolute',
                height: calcStyle.getTopHeight(),
                lineHeight: calcStyle.getTopHeight(),
                width: calcStyle.getTopLeftWidth(),
                textAlign: 'center',
                alignItems: 'center'
                }}
            >
                <Left/>
            </div>
            {/* 열려있는 Node designer */}
            <div style={{
                position: 'absolute',
                left: calcStyle.getTopLeftLeft(),
                height: calcStyle.getTopHeight(),
                lineHeight: calcStyle.getTopHeight(),
                width: calcStyle.getTopCenterWidth()
                }}
            >
                <Center/>
            </div>
            <div style={{
                position: 'absolute',
                left: calcStyle.getTopRightLeft(),
                height: calcStyle.getTopHeight(),
                lineHeight: calcStyle.getTopHeight(),
                width: calcStyle.getTopRightWidth()
                }}
            >
                <Right />
            </div>
        </div>
    )
}
