import DefaultPopup from "@/app/main/component/popup/DefaultPopup"
import { useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import { gStatusPopup } from "@/app/common/lib/globalMessage";
import { submitInsertProject } from "@/app/api/lib/service/client/request";
import { InsertProject } from "@/app/api/lib/service/common/definition";
import { globalData } from "@/app/common/lib/globalData";
import { useSWRConfig } from "swr";
import { RQ_URL } from "@/app/api/lib/service/client/request";
import clsx from "clsx";

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
        }

        const data = await submitInsertProject(newProject, `[${projectName}] 프로젝트가 신규 추가되었습니다.`);

        // 정상 처리면 프로젝트 재조회
        if(!data['error']) { mutate(RQ_URL.SELECT_PROJECT); }
    
        handleCloseBtn();
    }

    return (
        <div className="m-5 flex flex-col items-center">
            <div className="flex flex-row items-center"> 
                <span>이름</span>
                <input
                    type='text'
                    placeholder='프로젝트명을 입력해주세요'
                    ref={inputRef}
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="ml-3 w-[280px] border-borderclr-bold border-[1px] px-3 py-1"
                    maxLength={100}
                    autoFocus
                />
            </div>
            <div className="flex flex-row-reverse w-full m-5">
                <button
                    className={clsx("ml-1 border-borderclr-bold border-[1px] px-3 py-1",
                    "bg-hanablue-300 hover:bg-mouseoverclr-light")}
                    onClick={createProject}
                >
                    만들기
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
