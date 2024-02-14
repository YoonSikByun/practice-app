'use client'

import '@/app/main/scss/layout.scss'
import { mainLayoutSize } from '@/app/main/config/layoutFrame'
import { useEffect } from 'react'
import Left from '@/app/main/component/top/Left'
import Center from '@/app/main/component/top/Center'

//Global Navigation Bar
export default function Top() {

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
        <div className="top-head flex"
            style={{height:mainLayoutSize['topGNB'].height}}
        >
            {/* Logo */}
            <div style={{width:mainLayoutSize['project'].width}}>
                <Left/>
            </div>
            {/* 열려있는 Node designer */}
            <div>
                <Center/>
            </div>
        </div>
    )
}
