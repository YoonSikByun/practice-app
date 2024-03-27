import '@/app/main/scss/Workspace.scss';

import { useMemo, useState } from 'react';
import { Bars3Icon } from "@heroicons/react/24/outline"
import { calcStyle } from '@/app/main/lib/calcStyleRegion';
import WorkSpace, {TaskCreateCard} from '@/app/main/component/workspace/Workspace';
import { MultiCheckboxManager } from '@/app/main/lib/multiControlManager';
import { DeleteWorkspaceData, DeleteWorkspaces , WorkspaceData } from '@/app/api/lib/service/common/definition';
import MenuContext from '@/app/main/component/menuContext/menuContext';
import {
    ACTION,
    ContextMenuCallback,
    ContextMenuArgument,
    MenuRole
} from '@/app/main/component/menuContext/definition';
import { RQ_URL, submitDeleteWorkspace, submitDeleteWorkspaces } from '@/app/api/lib/service/client/request';
import { mutate } from 'swr';
import { globalData } from '@/app/common/lib/globalData';
import { globalMessageManager } from '@/app/common/lib/globalMessage';
import MenuContextDeletePopup from '../popup/MenuContextDeletePopup';

export default function WorkspaceList( 
    { 
        workspaceList, 
        multiCheckboxManager,
        setWorkSpaceCheck,
        workSpaceCheck,
    } : 
    {
        workspaceList : WorkspaceData[],
        multiCheckboxManager : MultiCheckboxManager,
        setWorkSpaceCheck : any,
        workSpaceCheck : boolean
    }
) {
    
    const allChek = (e : any) => {
        multiCheckboxManager.allChek(e.target.checked);
        setWorkSpaceCheck(e.target.checked)
    }
    const contextMenucallback = (action : ACTION, parentKey : string) => {
        console.log('----------------------------------');
        console.log(`call back : action - ${action}, parentKey - ${workspaceList}`);
        console.log('----------------------------------');
        switch(action)
        {
            case ACTION.UPDATE:
            break;
            case ACTION.DELETE:
                const multiCheckedIds = multiCheckboxManager.getAllChecked() // 체크박스 선택된 WorkSapce ID
                if(multiCheckedIds.length == 0){
                        globalMessageManager.setInfoMsg('선택된 작업공간이 없습니다.');
                        break;
                }
                setDeletePopupData({
                    ...deletePopupData, ids : multiCheckedIds}
                );
                setDeleteVisible(true)
                break;
            case ACTION.COPY:
            break;
            case ACTION.EXPORT:
            break;
        }
    }

    const [visibleContextMenu, setVisibleContextMenu] = useState(false);
    const [conextMenuArg, setContextMenuArg] = useState<ContextMenuArgument>({
        clientX : -1, clientY : -1,
        menuRole : MenuRole.WORKSPACELIST, parentKey : '',
        callbackProc : contextMenucallback});

    const handleClickContextMenuButton = (e : React.MouseEvent<HTMLElement>) => {
        setVisibleContextMenu(!visibleContextMenu);
        setContextMenuArg({...conextMenuArg, clientX : e.clientX, clientY: e.clientY});
    }
    const [deleteVisible , setDeleteVisible] = useState(false);
    const [deletePopupData , setDeletePopupData] = useState<DeleteWorkspaceData>({
        ids: [],
        name:'',
        role: "WorkSpaceList"
    })

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
                <input type='checkbox' className='h-7 w-7' onChange={allChek} checked = {workSpaceCheck}/>
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
                        <WorkSpace
                            key={index}
                            id={data.id}
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
        <MenuContextDeletePopup 
                visible = {deleteVisible} 
                setVisible={setDeleteVisible} 
                data= {deletePopupData}
                checkBoxManager = {multiCheckboxManager}
        ></MenuContextDeletePopup>
    </div>

    )
}
