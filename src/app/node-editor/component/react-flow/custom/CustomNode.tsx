import { Position, useReactFlow } from 'reactflow';
import CustomHandle from '@/app/node-editor/component/react-flow/custom/CustomHandle';
import NodeBoundary from '@/app/node-editor/component/node/nodeBoundary';
import {NoramlNodeData} from '@/app/node-editor/component/react-flow/custom/nodeTypes';
import clsx from 'clsx';
import '@/app/node-editor/css/component/react-flow/custom/CustomNode.scss';

import { TrashIcon, PlayIcon } from '@heroicons/react/24/solid';

function OptionButtons({
  id
} : {
  id : string
}) {
  const { setNodes } = useReactFlow();

  const onDelNodeClick = () => {
    setNodes((nodes) => nodes.filter((nodes) => nodes.id !== id));
  };

  return (
    <button className='node-option-button' onClick={onDelNodeClick}><TrashIcon/></button>
  )
}

function OperationButtons({
  id
} : {
  id : string
}) {
  return (
    <button className='node-option-button' onClick={()=>alert(`Play a node[${id}]`)}><PlayIcon/></button>
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
  console.log(` selected Node : ${type} - ${id}`);
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
          <div className={clsx('invisible group-hover:visible',
                'w-full h-[40px] absolute top-[-42px] left-[0px]'
              )}
          >
            <OptionButtons id={id}/>
          </div>

          {selected &&
            <div className={clsx('w-full h-[40px] absolute top-[45px] left-[0px]')}
            >
              <OperationButtons id={id}/>
            </div>
          }
        </NodeBoundary>
    </div>
  );
}