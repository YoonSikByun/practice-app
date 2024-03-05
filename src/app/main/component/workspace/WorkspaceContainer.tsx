import '@/app/main/scss/Workspace.scss';

import { InformationCircleIcon, Bars3Icon } from "@heroicons/react/24/outline"
import WorkspaceList from '@/app/main/component/workspace/WorkspaceList';
import { calcStyle } from '@/app/main/lib/calcStyleRegion';
import { useEffect, useRef, useState, useCallback } from 'react';
import useSWR from 'swr';
import { RQ_URL } from '@/app/api/lib/service/client/request';
import { Get } from '@/app/common/lib/fetchServer';
import MenuContext from '@/app/main/component/menuContext/menuContext';
import { MenuItem, menuGroups } from '@/app/main/component/menuContext/MenuGroup';
import { WorkspaceData } from '@/app/api/lib/service/common/definition';
import { globalDataStateManager } from '@/app/common/lib/globalStateManager';
import { globalData } from '@/app/common/lib/globalData';
const prettyjson = require('prettyjson');

type HandleContextMenuFunction = (e: any, MenuRole: string) => void;

export default function WorkspaceContainer() {
    const [selectedMenuGroup , setSelectedMenuGroup] =  useState<MenuItem[]>([]);
    const contextMenuRef = useRef<HTMLInputElement>(null);
    const [contextMenu , setContextMenu] = useState({
        position : {
            x: 0, 
            y: 0
        },
        isToggled : false,
        id : ''
    });
    const handleContextMenu = useCallback((e : any , MenuRole : string , id : string) => {
        e.preventDefault();
        setContextMenu({...contextMenu, isToggled: true});
        setSelectedMenuGroup(menuGroups[MenuRole])
        if(contextMenuRef.current){
            const contextMenuAttr = contextMenuRef.current.getBoundingClientRect()
            const isLeft = e.clientX < window?.innerWidth / 2
            let x
            let y = e.clientY;

            if(isLeft) {
                x = e.clientX
            } else {
                x = e.clientX - contextMenuAttr.width
            }

            setContextMenu({
                position : {
                    x,
                    y
                },
                isToggled :true,
                id : id
            })
        }
    }, [contextMenu]);

    useEffect(() => {
    	function closeOutsideClick(e :any) {
        	if (contextMenuRef.current && !contextMenuRef.current.contains(e.target)) {
                setContextMenu({
                    ...contextMenu,
                    isToggled: false
                });
            }
        }
        function handleWheel() {
            setContextMenu({
                ...contextMenu,
                isToggled: false
            });
        }
        document.addEventListener("mousedown", closeOutsideClick);
        document.addEventListener("wheel", handleWheel); 
        return () => { 
            document.removeEventListener("mousedown", closeOutsideClick); 
            document.removeEventListener("wheel", handleWheel);
        }
    }, [contextMenu, contextMenuRef]);

    const [workspaceList, setWorkspaceList] = useState<WorkspaceData[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<string>(globalData.menuInfo.getSelectedProjectId());

    globalDataStateManager.registerSetSelectedProjectIdCallback(setSelectedProjectId);

    const fetcher = useCallback(async ([url, projectId]: string[]) => await Get(url, {projectId: projectId}), []);
    const { data, isLoading, error } = useSWR([RQ_URL.SELECT_WORKSPACE, selectedProjectId], fetcher);

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
                    <button onClick={e => handleContextMenu(e,"Project", '')}><Bars3Icon className='h-7 w-7' /></button>
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
            <WorkspaceList 
                handleContextMenu = {handleContextMenu}
                workspaceList = {workspaceList}
            />
            {/* <MenuContext 
                contextMenuRef = {contextMenuRef}
                contextMenu = {contextMenu}
                width = {200}
                menuItems = {selectedMenuGroup}
                TaskCardList = {DataList}
                setDataList = {setDataList}
            ></MenuContext> */}
        </div>
    )
}