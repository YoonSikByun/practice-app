import '@/app/node-editor/css/component/nodeBoundary.scss'
import clsx from "clsx"

const NodeBoundary = (
    {
        width,
        height,
        nodeKind,
        className,
        isDraggable = false
    } : {
        width : number,
        height : number,
        nodeKind : string,
        className : string,
        isDraggable : boolean
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
        {/* 노드 타이틀 */}
        <div className={
            clsx('relative w-fit h-fit', 'top-[4px] left-[5px] px-[4px]',
            'bg-zinc-300 rounded')}>
            {nodeKind}
        </div>
        {/* 노드 실행/정지버튼 표시 */}
        <div className={
            clsx('relative w-fit h-fit', 'top-[0px] left-[100px]',
            'bg-transparent',
            'shape-play')}/>
    </div>);
}

export default NodeBoundary;