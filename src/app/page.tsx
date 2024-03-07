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
} from "@/app/common/lib/globalStateManager";
import { StatusPopup, POPUP_TYPE } from "@/app/common/lib/globalMessage";
import { globalMessageManager } from "@/app/common/lib/globalMessage";

//노드 디자이너(Reactflow) 감싸고 있는 컨퍼넌트
function WrapperNodeDesigner(
  {
    id,
    callbackManager,
    data,
  } : {
    id : string,
    callbackManager : MultiNodeDesignerCallbackManager,
    data : string,
  }
) {
  const [visible, setVisible] = useState(true);
  useEffect(() => callbackManager.registerShowHide(id, setVisible), [id, callbackManager]);

  return (
    <div
      className='absolute'
      style={{display: (visible) ? 'block' : 'none'}}
    >
      <NodeDesigner id={id} padding={{top: mainLayoutSize['topGNB'].height, left:0,right:0,bottom:0}} data={data}/>
    </div>
  );
}

export default function Page() {
  const [showPageName, setShowPageName] = useState<PageName>(PageName.HOME);
  const [multiNodeDesignerIdList, setMultiNodeDesignerIdList] = useState<string[]>([]);
  const [multiNodeDesignerComponentList, setMultiNodeDesignerComponentList] = useState<any[]>([]);

  const [globalErrorMsg, setGlobalErrorMsg] = useState('');
  const [globalWarningMsg, setGlobalWarningMsg] = useState('');
  const [globalInfoMsg, setInfoMsg] = useState('');
  const [globalSuccessMsg, setGlobalSuccessMsg] = useState('');

  //다른 모듈에서도 페이지 이동에 사용할 수 있도록 페이지 useState 함수를 콜백함수로 등록한다.
  useEffect(() => {
    mainStateCallbackManager.registerSetCurrentPageName(setShowPageName);
  }, [setShowPageName]);

  useEffect(() => {
    globalMessageManager.registerSetErrorMsg(setGlobalErrorMsg);
    globalMessageManager.registerSetWarningMsg(setGlobalWarningMsg);
    globalMessageManager.registerSetInfoMsg(setInfoMsg);
    globalMessageManager.registerSetSuccessMsg(setGlobalSuccessMsg);
  }, []);

  //노드디자이너 신규 생성
  const openMultiNodeDesigner = (id : string, data : string) => {
    const nodedesignerId = id;
    const component = <WrapperNodeDesigner key={nodedesignerId} id={nodedesignerId} callbackManager={multiNodeDesignerCallbackManager} data={data}/>;

    setMultiNodeDesignerComponentList([...multiNodeDesignerComponentList, component]);
    setMultiNodeDesignerIdList([...multiNodeDesignerIdList, nodedesignerId]);
  }

  //다른 모듈에서 노드디자이너 신규 생성 할 수 있도록 콜백함수로 등록한다.
  multiNodeDesignerCallbackManager.registerMultiOpenNodeDesigner(openMultiNodeDesigner);

  //생성된 노드디자이너를 삭제한다.
  const deleteMultiNodeDesigner = (id : string) => {
    let idList = [];
    let componentList = [];
    for(const index in multiNodeDesignerIdList) {
      if(multiNodeDesignerIdList[index] == id) continue;

      idList.push(multiNodeDesignerIdList[index]);
      componentList.push(multiNodeDesignerComponentList[index]);
    }
    setMultiNodeDesignerIdList(idList);
    setMultiNodeDesignerComponentList(componentList);
  }

  //다른 모듈에서 생성된 노드디자이너를 삭제할 수 있도록 콜백함수 등록한다.
  multiNodeDesignerCallbackManager.registerMultiDeleteNodeDesigner(deleteMultiNodeDesigner);

  return (
    <>
      <>
        <div style={{display: (showPageName === PageName.HOME) ? 'block' : 'none'}}>
          <HomeMain/>
        </div>
        <div style={{display: (showPageName === PageName.NODE_DESIGNER) ? 'block' : 'none'}}>
          {multiNodeDesignerComponentList}
        </div>
      </>
      <>
        {(globalErrorMsg) && <StatusPopup msg={globalErrorMsg} status={POPUP_TYPE.ERROR} />}
        {(globalWarningMsg) && <StatusPopup msg={globalWarningMsg} status={POPUP_TYPE.WARNING} />}
        {(globalInfoMsg) && <StatusPopup msg={globalInfoMsg} status={POPUP_TYPE.INFO} />}
        {(globalSuccessMsg) && <StatusPopup msg={globalSuccessMsg} status={POPUP_TYPE.SUCCESS} />}
      </>
    </>
  );
}
