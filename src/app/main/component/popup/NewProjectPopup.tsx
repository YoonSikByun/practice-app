import DefaultPopup from "@/app/main/component/popup/DefaultPopup"
import { useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import { globalMessageManager } from "@/app/common/lib/globalMessage";
import { submitInsertProject } from "@/app/api/lib/service/client/request";
import { InsertProject } from "@/app/api/lib/service/common/definition";
import { globalData } from "@/app/common/lib/globalData";
import { useSWRConfig } from "swr";
import { RQ_URL } from "@/app/api/lib/service/client/request";
import clsx from "clsx";

function Content({setVisible} : {setVisible : (visible : boolean) => void}) {
    const [projectName, setProjectName] = useState('');
    const firstInputRef = useRef<HTMLInputElement>(null);
    const { mutate } = useSWRConfig();

    //여기에서 팝업 내용을 넣는다.
    const handleCloseBtn = () => setVisible(false);
    const onFocusFirst = () => firstInputRef.current?.focus();

    const createProject = async () => {
        if(!projectName) {
            globalMessageManager.setInfoMsg('프로젝트명을 입력해 주세요.');
            firstInputRef.current?.focus();
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
                    ref={firstInputRef}
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="order-1 focus:outline-double ml-3 w-[280px] border-borderclr-bold border-[1px] px-3 py-1"
                    maxLength={100}
                    tabIndex={0}
                    autoFocus
                />
            </div>
            <div className="flex flex-row-reverse w-full m-5">
                <button
                    className={clsx("order-2 focus:outline-double ml-1 border-borderclr-bold border-[1px] px-3 py-1",
                    "bg-hanablue-300 hover:bg-mouseoverclr-light w-[80px]")}
                    onClick={createProject}
                >
                    만들기
                </button>
                <button
                    className={clsx("order-3 focus:outline-double ml-1 border-borderclr-bold border-[1px] px-3 py-1",
                    "bg-hanablue-100 hover:bg-mouseoverclr-light w-[80px]")}
                    onClick={handleCloseBtn}
                    onBlur={onFocusFirst}
                >
                    취소
                </button>

                {/*아래 input은 마지막 탭에서 탭키를 누르면 첫번 탭으로 보내기 위한 용도 */}
                <div><input type="text" className="order-4 h-0 w-0" /></div>

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
