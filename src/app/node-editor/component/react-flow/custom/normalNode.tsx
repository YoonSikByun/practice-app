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
      <CustomHandle type='source' position={Position.Top} id='Top' isConnectable={1}/>
      <CustomHandle type='source' position={Position.Left} id='Left' isConnectable={1}/>
      <CustomHandle type='source' position={Position.Right} id='Right' isConnectable={1}/>
      <CustomHandle type='source' position={Position.Bottom} id='Bottom' isConnectable={1}/>
      <NodeBoundary width={width} height={height} nodeKind={nodeKind} className={className}/>
    </>
  );
}