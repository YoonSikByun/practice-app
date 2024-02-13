'use client'

import { useState, useEffect, useCallback } from "react";
import HomeMain from "@/app/home/Home";
import { MultiNodeDesigner } from "@/app/node-designer/NodeDesigner";
import { mainLayoutSize } from "@/app/main/config/layoutFrame";
import { mainStateCallBackManager } from "@/app/main/util/mainGlobalStateManager";

export default function Page() {
  const [showPageName, setShowPageName] = useState('home');
  const [currentnodeDesignerId, setCurrentNodeDesignerId] = useState('');

  useEffect(() => {
    mainStateCallBackManager.registerSetCurrentPageName(setShowPageName);
    mainStateCallBackManager.registerSetCurrentNodeDesignerID(setCurrentNodeDesignerId);
  }, [setShowPageName, setCurrentNodeDesignerId]);
  // const registerSetShowNodeDesigner = useCallback((callbackFunc : (v: string) => void) => {
  //   mainStateCallBackManager.registerSetCurrentNodeDesignerID(callbackFunc);
  // }, []);

  console.log(`showPageName : ${showPageName}`);

  return(
    <>
      {(showPageName === 'home') && <HomeMain/>}
      {(showPageName === 'nodeDesigner') &&
        // <MultiNodeDesigner registerCallback={registerSetShowNodeDesigner} padding={{top: mainLayoutSize['topGNB'].height, left: 0, right: 0, bottom: 0}} />
        <MultiNodeDesigner currentShowNodeDesignerId={currentnodeDesignerId} padding={{top: mainLayoutSize['topGNB'].height, left: 0, right: 0, bottom: 0}} />
      }
    </>
  );
}
