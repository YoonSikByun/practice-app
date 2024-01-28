import NodeBoundary from "./nodeBoundary";

export default function NodeDesignBoundary(    {
    width,
    height,
    nodeKind
} : {
    width : number,
    height : number,
    nodeKind : string
}) {

    return (
        <NodeBoundary width={width}
        height={height}
        nodeKind={nodeKind}
        designMode={true}/>
    )
}