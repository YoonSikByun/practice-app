import DefaultPopup from "@/app/main/component/popup/DefaultPopup"
import { useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import { gStatusPopup } from "@/app/common/lib/globalMessage";
import { rqInsertProject } from "@/app/main/lib/request";
import { InsertProject } from "@/app/common/lib/definition";
import { globalData } from "@/app/common/lib/globalData";
import { useSWRConfig } from "swr";
import { RQ_URL } from "@/app/main/lib/request";

function Content({setVisible} : {setVisible : (visible : boolean) => void}) {
    const [projectName, setProjectName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const { mutate } = useSWRConfig();

    //여기에서 팝업 내용을 넣는다.
    const handleCloseBtn = () => { setVisible(false) }

    const createProject = async () => {
        if(!projectName) {
            gStatusPopup.setInfoMsg('프로젝트명을 입력해 주세요.');
            inputRef.current?.focus();
            return;
        }
        const newProject : InsertProject = {
            id : uuid(),
            name : projectName,
            creatorId : globalData.loginInfo.getUserId()
        };

        const data = await rqInsertProject(newProject, `[${projectName}] 프로젝트가 신규 추가되었습니다.`);
        // 정상 처리면 프로젝트 재조회
        if(!data['error']) {
            mutate(RQ_URL.SELECT_PROJECT);
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
