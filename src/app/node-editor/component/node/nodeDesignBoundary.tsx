import NodeBoundary from "./nodeBoundary";

export default function NodeDesignBoundary(    {
    width,
    height,
    nodeKind,
    designMode,
} : {
    width : number,
    height : number,
    nodeKind : string,
    designMode : boolean
}) {

    const handleClick = (e : MouseEvent) => {
        console.log(e.detail);

        switch(e.detail) {
            case 1:
                console.log('single click');
                break;
            case 2:
                console.log('double click');
                break;
            case 3:
                console.log('triple click');
                break;
            default:
                break;
        }
    }
    return (
        <NodeBoundary width={width}
        height={height}
        nodeKind={nodeKind}
        designMode={designMode}
        handleClick={handleClick}/>
    )
}