import clsx from "clsx"

const NodeBoundary = (
    {
        width,
        height,
        nodeKind,
        className,
        Icon,
        isDraggable = false,
        children = null,
    } : {
        width : number,
        height : number,
        nodeKind : string,
        className : string,
        Icon : any,
        isDraggable : boolean,
        children? : React.ReactNode
    }
) => {
    const onDragStart = (event : any, nodeType : string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move'; };

    return(<div className={className}
    style={{width: `${width}px`, height: `${height}px`}}
    onDragStart={(event) => onDragStart(event, nodeKind)}
    draggable={isDraggable}
    >
        <div className='relative flex top-[11px] left-[3px] px-[4px]'>
            {Icon ? <Icon className={clsx("relative m-[3px] h-5 w-5")} /> : null}
            <p>{nodeKind}</p>
            <div>{children}</div>
        </div>
    </div>);
}

export default NodeBoundary;