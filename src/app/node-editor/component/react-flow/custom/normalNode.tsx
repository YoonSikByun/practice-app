import { Position } from 'reactflow';
import CustomHandle from '@/app/node-editor/component/react-flow/custom/CustomHandle';
import NodeBoundary from '@/app/node-editor/component/node/nodeBoundary';
import {NoramlNodeData} from '@/app/node-editor/component/react-flow/custom/nodeTypes';
import clsx from 'clsx';

export function NormalNode(
  {
    data,
    selected
  } : {
    data : NoramlNodeData,
    selected : boolean
  }
) {
  return (
    <>
      <CustomHandle type='target' position={Position.Top} id='Top' isConnectable={2}/>
      <CustomHandle type='target' position={Position.Left} id='Left' isConnectable={2}/>
      <CustomHandle type='source' position={Position.Right} id='Right' isConnectable={2}/>
      <CustomHandle type='source' position={Position.Bottom} id='Bottom' isConnectable={2}/>
      <NodeBoundary
        width={data?.width ?? 0}
        height={data?.height ?? 0}
        nodeKind={data?.nodeKind ?? ''}
        className={clsx(data?.className ?? '', 
        {'shadow-lg shadow-lime-900 border-[3px]' : selected})}
        isDraggable={false}/>
    </>
  );
}