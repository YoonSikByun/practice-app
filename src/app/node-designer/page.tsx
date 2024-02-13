'use client'

import NodeDesigner from "@/app/node-designer/NodeDesigner";
import clsx from "clsx";
import { useState, useEffect } from "react";

class MultiNodeDesignerCallbackManager {
  private callbackFuncs: { [key: string]: (id : string) => void } = {};
  registerCallback(id : string, f : any) {
    console.log(`registerCallback id : ${id}`);
    this.callbackFuncs[id] = f;
  }

  show(id : string, selectedId : string) {
    console.log(`before - callback id : ${id}, selectedId : ${selectedId} callbackFuncs.length : ${Object.keys(this.callbackFuncs).length}`);
    if(!this.callbackFuncs.hasOwnProperty(id)) return;
    console.log(`after - callback id : ${id}, selectedId : ${selectedId}`);
    this.callbackFuncs[id](selectedId);
  }

  hideAll() {
    for(const id in this.callbackFuncs) {
      this.show(id, '');
    }
  }
}

function WrapperNodeDesigner(
  {
    id,
    callbackManager
  } : {
    id : string,
    callbackManager : MultiNodeDesignerCallbackManager
  }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => callbackManager.registerCallback(id, setVisible), [id, callbackManager]);

  return (
  <div
    className={clsx('absolute', 'top-[30px]')}
    style={{display: (visible) ? 'block' : 'none'}}
  >
    <NodeDesigner id={id}/>
  </div>
  );
}

const callbackManager = new MultiNodeDesignerCallbackManager;

export default function MultiNodeDesigner() {
  const [childNodeDesignerCount, setChildNodeDesignerCount] = useState(0);
  const [childNodeDesignerList, setChildNodeDesignerList] = useState<any[]>([]);

  console.log(` ---------- Page childList.length : ${childNodeDesignerList.length}`);

  const addChild = () => {
    setChildNodeDesignerCount(childNodeDesignerCount+1);
    const nodeId = `${childNodeDesignerCount+1}`;
    const compoenet = <WrapperNodeDesigner key={nodeId} id={nodeId} callbackManager={callbackManager}/>;
    console.log(`addChild count : ${childNodeDesignerCount+1}, nodeId : ${nodeId}`);

    setChildNodeDesignerList([...childNodeDesignerList, compoenet]);
    callbackManager.show(nodeId, nodeId);
  }

  const showUp = (id : string) => {
    callbackManager.hideAll();
    callbackManager.show(id, id);
  }

  return (
    <div>
      <div className="absolute top-[0px] flex flex-cols bg-white w-full gap-[10px]">
        <button onClick={() => showUp('1')}>one</button>
        <button onClick={() => showUp('2')}>two</button>
        <button onClick={() => addChild()}>add-child</button>
      </div>
      {childNodeDesignerList}
    </div>
  );
}
