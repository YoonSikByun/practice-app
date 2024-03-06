import '@/app/main/scss/Workspace.scss';

import { useMemo, useState } from 'react';
import { Bars3Icon } from "@heroicons/react/24/outline"
import { calcStyle } from '@/app/main/lib/calcStyleRegion';
import TaskCard, {TaskCreateCard} from '@/app/main/component/workspace/TaskCard';
import { MultiCheckboxManager } from '@/app/main/lib/multiControlManager';
import { WorkspaceData } from '@/app/api/lib/service/common/definition';
import MenuContext from '@/app/main/component/menuContext/menuContext';
import {
    ACTION,
    ContextMenuCallback,
    ContextMenuArgument,
    MenuRole
} from '@/app/main/component/menuContext/definition';

export default function WorkspaceList( 
    { 
        workspaceList, 
    } : 
    {
        workspaceList : WorkspaceData[]
    }
) {
    const multiCheckboxManager = useMemo(() => new MultiCheckboxManager(), []);
    const allChek = (e : any) => multiCheckboxManager.allChek(e.target.checked);

    const contextMenucallback : ContextMenuCallback = (action : ACTION, parentKey : string) => {
        console.log('----------------------------------');
        console.log(`call back : action - ${action}, parentKey - ${parentKey}`);
        console.log('----------------------------------');
    }

    const [visibleContextMenu, setVisibleContextMenu] = useState(false);
    const [conextMenuArg, setContextMenuArg] = useState<ContextMenuArgument>({
        clientX : -1, clientY : -1,
        menuRole : MenuRole.TASKLIST, parentKey : '',
        callbackProc : contextMenucallback});

    const handleClickContextMenuButton = (e : React.MouseEvent<HTMLElement>) => {
        setVisibleContextMenu(!visibleContextMenu);
        setContextMenuArg({...conextMenuArg, clientX : e.clientX, clientY: e.clientY});
    }

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
                <button onClick={e=> handleClickContextMenuButton(e)}>
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
                (workspaceList && workspaceList.length > 0 ) && workspaceList.map((data, index) => {
                    return (
                        <TaskCard
                            key={index}
                            id={`${index}`}
                            checkBoxManager={multiCheckboxManager}
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
        <MenuContext
            visible={visibleContextMenu}
            setVisible={setVisibleContextMenu}
            contextMenuArgument={conextMenuArg}
        />
    </div>

    )
}
