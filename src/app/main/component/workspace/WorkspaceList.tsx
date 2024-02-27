import '@/app/main/scss/Workspace.scss';

import { Bars3Icon } from "@heroicons/react/24/outline"
import { calcStyle } from '@/app/main/util/calcStyleRegion';
import TaskCard, {TaskCardInfo} from '@/app/main/component/workspace/TaskCard';
import MenuContext from '../menuContext/menuContext';
import { menuItems } from '../menuContext/menuItems';
import { useRef, useState } from 'react';

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
    return (
    <div className='task-list'>
        <div className='head rounded bg-titlebg-2'
            style={{
                height: calcStyle.workspace.getTaskListHeadHeight(),
            }}
        >
            <div className="title">
                <p className='ml-3 text-xl font-bold'>작업목록</p>
            </div>
            <div className="edit">
                <button><Bars3Icon className='h-7 w-7' /></button>
                <input type='checkbox' className='h-5 w-5' />
            </div>
        </div>
        <div className='body'
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
            {
                testDataList.map((data, index) => {
                    return (
                        <TaskCard key={index} data={data} handleContextMenu={handleContextMenu}/>
                    );
                })
            }
            </div>
        </div>
        <div className='paging-list bg-red-200 text-center'
            style={{
                height: calcStyle.workspace.getPagingListHeight(),
                lineHeight: calcStyle.workspace.getPagingListHeight()
            }}
        >
            <span className='text-xl font-bold'>
                {'<  0  1  2  3  4  5  10  11  12  13  14  15  >'}
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
