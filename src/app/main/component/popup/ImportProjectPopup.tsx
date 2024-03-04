import DefaultPopup from "@/app/main/component/popup/DefaultPopup"
// import TextEditor from "../textEditor/textEditor";
import Tiptap, {TiptapCallbackManager} from "@/app/main/component/controls/TextEditor/Tiptap";
import { useMemo } from "react";
import clsx from "clsx";

function Content({setVisible} : {setVisible : (visible : boolean) => void}) {
    //여기에서 팝업 내용을 넣는다.
    const handleCloseBtn = () => {
        setVisible(false)
    }
    const handleSearchBtn = () => {

    }

    const callbackManager : TiptapCallbackManager = useMemo<TiptapCallbackManager>(() => (
        new TiptapCallbackManager()
    ), []);

    const content : string = `
    <h3>안녕하세요.</h3>
    <p>테스트입니다.</p>`;

    return(
        <div>
            <div className="flex flex-col gap-y-3 m-[10px]">
                <div className="flex flex-row items-center">
                    <div className="w-[118px] text-left mr-2">프로젝트 불러오기</div>
                    <input
                        type='text'
                        placeholder='왼쪽 찾기 버튼을 누르고 가져올 프로젝트파일을 선택하세요'
                        className="w-[500px] border-borderclr-bold border-[1px] px-3 py-1"
                        readOnly
                    />
                    <button className={clsx("ml-1 border-borderclr-bold border-[1px] px-3 py-1",
                                            "bg-hanablue-300 hover:bg-mouseoverclr-light")}
                        onClick={handleSearchBtn}
                    >
                        찾기
                    </button>
                </div>
                <div className="flex flex-row items-center">
                    <div className="w-[118px] text-left mr-2">이름</div>
                    <input type='text' placeholder='프로젝트명을 입력해주세요' className="w-[500px] border-borderclr-bold border-[1px] px-3 py-1"/>
                </div>

                <div className="flex flex-row">
                    <div className="w-[118px] text-left mr-2">설명</div>
                    <div>
                    <Tiptap
                        content={content}
                        callbackManager={callbackManager}
                        width='100%'
                        height='320px'/>
                    </div>
                </div>
                <div className="flex flex-row-reverse">
                    <button
                        className={clsx("ml-1 border-borderclr-bold border-[1px] px-3 py-1",
                            "bg-hanablue-300 hover:bg-mouseoverclr-light")}
                            onClick={() => alert(callbackManager.getContent())}
                    >
                        저장
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
    );
}

const popupWidth : number = 800;
const popupHeight : number = 510;

export default function ImportProjectPopup(
    {
        visible,
        setVisible
    } : {
        visible : boolean,
        setVisible : (visible : boolean) => void
    }) {
        return (
        <DefaultPopup
            title='프로젝트 가져오기'
            visible={visible}
            setVisible={setVisible}
            contentWidth={popupWidth}
            contentHeight={popupHeight}
        >
            <Content setVisible={setVisible}/>
        </DefaultPopup>);
}