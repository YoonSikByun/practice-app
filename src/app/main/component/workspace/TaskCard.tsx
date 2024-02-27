import '@/app/main/scss/Workspace.scss';
import { Bars3Icon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import { DocumentPlusIcon, FolderArrowDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { MultiCheckboxManager } from '@/app/main/lib/multiControlManager';
import CheckBox from '@/app/main/component/controls/CheckBox';

export type TaskCardInfo = {
    task_name : string;
    create_date : string;
    update_date : string;
    create_user : string;
    update_user : string;
    description : string;
}

function TaskBorder({children} : {children? : React.ReactNode}) {
    return (
        <div className={clsx('task-item ml-2 my-3 group relative rounded',
            'flex flex-col p-2 bg-cardclr-back shadow-lg shadow-black-500',
            'border-[1px] border-solid border-borderclr-light hover:border-borderclr-bold')}
        >
            {children}
        </div>
    );
}

function HoverComponent() {
    return (
        <div className={clsx('invisible group-hover:visible', 'absolute top-1/2 left-[calc(50%-50px)]')}>
            <button
                className='bg-blue-400 h-[40px] w-[100px] rounded shadow-lg text-xl font-bold hover:bg-mouseoverclr-bold'
                onClick={() => alert('노드디자이너 열기')}
            >
                열기
            </button>
        </div>
    )
}

export function TaskCreateCard() {
    return (
        <TaskBorder>
            <div className='w-full text-center'><p className='text-2xl mt-3'>작업공간 만들기</p></div>
            <div className='flex flex-row h-full w-full'>
                <div className='relative h-full w-[50%]'>
                    <div className='absolute top-[calc(50%-50px)] left-[calc(100%-90px)] flex flex-col items-center'>
                        <button>
                            <DocumentPlusIcon className='h-[50px] w-[50px] fill-hanablue-700 hover:fill-mouseoverclr-bold'/>
                        </button>
                        <p>새로 만들기</p>
                    </div>
                </div>
                <div className='relative h-full w-[50%]'>
                    <div className='absolute rounded-full top-[calc(50%-50px)] left-[40px] flex flex-col items-center'>
                    <button>
                        <FolderArrowDownIcon className='h-[50px] w-[50px] fill-hanablue-700 hover:fill-mouseoverclr-bold'/>
                    </button>
                    <p>가져오기</p>
                    </div>
                </div>
            </div>
        </TaskBorder>
    )
}

export default function TaskCard(
    {
        data,
        id,
        checkBoxManager,
        handleContextMenu
    } : {
        data : TaskCardInfo,
        id : string,
        checkBoxManager : MultiCheckboxManager
        handleContextMenu : any
    }
) {
    return (
        <TaskBorder>
            <div className='flex flex-row items-center rounded px-1 bg-cardclr-title'>
                <div className='w-[80%] h-[35px] flex flex-row items-center'>
                    <ArchiveBoxIcon className='h-5 w-5 ml-2 mr-2' />
                    <p className='text-xl'>{data.task_name}</p>
                </div>
                <div className='w-[20%] flex flex-row-reverse items-center'>
                    <button onClick={e=> handleContextMenu(e)}><Bars3Icon className='h-7 w-7 mr-1' /></button>
                    <CheckBox className='h-7 w-7 mr-1' id={id}
                     checkBoxManager={checkBoxManager}
                    />
                </div>
            </div>
            <div className='mt-1'>
                <p className='text-sm'>* 생성 일자 : {data.create_date}</p>
                <p className='text-sm'>* 변경 일자 : {data.update_date}</p>
                <div className='flex flex-row items-center w-full'>
                    <p className='text-sm w-[50%]'>* 생성자 : {data.create_user}</p>
                    <p className='text-sm w-[50%]'>* 수정자 : {data.update_user}</p>
                </div>
            </div>
            <div className='overflow-y-scroll whitespace-pre-line mt-2'>
                {data.description}
            </div>
            <HoverComponent/>
        </TaskBorder>
    );
}
