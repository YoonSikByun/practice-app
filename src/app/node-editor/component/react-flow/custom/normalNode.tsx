import { Position } from 'reactflow';
import '@/app/node-editor/css/component/react-flow/custom-nodes/TextUpdaterNode.scss';
import CustomHandle from '@/app/node-editor/component/react-flow/custom/CustomHandle';
import NodeBoundary from '@/app/node-editor/component/node/nodeBoundary';

export function NormalNode(
  {
    width,
    height,
    nodeKind,
    className
  } : {
    width : number,
    height : number,
    nodeKind : string,
    className : string
  }
) {
  return (
    <>
      <CustomHandle type='target' position={Position.Top} id='Top' isConnectable={2}/>
      <CustomHandle type='target' position={Position.Left} id='Left' isConnectable={2}/>
      <CustomHandle type='source' position={Position.Right} id='Right' isConnectable={2}/>
      <CustomHandle type='source' position={Position.Bottom} id='Bottom' isConnectable={2}/>
      <NodeBoundary width={width} height={height} nodeKind={nodeKind} className={className} isDraggable={false}/>
    </>
  );
}