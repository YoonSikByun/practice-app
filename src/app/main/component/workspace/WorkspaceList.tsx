import '@/app/main/scss/Workspace.scss';

import { Bars3Icon } from "@heroicons/react/24/outline"
import { calcStyle } from '@/app/main/util/calcStyleRegion';
import TaskCard, {TaskCardInfo} from '@/app/main/component/workspace/TaskCard';

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
    return (
    <div className='task-list'>
        <div className='head'
            style={{
                height: calcStyle.workspace.getTaskListHeadHeight(),
            }}
        >
            <div className="title">
                <p className='text-xl'>작업목록</p>
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
                        <TaskCard key={index} data={data}/>
                    );
                })
            }
            </div>
        </div>
    </div>
    )
}
