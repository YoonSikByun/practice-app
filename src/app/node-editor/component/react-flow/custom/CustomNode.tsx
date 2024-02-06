import { useCallback, useEffect, useState } from 'react';
import { Position, useReactFlow } from 'reactflow';
import CustomHandle from '@/app/node-editor/component/react-flow/custom/CustomHandle';
import NodeBoundary from '@/app/node-editor/component/node/nodeBoundary';
import {NoramlNodeData} from '@/app/node-editor/component/react-flow/custom/nodeTypes';
import clsx from 'clsx';
import '@/app/node-editor/css/component/react-flow/custom/CustomNode.scss';
import { TrashIcon, PlayIcon } from '@heroicons/react/24/solid';
import { nodeChangeCallBackManager } from '@/app/node-editor/util/globalStateManager';

function TopButtons({
  id
} : {
  id : string
}) {
  const { setNodes } = useReactFlow();

  const onDelNodeClick = () => {
    setNodes((nodes) => nodes.filter((nodes) => {
      if(nodes.id !== id)
        return true;

        nodeChangeCallBackManager.deleteSetShowOptButtonsCallback(id);

      return false;
    }));
  };

  return (
    <div className={clsx('invisible group-hover:visible',
                'w-full h-[40px] absolute top-[-42px] left-[0px]'
              )}
    >
      <button className='node-option-button' onClick={onDelNodeClick}><TrashIcon/></button>
    </div>
  )
}

function BottomButtons({
  id,
} : {
  id : string,
}) {
  return (
    <div className={clsx('h-[20px] w-[20px] absolute top-[45px] left-[0px]')}>
      <button className='node-option-button' onClick={()=>alert(`Play a node[${id}]`)}><PlayIcon/></button>
    </div>
  )
}

export function CustomNode(
  {
    id,
    type,
    data,
    selected
  } : {
    id : string,
    type : string,
    data : NoramlNodeData,
    selected : boolean
  }
) {
  const [showOptButtons, setShowOptButtons] = useState(false);
  useEffect(() => nodeChangeCallBackManager.registerSetShowOptButtonsCallback(id, setShowOptButtons), [id, setShowOptButtons]);

  return (
    <div className='group'>
      <CustomHandle type='target' position={Position.Left} id='left' isConnectable={2}/>
      <CustomHandle type='source' position={Position.Right} id='right' isConnectable={2}/>
      <NodeBoundary
        width={data?.width ?? 0}
        height={data?.height ?? 0}
        nodeKind={data?.nodeKind ?? ''}
        className={clsx(data?.className ?? '', 
          {'shadow-md shadow-gray-500' : !selected},
          {'shadow-lg shadow-emerald-950 border-[3px]' : selected}
        )}
        Icon={data?.icon}
        isDraggable={false}
      >
        <TopButtons id={id}/>
        {(showOptButtons) && <BottomButtons id={id}/>}
      </NodeBoundary>
    </div>
  );
}