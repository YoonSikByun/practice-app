import DefaultPopup from "@/app/main/component/popup/DefaultPopup"
import { useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import { globalMessageManager } from "@/app/common/lib/globalMessage";
import { submitDeleteWorkspace, submitDeleteWorkspaces, submitInsertProject } from "@/app/api/lib/service/client/request";
import { InsertProject, WorkspaceData , DeleteWorkspace, DeleteWorkspaceData, DeleteWorkspaces } from "@/app/api/lib/service/common/definition";
import { globalData } from "@/app/common/lib/globalData";
import { useSWRConfig } from "swr";
import { RQ_URL } from "@/app/api/lib/service/client/request";
import clsx from "clsx";
import { ContextMenuCallback, ACTION } from "../menuContext/definition";



function Content({setVisible, data, checkBoxManager } : {setVisible : (visible : boolean) => void , data : DeleteWorkspaceData , checkBoxManager : any}) {
    const { mutate } = useSWRConfig();
    //여기에서 팝업 내용을 넣는다.`
    const handleCloseBtn = () => setVisible(false);

    const handleDeleteClick = async () => {
        console.log('----------------------------------');
        console.log(data);
        console.log('----------------------------------');
        
        switch(data.role)
        {
            
            case "WorkSpace":
                const requestData: DeleteWorkspace = { id: data.ids[0] };
                const recvData = await submitDeleteWorkspace(requestData, '작업공간 삭제가 완료되었습니다.');
                // 정상 처리면 재조회
                if(!recvData['error']) {
                    mutate([RQ_URL.SELECT_WORKSPACE, globalData.menuInfo.getSelectedProjectId()]);
                    checkBoxManager.deleteCheckBox(data.ids[0])
                    console.log(checkBoxManager.getAllChecked())
                    checkBoxManager.stateClear();
                }
                break;
            case "WorkSpaceList":
                const requestListData : DeleteWorkspaces = {ids : data.ids}
                const recvListData = await submitDeleteWorkspaces(requestListData, '작업공간 삭제가 완료되었습니다.');
                if(!recvListData['error']) {
                    //작업목록 초기화 세팅
                    checkBoxManager.stateClear();
                    mutate([RQ_URL.SELECT_WORKSPACE, globalData.menuInfo.getSelectedProjectId()]);
                    }
                break;
            }
            handleCloseBtn()
        }
    
    return (
        <div className="m-5 flex flex-col items-center">
            <div className="flex flex-row items-center"> 
                {data.role == "WorkSpace" ? <span> {data.name}을 삭제하시겠습니까?</span> : <span> {data.ids.length}개의 작업공간을 삭제하시겠습니까?</span>} 
            </div>
            <div className="flex flex-row-reverse w-full m-5">
                <button
                    className={clsx("focus:outline-double ml-1 border-borderclr-bold border-[1px] px-3 py-1",
                    "bg-hanablue-300 hover:bg-mouseoverclr-light w-[80px]")}
                    onClick={handleDeleteClick}
                >
                    삭제
                </button>
                <button
                    className={clsx("focus:outline-double ml-1 border-borderclr-bold border-[1px] px-3 py-1",
                    "bg-hanablue-100 hover:bg-mouseoverclr-light w-[80px]")}
                    onClick={handleCloseBtn}
                >
                    취소
                </button>
            </div>
        </div>
    );
}

const popupWidth : number = 360;
const popupHeight : number = 80;

export default function MenuContextDeletePopup(
    {
        visible,
        setVisible,
        data,
        checkBoxManager
    } : {
        visible : boolean,  
        setVisible : (visible : boolean) => void
        data : DeleteWorkspaceData
        checkBoxManager : any
    }) {
        return (
        <DefaultPopup
            title='작업공간 삭제 '
            visible={visible}
            setVisible={setVisible}
            contentWidth={popupWidth}
            contentHeight={popupHeight}
        >
            <Content setVisible={setVisible} data = {data} checkBoxManager = {checkBoxManager}/>
        </DefaultPopup>);
}
