import DefaultPopup from "@/app/main/component/popup/DefaultPopup"
import { useState, useRef } from "react";
import { Post } from "@/app/common/lib/fetchServer";
import { ResponseData } from "@/app/common/lib/definition";
import { v1 as suid } from "uuid";
import { gStatusPopup } from "@/app/common/lib/globalMessage";

function Content({setVisible} : {setVisible : (visible : boolean) => void}) {
    // const { data, mutate } = useSWR('/api/data', fetch)
    const [projectName, setProjectName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);//ts

    //여기에서 팝업 내용을 넣는다.
    const handleCloseBtn = () => { setVisible(false) }
    
    const createProject = async () => {
        if(!projectName) {
            gStatusPopup.clearAllMsg();
            gStatusPopup.setInfoMsg('프로젝트명을 입력해 주세요.');
            inputRef.current?.focus();
            return;
        }
        const newProject = { id : '9e2f7830-d6e5-11ee-8026-d3ae9bdc511b', name : projectName, creatorId : 'admin' }

        const recvData : ResponseData = await Post('api/project/insert', newProject);
        gStatusPopup.clearAllMsg();
        console.log(`recvData['error'] : ${recvData['error']}`);
        if (recvData['error'] === true) {
            console.log('error');
            gStatusPopup.setErrorMsg(recvData['message']);
        } else {
            console.log('success');
            gStatusPopup.setSuccessMsg(recvData['message']);
        }

        handleCloseBtn();
    }

    return (
        <div className="dialog-content">
            <div className="dialog-input-container"> 
                <span>이름</span>
                <input
                    type='text'
                    ref={inputRef}
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    autoFocus/>
            </div>
            <div className="dialog-button-container">
                <button className="dialog-button btn-can" onClick={handleCloseBtn}>취소</button>
                <button className="dialog-button btn-ok" onClick={createProject}>확인</button>
            </div>
        </div>
    );
}

const popupWidth : number = 360;
const popupHeight : number = 80;

export default function NewProjectPopup(
    {
        visible,
        setVisible
    } : {
        visible : boolean,  
        setVisible : (visible : boolean) => void
    }) {
        return (
        <DefaultPopup
            title='프로젝트 생성'
            visible={visible}
            setVisible={setVisible}
            contentWidth={popupWidth}
            contentHeight={popupHeight}
        >
            <Content setVisible={setVisible}/>
        </DefaultPopup>);
}