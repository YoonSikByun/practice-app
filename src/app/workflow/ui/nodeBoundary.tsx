import '@/css/workflow/ui/nodeBoundary.scss'
import clsx from "clsx"

const NodeBoundary = (
    {
        height,
        nodeKind,
        designMode
    } : {
        height : number,
        nodeKind : string,
        designMode : boolean
    }
) => (
    <div className={
        clsx('select-none bg-orange-200 m-1',
            'shadow-md border-[1px] border-rose-600 border-solid rounded-[8px]',
            'node-inner')
            } style={{height: `${height}px`}}>
        <div className={
            clsx('relative w-fit h-fit', 'top-[4px] left-[5px] px-[4px]',
            'bg-zinc-300 rounded')}>
            {nodeKind}
        </div>
        <div className={
            clsx('relative w-fit h-fit', 'top-[0px] left-[100px]',
                'bg-transparent',
                'shape-play')}/>
    </div>
);

export default NodeBoundary;