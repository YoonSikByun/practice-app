import '@/app/main/scss/Workspace.scss';

import { InformationCircleIcon, Bars3Icon } from "@heroicons/react/24/outline"
import WorkspaceList from '@/app/main/component/workspace/WorkspaceList';
import { calcStyle } from '@/app/main/lib/calcStyleRegion';
import { useEffect, useState, useCallback } from 'react';
import useSWR from 'swr';
import { RQ_URL } from '@/app/api/lib/service/client/request';
import { Get } from '@/app/common/lib/fetchServer';

import MenuContext from '@/app/main/component/menuContext/menuContext';
import {
    ACTION,
    ContextMenuCallback,
    ContextMenuArgument,
    MenuRole
} from '@/app/main/component/menuContext/definition';

import { WorkspaceData } from '@/app/api/lib/service/common/definition';
import { globalDataStateManager } from '@/app/common/lib/globalStateManager';
import { globalData } from '@/app/common/lib/globalData';

export default function WorkspaceContainer() {
    const [workspaceList, setWorkspaceList] = useState<WorkspaceData[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<string>(globalData.menuInfo.getSelectedProjectId());

    globalDataStateManager.registerSetSelectedProjectId(setSelectedProjectId);

    const fetcher = useCallback(
        async ([url, projectId]: string[]) => await Get(url, {projectId: projectId}), []);

    const {data, isLoading, error} = useSWR([RQ_URL.SELECT_WORKSPACE, selectedProjectId], fetcher);

    console.log(`[${RQ_URL.SELECT_WORKSPACE}] data : ${data}, isLoading : ${isLoading}, error : ${error}`);

    useEffect(() => {
        const workspaceData = (data && data['data']) ? data['data'] : {};

        if('workspace' in workspaceData)
            setWorkspaceList(workspaceData['workspace']);
        else
            setWorkspaceList([]);

        const selectedProjectData = globalData.menuInfo.getSelectedProjectData();

        if(selectedProjectData) {
            selectedProjectData._count['workspaces'] = ('count' in workspaceData) ? workspaceData['count'] : 0;
            globalDataStateManager.setSelectedProjectItem({...selectedProjectData});
        }
        else {
            globalDataStateManager.setSelectedProjectItem({});
        }
    }, [data, isLoading, error]);

    const contextMenucallback : ContextMenuCallback = (action : ACTION, parentKey : string) => {
        console.log('----------------------------------');
        console.log(`call back : action - ${action}, parentKey - ${parentKey}`);
        console.log('----------------------------------');
    }

    const [visibleContextMenu, setVisibleContextMenu] = useState(false);
    const [conextMenuArg, setContextMenuArg] = useState<ContextMenuArgument>({
        clientX : -1, clientY : -1,
        menuRole : MenuRole.PROJECT, parentKey : '',
        callbackProc : contextMenucallback});

    const handleClickContextMenuButton = (e : React.MouseEvent<HTMLElement>) => {
        setVisibleContextMenu(!visibleContextMenu);
        setContextMenuArg({
            ...conextMenuArg, clientX : e.clientX, clientY: e.clientY});
    }

    return (
        <div className='workspace-container'
            style={{
                width: calcStyle.workspace.getContainerHeight(),
                height: calcStyle.workspace.getContainerWidth(),
                margin: calcStyle.workspace.getOuterMargin()
            }}
        >
            {/* 프로젝트 제목 부분 */}
            <div className='project-title'
                style={{
                    height: calcStyle.workspace.getProjectContainerHeight()
                }}
            >
                <div className="title">
                    <p className='text-2xl font-bold'>{globalData.menuInfo.getSelectedProjectData()?.name ?? ''}</p>
                </div>
                <div className="edit">
                    <button
                        onClick={(e) => handleClickContextMenuButton(e)}
                    >
                        <Bars3Icon className='h-7 w-7' />
                    </button>
                </div>
            </div>
            {/* 프로젝트 생성 정보 */}
            <div className='project-information'
                style={{
                    height: calcStyle.workspace.getProjectContainerHeight()
                }}
            >
                <div className='content'>
                    <div><InformationCircleIcon className='h-5 w-5 mr-1' /></div>
                    <div>Create on 2023/02/21 23:35 by hanaTI@mail.com</div>
                </div>
            </div>
            <WorkspaceList workspaceList = {workspaceList}/>
            <MenuContext
                visible={visibleContextMenu}
                setVisible={setVisibleContextMenu}
                contextMenuArgument={conextMenuArg}
            />
        </div>
    )
}
