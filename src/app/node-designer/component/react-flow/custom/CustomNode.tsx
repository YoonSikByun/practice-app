import { useEffect, useState } from 'react';
import { Position, useReactFlow } from 'reactflow';
import CustomHandle from '@/app/node-designer/component/react-flow/custom/CustomHandle';
import NodeBoundary from '@/app/node-designer/component/node/nodeBoundary';
import {NoramlNodeData} from '@/app/node-designer/component/react-flow/custom/nodeTypes';
import clsx from 'clsx';
import '@/app/node-designer/scss/component/react-flow/custom/CustomNode.scss';
import { TrashIcon, PlayIcon, DocumentTextIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import { multiNodeStateCallback } from '@/app/node-designer/util/nodeDesignerStateManager';

function TopButtons({
  id,
  parentId
} : {
  id : string,
  parentId : string
}) {
  const { setNodes } = useReactFlow();

  //현 노드를 삭제한다.
  const onDelNodeClick = () => {
    setNodes((nodes) => {
        const deleted : any = [];
        const changedNodes = nodes.filter((nodes) => {
          if(nodes.id !== id)
            return true;

          multiNodeStateCallback.call(parentId).deleteSetShowOptButtonsCallback(id);
          deleted.push(nodes);
          return false;
        });

        //노드가 삭제됨에 따라 라인 재구성
        multiNodeStateCallback.call(parentId).reStructureEdges(deleted);

        return changedNodes;
      }
    );
    
  };

  return (
    <div className={
      clsx('invisible group-hover:visible',
          'absolute top-[-55px] left-[0px]',
          'w-full h-[45px]')
    }>
      <table className={clsx('w-[115px] border-2 border-dotted border-slate-800')}>
        <tbody>
        <tr  className='flex h-[30px]'>
          <td className='h-inherit w-[30px]'>
            <button
              title='Delete'
              className='absolute top-[3px] node-option-button'
              onClick={onDelNodeClick}
            >
              <TrashIcon/>
            </button>
          </td>
          <td className='h-inherit w-[30px]'>
            <button
              title='Control box'
              className='absolute top-[3px] node-option-button'
              onClick={()=>alert('Show a control-box')}
            >
              <AdjustmentsHorizontalIcon/>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

function BottomButtons({
  id,
} : {
  id : string,
}) {

  return (
    <table className={
      clsx('absolute top-[45px] left-[0px]',
          'h-[30px] w-[115px]',
          'border-2 border-dotted border-slate-800'
    )}>
      <tbody>
      <tr className='flex h-[30px] bg-yellow-100'>
        <td className='h-inherit w-[30px]'>
          <button
            title='Play'
            className='absolute top-[2px] node-option-button'
            onClick={()=>alert(`Play a node!! [${id}]`)}
          >
            <PlayIcon/>
          </button>
        </td>
        <td className='h-inherit w-[30px]'>
          <button
            title='Log viwer'
            className='absolute top-[2px] node-option-button'
            onClick={()=>alert(`Play a Log viewer!! [${id}]`)}
          >
            <DocumentTextIcon/>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
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
  const parentId : string = data.parentId ?? '';
  useEffect(() => {
    
    multiNodeStateCallback.call(parentId).registerSetShowOptButtonsCallback(id, setShowOptButtons);
    },
  [id, setShowOptButtons, parentId]);

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
          {'shadow-lg shadow-emerald-950 border-[3px]' : selected})}
        Icon={data?.icon}
        isDraggable={false}
      >
        <TopButtons id={id} parentId={parentId}/>
        {(showOptButtons) && <BottomButtons id={id}/>}
      </NodeBoundary>
    </div>
  );
}