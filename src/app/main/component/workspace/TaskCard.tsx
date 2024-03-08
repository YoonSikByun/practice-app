import '@/app/main/scss/Workspace.scss';
import { Bars3Icon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import { DocumentPlusIcon, FolderArrowDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { MultiCheckboxManager } from '@/app/main/lib/multiControlManager';
import CheckBox from '@/app/main/component/controls/CheckBox';
import { WorkspaceData, DeleteWorkspace } from '@/app/api/lib/service/common/definition';
import NewWorkspacePopup from '@/app/main/component/popup/NewWorkspacePopup';
import { useState, useCallback } from 'react';
import { mutate } from 'swr';
import MenuContext from '@/app/main/component/menuContext/menuContext';
import {
    ACTION,
    ContextMenuCallback,
    ContextMenuArgument,
    MenuRole
} from '@/app/main/component/menuContext/definition';
import { submitDeleteWorkspace } from '@/app/api/lib/service/client/request';
import { RQ_URL } from '@/app/api/lib/service/client/request';
import { globalData } from '@/app/common/lib/globalData';
import { StringHtmlRender } from '@/app/main/component/controls/TextEditor/Tiptap';
import { mainStateCallbackManager } from '@/app/common/lib/globalStateManager';
import { SelectWorkspace } from '@/app/api/lib/service/common/definition';
import { submitSelectReactflow } from '@/app/api/lib/service/client/request';

export async function openNodeDesignerTab(id : string) {

    //이 열려있는 노드디자이너면 탭을 선택해주고 끝낸다.
    if(mainStateCallbackManager.setCurrentTabIfExist(id))
        return;

    //새로 여는 노드디자이너면 서버에서 저장 정보를 가져온다.
    const sendData : SelectWorkspace = {projectId : id};
    const recvData = await submitSelectReactflow(sendData, '작업 데이터를 불러오기가 완료되었습니다.', '작업 데이터 가져오기 실패했습니다.');
    
    if(!recvData['error'])
        mainStateCallbackManager.openNodeDesigner(recvData['data']);
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

function HoverComponent({data} : {data:WorkspaceData}) {
    const onClickOpenReactflow = useCallback(async () => openNodeDesignerTab(data.id), [data]);

    return (
        <div className={clsx('invisible group-hover:visible', 'absolute top-1/2 left-[calc(50%-50px)]')}>
            <button
                className='bg-blue-400 h-[40px] w-[100px] rounded shadow-lg text-xl font-bold hover:bg-mouseoverclr-bold'
                onClick={onClickOpenReactflow}
            >
                열기
            </button>
        </div>
    )
}

export function TaskCreateCard() {
    const [newWorkspacePopupVisible, setNewWorkspacePopupVisible] = useState(false);
    return (
        <TaskBorder>
            <div className='w-full text-center'><p className='text-2xl mt-3'>작업공간 만들기</p></div>
            <div className='flex flex-row h-full w-full'>
                <div className='relative h-full w-[50%]'>
                    <div className='absolute top-[calc(50%-50px)] left-[calc(100%-90px)] flex flex-col items-center'>
                        <button onClick={() => setNewWorkspacePopupVisible(!newWorkspacePopupVisible)}>
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
                <NewWorkspacePopup visible={newWorkspacePopupVisible} setVisible={setNewWorkspacePopupVisible} />
            </div>
        </TaskBorder>
    )
}

export default function TaskCard(
    {
        data,
        id,
        checkBoxManager,
    } : {
        data : WorkspaceData,
        id : string,
        checkBoxManager : MultiCheckboxManager
    }
) {
    const contextMenucallback : ContextMenuCallback = async (action : ACTION, parentKey : string) => {
        console.log('----------------------------------');
        console.log(`call back : action - ${action}, parentKey - ${parentKey}`);
        console.log('----------------------------------');

        switch(action)
        {
            case ACTION.UPDATE:
            break;
            case ACTION.DELETE:
                const requestData : DeleteWorkspace = {id : parentKey};
                const recvData = await submitDeleteWorkspace(requestData, '작업공간 삭제가 완료되었습니다.');
                // 정상 처리면 재조회
                if(!recvData['error']) {
                    mutate([RQ_URL.SELECT_WORKSPACE, globalData.menuInfo.getSelectedProjectId()]);
                }
            break;
            case ACTION.COPY:
            break;
            case ACTION.EXPORT:
            break;
        }
    }

    const [visibleContextMenu, setVisibleContextMenu] = useState(false);
    const [conextMenuArg, setContextMenuArg] = useState<ContextMenuArgument>({
        clientX : -1, clientY : -1,
        menuRole : MenuRole.TASKCARD, parentKey : data.id,
        callbackProc : contextMenucallback});

    const handleClickContextMenuButton = (e : React.MouseEvent<HTMLElement>) => {
        setVisibleContextMenu(!visibleContextMenu);
        setContextMenuArg({
        ...conextMenuArg, clientX : e.clientX, clientY: e.clientY});
    }

    return (
        <TaskBorder>
            <div className='flex flex-row items-center rounded px-1 bg-cardclr-title'>
                <div className='w-[80%] h-[35px] flex flex-row items-center'>
                    <ArchiveBoxIcon className='h-5 w-5 ml-2 mr-2' />
                    <p className={
                        clsx('text-xl',
                        'text-ellipsis leading-[25px] overflow-hidden text-nowrap')}
                    >
                        {data.name}
                    </p>
                </div>
                <div className={clsx('w-[20%] flex flex-row-reverse items-center')}>
                    <button onClick={e=> handleClickContextMenuButton(e)}>
                        <Bars3Icon className='h-7 w-7 mr-1' />
                    </button>
                    <CheckBox className='h-7 w-7 mr-1' id={id}
                     checkBoxManager={checkBoxManager}/>
                </div>
            </div>
            <div className='mt-1'>
                <p className='text-sm'>* 생성 일자 : {data.createdAt}</p>
                <p className='text-sm'>* 변경 일자 : {data.updatedAt}</p>
                <div className='flex flex-row items-center w-full'>
                    <p className='text-sm w-[50%]'>* 생성자 : {data.creatorId}</p>
                    <p className='text-sm w-[50%]'>* 수정자 : {data.updatorId}</p>
                </div>
            </div>
            <div className={clsx('overflow-auto whitespace-pre-line mt-2 mb-2 h-full',
                                'bg-white border-[1px] border-borderclr-bold')}>
                {StringHtmlRender(data.description)}
            </div>
            <HoverComponent data={data}/>
            <MenuContext
                visible={visibleContextMenu}
                setVisible={setVisibleContextMenu}
                contextMenuArgument={conextMenuArg}
            />
        </TaskBorder>
    );
}
