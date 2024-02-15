import React, { useMemo } from 'react';
import { getConnectedEdges, Handle, useNodeId, useStore, Position, HandleType } from 'reactflow';
import clsx from "clsx"

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
        className={clsx({"h-[15px] w-[15px] bg-red-700" : (type === 'source')},
                        {"h-[15px] w-[15px] bg-blue-700" : (type === 'target')})}
        type={type}
        position={position}
        id={id}
        isConnectable={isHandleConnectable}/>
    );
};

export default CustomHandle;