import '@/app/main/scss/Workspace.scss';

import { useMemo } from 'react';
import { Bars3Icon } from "@heroicons/react/24/outline"
import { calcStyle } from '@/app/main/lib/calcStyleRegion';
import TaskCard, {TaskCreateCard} from '@/app/main/component/workspace/TaskCard';
import { MultiCheckboxManager } from '@/app/main/lib/multiControlManager';
import { WorkspaceData } from '@/app/common/lib/definition';

type WorkspaceListProps = {
    handleContextMenu: (e: any, MenuRole: string) => void;
};
export default function WorkspaceList( 
    { 
        handleContextMenu,
        workspaceList, 
    } : 
    {
        handleContextMenu : (e: any, MenuRole: string , id : string) => void
        workspaceList : WorkspaceData[]
    }) {
    const multiCheckboxManager = useMemo(() => new MultiCheckboxManager(), []);
    const allChek = (e : any) => multiCheckboxManager.allChek(e.target.checked);

    return (
    <div className='task-list'>
        <div className='head rounded bg-titlebg-2 border-[1px] border-borderclr-bold'
            style={{
                height: calcStyle.workspace.getTaskListHeadHeight(),
            }}
        >
            <div className="title">
                <p className='ml-3 text-xl font-bold'>작업목록</p>
            </div>
            <div className="edit">
                <button onClick={e=> handleContextMenu(e , "TaskList", '')}>
                    <Bars3Icon className='h-7 w-7 mr-2' />
                </button>
                <input type='checkbox' className='h-7 w-7' onChange={allChek}/>
            </div>
        </div>
        <div className='body border-b-[1px] border-borderclr-bold'
            style={{
                height: calcStyle.workspace.getTaskListBodyOuterHeight(),
                padding: calcStyle.workspace.getTaskListBodyPadding()
            }}
        >
            <div className='task-container'
                style={{
                    height: calcStyle.workspace.getTaskListBodyInnerHeight()
                }}
            >
                <TaskCreateCard/>
            {
                (workspaceList && workspaceList.length > 0 ) &&workspaceList.map((data, index) => {
                    return (
                        <TaskCard
                            key={index} id={`${index}`} checkBoxManager={multiCheckboxManager}
                            handleContextMenu={(e:any) => handleContextMenu(e,"TaskCard", String(index))}
                            data={data}
                        />
                    );
                })
            }
            </div>
        </div>
        <div className='paging-list text-center'
            style={{
                height: calcStyle.workspace.getPagingListHeight(),
                lineHeight: calcStyle.workspace.getPagingListHeight()
            }}
        >
            <span className='text-xl font-bold'>
                {'<  0  1  2  3  4  5  10  11  12  13  14  15 ... >'}
            </span>
        </div>
    </div>
    )
}
