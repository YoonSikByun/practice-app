import '@/app/main/scss/Workspace.scss';
import { Bars3Icon, ArchiveBoxIcon } from '@heroicons/react/24/outline';

export type TaskCardInfo = {
    task_name : string;
    create_date : string;
    update_date : string;
    create_user : string;
    update_user : string;
    description : string;
}

export default function TaskCard(
    {
        data
    } : {
        data : TaskCardInfo
    }
) {

    return (
        <div className='task-item rounded flex flex-col p-2'>
            <div className='flex flex-row items-center rounded bg-orange-100 px-1'>
                <div className='w-[80%] flex flex-row items-center'>
                    <ArchiveBoxIcon className='h-5 w-5 mr-1' />
                    <p className='text-xl'>{data.task_name}</p>
                </div>
                <div className='w-[20%] flex flex-row-reverse items-center'>
                    <button><Bars3Icon className='h-6 w-6' /></button>
                    <input type='checkbox' className='h-4 w-4 mr-2' />
                </div>
            </div>
            <div className='mt-1'>
                <p className='text-sm'>*생성 일자 : {data.create_date}</p>
                <p className='text-sm'>*변경 일자 : {data.update_date}</p>
                <div className='flex flex-row items-center w-full'>
                    <p className='text-sm w-[50%]'>*생성자 : {data.create_user}</p>
                    <p className='text-sm w-[50%]'>*수정자 : {data.update_user}</p>
                </div>
            </div>
            <div className='overflow-auto whitespace-pre-line mt-2'>
                {data.description}
            </div>
        </div>
    )
}
