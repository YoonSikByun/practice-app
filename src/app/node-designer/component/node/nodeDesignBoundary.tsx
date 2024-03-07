import {NodeBoundary} from "@/app/node-designer/component/node/nodeBoundary";

export default function NodeDesignBoundary(    {
    width,
    height,
    nodeKind,
    iconKind,
    className
} : {
    width : number,
    height : number,
    nodeKind : string,
    iconKind : any,
    className : string
}) {

    return (
        <NodeBoundary width={width}
            height={height}
            nodeKind={nodeKind}
            className={className}
            iconKind={iconKind}
            isDraggable={true} />
    )
}