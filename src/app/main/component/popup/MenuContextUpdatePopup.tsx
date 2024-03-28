import DefaultPopup from "@/app/main/component/popup/DefaultPopup"
import { useState, useRef, useMemo, useEffect, FormEvent } from "react";
import { submitDeleteWorkspace, submitDeleteWorkspaces, submitUpdateWorkSpace} from "@/app/api/lib/service/client/request";
import { UpdateWorkspace, UpdateWorkspaceData } from "@/app/api/lib/service/common/definition";
import { globalData } from "@/app/common/lib/globalData";
import { useSWRConfig } from "swr";
import { RQ_URL } from "@/app/api/lib/service/client/request";
import clsx from "clsx";
import Tiptap, { StringHtmlRender, TiptapCallbackManager } from "../controls/TextEditor/Tiptap";
import { getCurrentDate } from '@/app/common/lib/util';


function Content({setVisible, data } : {setVisible : (visible : boolean) => void , data : UpdateWorkspaceData}) {
    const { mutate } = useSWRConfig();
    const handleCloseBtn = () => setVisible(false);
    const tiptapCallbackManager : TiptapCallbackManager = useMemo<TiptapCallbackManager>(() => (
        new TiptapCallbackManager()), []);
    const [name , setName] = useState(data.name);
    async function onSubmit (event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log('----------------------------------');
        console.log(data);
        console.log('----------------------------------');
        
        switch(data.role)
        {
            
            case "WorkSpace":
                const requestData: UpdateWorkspace = { 
                    id: data.id, 
                    name : name, 
                    description : tiptapCallbackManager.getContent() ?? '', 
                    updaterId : globalData.loginInfo.getUserId(),
                    updatedAt : getCurrentDate()

                };
                console.log("requestData" , requestData)
                console.log("requestData.description" ,StringHtmlRender(data.description))
                
                const recvData = await submitUpdateWorkSpace(requestData, '작업공간 수정이 완료되었습니다.');
                // 정상 처리면 재조회
                if(!recvData['error']) {
                    mutate([RQ_URL.SELECT_WORKSPACE, globalData.menuInfo.getSelectedProjectId()]);
                }
                break;
            case "WorkSpaceList":
                // const requestListData : UpdateWorkspace = {ids : data.ids}
                // const recvListData = await submitDeleteWorkspaces(requestListData, '작업공간 삭제가 완료되었습니다.');
                // if(!recvListData['error']) {
                //     //작업목록 초기화 세팅
                //     checkBoxManager.stateClear();
                //     mutate([RQ_URL.SELECT_WORKSPACE, globalData.menuInfo.getSelectedProjectId()]);
                //     }
                // break;
            }
            handleCloseBtn()
        }
    
        const handleOnChange = (e : any) => {
            setName(e.target.value);
        };
    return (
        <form className="flex flex-col gap-y-3 m-[10px]"
            onSubmit={onSubmit}
        >
            <div>
                <div className="flex flex-col gap-y-3 m-[10px]">
                <div className="flex flex-row items-center">
                <label className="w-[118px] text-left mr-2">이름</label>
                <input
                    type='text'
                    name='name'
                    placeholder='작업공간명을 입력해주세요'
                    className="order-1 focus:outline-double w-[500px] border-borderclr-bold border-[1px] px-3 py-1"
                    maxLength={100}
                    tabIndex={0}
                    autoFocus
                    value={name}
                    onChange={handleOnChange}
                    />
                </div>
        
                    <div className="flex flex-row">
                    <div className="w-[118px] text-left mr-2">설명</div>
                        <div>
                            <   Tiptap
                                className='order-2 focus:outline-double'
                                callbackManager={tiptapCallbackManager}
                                height='300px'
                                content={data.description}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row-reverse">
                        <button
                            type="submit"
                            className={clsx("focus:outline-double ml-1 border-borderclr-bold border-[1px] px-3 py-1 w-[80px]",
                            "bg-hanablue-300 hover:bg-mouseoverclr-light")}
                        >
                            수정
                        </button>
                        <button
                            className={clsx("ml-1 border-borderclr-bold border-[1px] px-3 py-1",
                                "bg-hanablue-100 hover:bg-mouseoverclr-light")}
                            onClick={handleCloseBtn}
                        >
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

const popupWidth : number = 800;
const popupHeight : number = 510;


export default function MenuContextUpdatePopup(
    {
        visible,
        setVisible,
        data,
    } : {
        visible : boolean,  
        setVisible : (visible : boolean) => void
        data : UpdateWorkspaceData
    }) {
        return (
        <DefaultPopup
            title='작업공간 수정 '
            visible={visible}
            setVisible={setVisible}
            contentWidth={popupWidth}
            contentHeight={popupHeight}
        >
            <Content setVisible={setVisible} data = {data}/>
        </DefaultPopup>);
}
