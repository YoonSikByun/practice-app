import '@/app/main/scss/Workspace.scss';
import { Bars3Icon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export type TaskCardInfo = {
    task_name : string;
    create_date : string;
    update_date : string;
    create_user : string;
    update_user : string;
    description : string;
}

function HoverComponent() {
    return (
        <div className={clsx('invisible group-hover:visible', 'absolute top-1/2 left-1/3')}>
            <button
                className='bg-blue-200 h-[30px] w-[100px] rounded-lg shadow-lg font-bold '
                onClick={() => alert('노드디자이너 열기')}
            >
                열기
            </button>
        </div>
    )
}

export default function TaskCard(
    {
        data
    } : {
        data : TaskCardInfo
    }
) {

    return (
        <div className={clsx('task-item group relative rounded flex flex-col p-2 bg-cardclr-back shadow-lg shadow-black-500',
        'border-solid border-borderclr-bold hover:border-2')}>
            <div className='flex flex-row items-center rounded px-1 bg-cardclr-title'>
                <div className='w-[80%] flex flex-row items-center'>
                    <ArchiveBoxIcon className='h-5 w-5 mr-1' />
                    <p className='text-xl'>{data.task_name}</p>
                </div>
                <div className='w-[20%] flex flex-row-reverse items-center'>
                    <button><Bars3Icon className='h-6 w-6 mr-1' /></button>
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
            <div className='overflow-y-scroll whitespace-pre-line mt-2'>
                {data.description}
            </div>
            <HoverComponent/>
        </div>
        
    );
}
