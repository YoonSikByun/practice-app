import '@/app/main/scss/Workspace.scss';

import { useMemo } from 'react';
import { Bars3Icon } from "@heroicons/react/24/outline"
import { calcStyle } from '@/app/main/util/calcStyleRegion';
import TaskCard, {TaskCreateCard, TaskCardInfo} from '@/app/main/component/workspace/TaskCard';
import { MultiCheckboxManager } from '@/app/main/util/multiControlManager';
// import CheckBox from '@/app/main/component/controls/CheckBox';

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
                <input type='checkbox' className='h-5 w-5' onChange={allChek}/>
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
                        <TaskCard key={index} id={`${index}`} checkBoxManager={multiCheckboxManager} data={data}/>
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
