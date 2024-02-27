import '@/app/main/scss/Workspace.scss';

import { useMemo } from 'react';
import { Bars3Icon } from "@heroicons/react/24/outline"
import { calcStyle } from '@/app/main/lib/calcStyleRegion';
import MenuContext from '../menuContext/menuContext';
import { menuItems } from '../menuContext/menuItems';
import { useRef, useState } from 'react';
import TaskCard, {TaskCreateCard, TaskCardInfo} from '@/app/main/component/workspace/TaskCard';
import { MultiCheckboxManager } from '@/app/main/lib/multiControlManager';

const testData : TaskCardInfo = {
    task_name : 'Task Name',
    create_date : '2023/02/22 - 14:10:53',
    update_date : '2023/02/22 - 14:10:53',
    create_user : 'admin',
    update_user : 'admin',
    description : '■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n■ 이거슨 테스트...\n'
}

const testDataList : TaskCardInfo[] = [
    testData, testData, testData, testData, testData, testData, testData,
    testData, testData, testData, testData, testData, testData, testData,
    testData, testData, testData, testData, testData, testData, testData
]

export default function WorkspaceList() {
    const contextMenuRef = useRef<HTMLInputElement>(null);
    const [contextMenu , setContextMenu] = useState({
        position : {
            x: 0, 
            y: 0
        },
        isToggled : false
    })
    const handleContextMenu = (e : any) => {
        e.preventDefault();
        setContextMenu({
            ...contextMenu,
            isToggled: true
        });
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
                isToggled :true
            })
        }

    }
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
                <button><Bars3Icon className='h-7 w-7 mr-2' /></button>
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
                testDataList.map((data, index) => {
                    return (
                        <TaskCard key={index} id={`${index}`} checkBoxManager={multiCheckboxManager}  handleContextMenu={handleContextMenu} data={data}/>
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
                contextMenuRef = {contextMenuRef}
                contextMenu = {contextMenu}
                width = {200}
                height= {200}
                role = "menuItem"
                menuItems = {menuItems}
        ></MenuContext>
    </div>
    )
}
