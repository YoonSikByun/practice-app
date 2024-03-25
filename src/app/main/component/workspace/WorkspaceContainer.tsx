import '@/app/main/scss/Workspace.scss';

import { InformationCircleIcon, Bars3Icon } from "@heroicons/react/24/outline"
import WorkspaceList from '@/app/main/component/workspace/WorkspaceList';
import { calcStyle } from '@/app/main/lib/calcStyleRegion';
import { useEffect, useState, useCallback, useMemo } from 'react';
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
import NewProjectPopup from "@/app/main/component/popup/NewProjectPopup";
import { mutate } from 'swr';
import { MultiCheckboxManager } from '../../lib/multiControlManager';


export default function WorkspaceContainer() {
    const [workspaceList, setWorkspaceList] = useState<WorkspaceData[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<string>(globalData.menuInfo.getSelectedProjectId());
    const [newProjectPopupVisible, setNewProjectPopupVisible] = useState(false);
    const multiCheckboxManager = useMemo(() => new MultiCheckboxManager(), []);
    globalDataStateManager.registerSetSelectedProjectId(setSelectedProjectId);

    const fetcher = useCallback(
        async ([url, projectId]: string[]) => await Get(url, {projectId: projectId}), []);

    const {data, isLoading, error} = useSWR([RQ_URL.SELECT_WORKSPACE, selectedProjectId], fetcher);
    console.log(`WorkSpaceContainer : [${RQ_URL.SELECT_WORKSPACE}] data : ${data}, isLoading : ${isLoading}, error : ${error}`);

    const contextMenucallback : ContextMenuCallback = useCallback(async (action : ACTION, parentKey : string) => {
        console.log('----------------------------------', selectedProjectId);
        console.log(`call back : action - ${action}, parentKey - ${parentKey}`);
        console.log('----------------------------------');
        
        switch(action){
            case ACTION.UPDATE:
                return <NewProjectPopup visible={!newProjectPopupVisible} setVisible={setNewProjectPopupVisible} />
                // return onClick={() => setNewProjectPopupVisible(!newProjectPopupVisible)}
            case ACTION.DELETE:
                const requestData : DeleteProject = {id : parentKey};
                const recvData = await submitDeleteProject(requestData, '프로젝트 삭제가 완료되었습니다.')
                if(!recvData['error']) {mutate(RQ_URL.SELECT_PROJECT);}
        }
    }, [newProjectPopupVisible, selectedProjectId]);

    const [conextMenuArg, setContextMenuArg] = useState<ContextMenuArgument>({
        clientX : -1, clientY : -1,
        menuRole : MenuRole.PROJECT, parentKey : '',
        callbackProc : contextMenucallback});

    useEffect(() => {
        const workspaceData = (data && data['data']) ? data['data'] : {};
        
        // 체크박스 State 초기값 세팅 
        if('workspace' in workspaceData){
            let workspaceList = workspaceData['workspace']
            setWorkspaceList(workspaceList);
            setWorkSpaceCheck(false);  
            multiCheckboxManager.setStates(workspaceList);
            multiCheckboxManager.allUnCheck();
        }
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

        setContextMenuArg({
            clientX : -1, clientY : -1,
            menuRole : MenuRole.PROJECT, parentKey :  selectedProjectData?.id ?? '',
            callbackProc : contextMenucallback});

    }, [data, isLoading, error, contextMenucallback, multiCheckboxManager]);
    
    const [visibleContextMenu, setVisibleContextMenu] = useState(false);
    const [workSpaceCheck , setWorkSpaceCheck] = useState(false);

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
                    <p className='text-2xl font-bold'>
                        {globalData.menuInfo.getSelectedProjectData()?.name ?? ''}
                    </p>
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
                    <div>Create on {globalData.menuInfo.getSelectedProjectData()?.createdAt ?? ''} by {globalData.menuInfo.getSelectedProjectData()?.creatorId ?? ''}</div>
                </div>
            </div>
            <WorkspaceList workspaceList={workspaceList} multiCheckboxManager = {multiCheckboxManager} setWorkSpaceCheck = {setWorkSpaceCheck} workSpaceCheck = {workSpaceCheck}/>
            <MenuContext
                visible={visibleContextMenu}
                setVisible={setVisibleContextMenu}
                contextMenuArgument={conextMenuArg}
            />
            {/* 컨텍스트 메뉴 팝업 */}
            <NewProjectPopup visible={newProjectPopupVisible} setVisible={setNewProjectPopupVisible} />
        </div>
    )
}
