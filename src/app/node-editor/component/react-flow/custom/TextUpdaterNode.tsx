import { useCallback } from 'react';
import { Position, NodeProps } from 'reactflow';
import '@/app/node-editor/css/component/react-flow/custom/TextUpdaterNode.scss';
import CustomHandle from '@/app/node-editor/component/react-flow/custom/CustomHandle';

const handleStyle = { left: 10 };

export function TextUpdaterNode() {
  const onChange = useCallback((evt : any) => {console.log(evt.target.value);}, []);
  return (
    <>
      <CustomHandle type='source' position={Position.Top} id='Top' isConnectable={1}/>
      <CustomHandle type='source' position={Position.Left} id='Left' isConnectable={1}/>
      <div className='text-updater-node'>
        <label className='text-black' htmlFor="text">Input:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag border-dotted border-2 border-sky-500" />
      </div>
      <CustomHandle type='source' position={Position.Right} id='Right' isConnectable={1}/>
      <CustomHandle type='source' position={Position.Bottom} id='Bottom' isConnectable={1}/>
    </>
  );
}