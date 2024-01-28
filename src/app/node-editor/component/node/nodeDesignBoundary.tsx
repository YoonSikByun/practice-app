import NodeBoundary from "./nodeBoundary";

export default function NodeDesignBoundary(    {
    width,
    height,
    nodeKind,
    className
} : {
    width : number,
    height : number,
    nodeKind : string,
    className : string
}) {

    return (
        <NodeBoundary width={width}
        height={height}
        nodeKind={nodeKind}
        designMode={true}
        className={className}/>
    )
}