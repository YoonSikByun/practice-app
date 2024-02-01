import { useCallback } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import './text-updater-node.css';
const handleStyle = { left: 10 };

export type NodeData = {
  value: number;
};

export function TextUpdaterNode({ data } : NodeProps<NodeData>) {
  const onChange = useCallback((evt : any) => {console.log(evt.target.value);}, []);
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className='text-updater-node'>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </>
  );
}