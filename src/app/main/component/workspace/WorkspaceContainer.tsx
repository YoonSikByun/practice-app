import '@/app/main/scss/Workspace.scss';

import { InformationCircleIcon, Bars3Icon } from "@heroicons/react/24/outline"
import WorkspaceList from '@/app/main/component/workspace/WorkspaceList';
import { calcStyle } from '@/app/main/lib/calcStyleRegion';
import MenuContext from '../menuContext/menuContext';
import { useEffect, useRef, useState } from 'react';
import { MenuItem, menuGroups } from '../menuContext/MenuGroup';
import { TaskCardInfo } from './TaskCard';

type HandleContextMenuFunction = (e: any, MenuRole: string) => void;

const testData : TaskCardInfo = {
    task_name : 'Task Name_1',
    create_date : '2023/02/22 - 14:10:53',
    update_date : '2023/02/22 - 14:10:53',
    create_user : 'admin',
    update_user : 'admin',
    description : '■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n'
}
const testData2 : TaskCardInfo = {
    task_name : 'Task Name_2',
    create_date : '2023/02/22 - 14:10:53',
    update_date : '2023/02/22 - 14:10:53',
    create_user : 'admin',
    update_user : 'admin',
    description : '■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n'
}
const testData3 : TaskCardInfo = {
    task_name : 'Task Name_3',
    create_date : '2023/02/22 - 14:10:53',
    update_date : '2023/02/22 - 14:10:53',
    create_user : 'admin',
    update_user : 'admin',
    description : '■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n'
}
const testData4 : TaskCardInfo = {
    task_name : 'Task Name_4',
    create_date : '2023/02/22 - 14:10:53',
    update_date : '2023/02/22 - 14:10:53',
    create_user : 'admin',
    update_user : 'admin',
    description : '■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n'
}
const testData5 : TaskCardInfo = {
    task_name : 'Task Name_5',
    create_date : '2023/02/22 - 14:10:53',
    update_date : '2023/02/22 - 14:10:53',
    create_user : 'admin',
    update_user : 'admin',
    description : '■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n'
}
const testData6 : TaskCardInfo = {
    task_name : 'Task Name_6',
    create_date : '2023/02/22 - 14:10:53',
    update_date : '2023/02/22 - 14:10:53',
    create_user : 'admin',
    update_user : 'admin',
    description : '■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n'
}
const testDataList : TaskCardInfo[] = [
    testData,testData2, testData3, testData4, testData5, testData6
]

export default function WorkspaceContainer() {
    const [selectedMenuGroup , setSelectedMenuGroup] =  useState<MenuItem[]>([]);
    const contextMenuRef = useRef<HTMLInputElement>(null);
    const [DataList , setDataList] = useState(testDataList)
    const [contextMenu , setContextMenu] = useState({
        position : {
            x: 0, 
            y: 0
        },
        isToggled : false,
        id : ''
    })
    const handleContextMenu = (e : any , MenuRole : string , id : string) => {
        e.preventDefault();
        setContextMenu({
            ...contextMenu,
            isToggled: true
        });
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
    }

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
                    <p className='text-2xl font-bold'>Project name</p>
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
                testDataList = {DataList}
            />
            <MenuContext 
                contextMenuRef = {contextMenuRef}
                contextMenu = {contextMenu}
                width = {200}
                menuItems = {selectedMenuGroup}
                TaskCardList = {DataList}
                setDataList = {setDataList}
            ></MenuContext>
        </div>
    )
}