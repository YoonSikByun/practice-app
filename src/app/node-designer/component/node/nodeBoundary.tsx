import clsx from "clsx"
import { DocumentTextIcon, PencilSquareIcon, Squares2X2Icon } from '@heroicons/react/24/solid'
import { NodeKind } from "@/app/node-designer/config/node";

function Icon({kind} : {kind : string}) {
    switch(kind)
    {
        case NodeKind.KIND0:
            return <DocumentTextIcon className={clsx("relative m-[3px] h-5 w-5")} />
        case NodeKind.KIND1:
            return <PencilSquareIcon className={clsx("relative m-[3px] h-5 w-5")} />
        case NodeKind.KIND2:
            return <Squares2X2Icon className={clsx("relative m-[3px] h-5 w-5")} />
    }

    return <DocumentTextIcon className={clsx("relative m-[3px] h-5 w-5")} />
}

export function NodeBoundary(
    {
        width,
        height,
        nodeKind,
        className,
        iconKind,
        isDraggable = false,
        children = null,
    } : {
        width : number,
        height : number,
        nodeKind : string,
        className : string,
        iconKind : string,
        isDraggable : boolean,
        children? : React.ReactNode
    }
) {
    const onDragStart = (event : any, nodeType : string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move'; };

    return(
        <div className={className}
            style={{width: `${width}px`, height: `${height}px`}}
            onDragStart={(event) => onDragStart(event, nodeKind)}
            draggable={isDraggable}
        >
            <div className='relative flex top-[11px] left-[3px] px-[4px]'>
                <Icon kind={iconKind}/>
                <p>{nodeKind}</p>
                <div>{children}</div>
            </div>
        </div>
    );
}
