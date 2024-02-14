'use client'

import { useState, useEffect } from "react";
import NodeDesigner from "@/app/node-designer/NodeDesigner";
import HomeMain from "@/app/main/component/home/Home";
import { mainLayoutSize } from "@/app/main/config/layoutFrame";
import {
  mainStateCallbackManager,
  PageName,
  MultiNodeDesignerCallbackManager,
  multiNodeDesignerCallbackManager
} from "@/app/main/util/globalStateManager";
import { v4 as uuid } from "uuid";

//노드 디자이너(Reactflow) 감싸고 있는 컨퍼넌트
function WrapperNodeDesigner(
  {
    id,
    callbackManager
  } : {
    id : string,
    callbackManager : MultiNodeDesignerCallbackManager
  }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => callbackManager.registerShowHideCallback(id, setVisible), [id, callbackManager]);

  return (
  <div
    className='absolute'
    style={{display: (visible) ? 'block' : 'none'}}
  >
    <NodeDesigner id={id} padding={{top: mainLayoutSize['topGNB'].height, left:0,right:0,bottom:0}}/>
  </div>
  );
}

export default function Page() {
  const [showPageName, setShowPageName] = useState<PageName>(PageName.HOME);
  const [childNodeDesignerIdList, setChildNodeDesignerIdList] = useState<string[]>([]);
  const [childNodeDesignerList, setChildNodeDesignerList] = useState<any[]>([]);

  useEffect(() => {
    mainStateCallbackManager.registerSetCurrentPageName(setShowPageName);
  }, [setShowPageName]);

  const addChildNodeDesigner = () => {
    const nodeDesginerId = uuid();
    const compoenet = <WrapperNodeDesigner key={nodeDesginerId} id={nodeDesginerId} callbackManager={multiNodeDesignerCallbackManager}/>;

    setChildNodeDesignerList([...childNodeDesignerList, compoenet]);
    setChildNodeDesignerIdList([...childNodeDesignerIdList, nodeDesginerId]);

    return nodeDesginerId;
  }

  multiNodeDesignerCallbackManager.registerAddNodeDesignerCallback(addChildNodeDesigner);

  return (
    <>
      <div style={{display: (showPageName === PageName.HOME) ? 'block' : 'none'}}>
        <HomeMain/>
      </div>
      <div style={{display: (showPageName === PageName.NODE_DESIGNER) ? 'block' : 'none'}}>
        {childNodeDesignerList}
      </div>
    </>
  );
}
