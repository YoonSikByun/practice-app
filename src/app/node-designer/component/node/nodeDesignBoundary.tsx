import NodeBoundary from "@/app/node-designer/component/node/nodeBoundary";

export default function NodeDesignBoundary(    {
    width,
    height,
    nodeKind,
    Icon,
    className
} : {
    width : number,
    height : number,
    nodeKind : string,
    Icon : any,
    className : string
}) {

    return (
        <NodeBoundary width={width}
        height={height}
        nodeKind={nodeKind}
        className={className}
        Icon={Icon}
        isDraggable={true} />

    )
}