import { BackgroundVariant } from "reactflow";
import clsx from "clsx";

import { useState } from 'react';
import { useOnSelectionChange } from 'reactflow';

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
         className={clsx("font-sans text-sm rounded px-[5px]",
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