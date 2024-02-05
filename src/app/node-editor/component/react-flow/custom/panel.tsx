import { BackgroundVariant } from "reactflow";
import clsx from "clsx";
import { useState } from 'react';
import { useOnSelectionChange } from 'reactflow';

class StateCallbackManager {
    prevSelectedNodeId: string = '';
    nodesCallbackFuncs: { [key: string]: (show : boolean) => void } = {};
    setBottomsheetNodeIdCallbackFunc: any = null;

    setBottomSheetStateCallback(setBottomsheetNodeId : (v : string ) => void) {
        this.setBottomsheetNodeIdCallbackFunc = setBottomsheetNodeId;
    }

    callBottomSheetStateCallback(nodeId : string) {
        if(!this.setBottomsheetNodeIdCallbackFunc) return;
        this.setBottomsheetNodeIdCallbackFunc(nodeId);
    }

    push(key : string, callBackFunc : any) {
        console.log(`push key : ${key}`);
        this.nodesCallbackFuncs[key] = callBackFunc;
    }
    delete(key : string) {
        console.log(`delete key : ${key}`);
        if(this.nodesCallbackFuncs.hasOwnProperty(key))
        {
            delete this.nodesCallbackFuncs[key];
            console.log(`delete key : ${key}`);
        }
    }
    callStateCallback(key : string, value : any) {
        console.log(`callStateCallback key : ${key}`);
        if(!this.nodesCallbackFuncs.hasOwnProperty(key))
            return;
        this.prevSelectedNodeId = key;
        this.nodesCallbackFuncs[key](value);
    }
}

export const showOffNodeOptBtnCallBack = new StateCallbackManager();

export function CallBackSelectedNodesEdges(
  {
    callBackReactFlowSelectionChanges
  } : {
    callBackReactFlowSelectionChanges : (nodes : string[], edges : string[]) => void
  }
) {
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [selectedEdges, setSelectedEdges] = useState<string[]>([]);
 
  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      setSelectedNodes(nodes.map((node) => node.id));
      setSelectedEdges(edges.map((edge) => edge.id));
    },
  });

  callBackReactFlowSelectionChanges(selectedNodes, selectedEdges);

 return <div className="invisible"/>;
}

export const bgGuideType = ['none', BackgroundVariant.Cross, BackgroundVariant.Dots, BackgroundVariant.Lines];

function ItemBox(
    {
        index,
        selectIndex,
        setIndexState,
        children
    } : {
        index : number,
        selectIndex : number,
        setIndexState : (index : number) => void,
        children: React.ReactNode
    }
) {
    const thisIndex = index;
    return (
        <button
         onClick={() => {setIndexState(thisIndex)}} 
         className={clsx("text-sm rounded px-[5px]",
         "shadow-md",
         {"bg-slate-100" : selectIndex !== index},
         {"bg-slate-300" : selectIndex === index}) }>
            {children}
        </button>
    )
}

export function RadioBox(
    {
        selectIndex,
        items,
        setIndexState
    } : {
        selectIndex : number,
        items : string[]
        setIndexState : (index : number) => void
    }
) {
    return (
        <div className="flex space-x-[2px]">
            {
            items.map((item, index) => {
                return (
                    <ItemBox
                    key={item}
                    index={index}
                    selectIndex={selectIndex}
                    setIndexState={setIndexState}>
                        {item}
                    </ItemBox>
                );
            })
        }
        </div>
    )
}
