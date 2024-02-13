import React, { useMemo } from 'react';
import { getConnectedEdges, Handle, useNodeId, useStore, Position, HandleType } from 'reactflow';

const selector = (s : any) => ({
    nodeInternals: s.nodeInternals,
    edges: s.edges,
});

const CustomHandle = (
    {
        type,
        position,
        id,
        isConnectable
    } : {
        type : HandleType,
        position : Position,
        id : string,
        isConnectable : number
    }
) => {
    const { nodeInternals, edges } = useStore(selector);
    const nodeId = useNodeId();
    const isHandleConnectable = useMemo(() => {
        const node = nodeInternals.get(nodeId);
        const connectedEdges = getConnectedEdges([node], edges);

        return connectedEdges.length < isConnectable;
    }, [nodeInternals, edges, nodeId, isConnectable]);

    return (
    <Handle
        style={{cursor: "all-scroll"}}
        className='h-[15px] w-[15px] bg-slate-400'
        type={type}
        position={position}
        id={id}
        isConnectable={isHandleConnectable}/>
    );
};

export default CustomHandle;