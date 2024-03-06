import DefaultPopup from "@/app/main/component/popup/DefaultPopup"
import Tiptap, {TiptapCallbackManager} from "@/app/main/component/controls/TextEditor/Tiptap";
import { useMemo, FormEvent  } from "react";
import clsx from "clsx";
import { v4 as uuid } from "uuid";
import { InsertWorkspace } from "@/app/api/lib/service/common/definition";
import { submitInsertWorkspace } from "@/app/api/lib/service/client/request";
import { globalData } from "@/app/common/lib/globalData";
import { useSWRConfig } from "swr";
import { RQ_URL } from "@/app/api/lib/service/client/request";
import { globalMessageManager } from "@/app/common/lib/globalMessage";

const popupWidth : number = 800;
const popupHeight : number = 500;

export const prettyjson = require('prettyjson');

function Content({setVisible} : {setVisible : (visible : boolean) => void}) {
    //여기에서 팝업 내용을 넣는다.
    const handleCloseBtn = () => {
        setVisible(false)
    }

    const tiptapCallbackManager : TiptapCallbackManager = useMemo<TiptapCallbackManager>(() => (
        new TiptapCallbackManager()
    ), []);

    const { mutate } = useSWRConfig();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget);
        const newWorkspace : InsertWorkspace = {
            id : uuid(),
            name         : formData.get('name') as string,
            creatorId    : globalData.loginInfo.getUserId(),
            projectId     : globalData.menuInfo.getSelectedProjectId(),
            description  : tiptapCallbackManager.getContent() ?? '',
        }
        if(newWorkspace['name'].trim().length < 1)
        {
            globalMessageManager.setInfoMsg('작업공간 이름을 입력해주세요.')
            return;
        }
        console.log('-------- Submit formData ---------');
        console.log(prettyjson.render(JSON.stringify(newWorkspace)));
        console.log('----------------------------------');

        const recvData = await submitInsertWorkspace(newWorkspace,
                                    `[${newWorkspace['name']}] 작업공간이 신규 추가되었습니다.`);
        if(!recvData['error']) {
            // 정상 처리면 프로젝트 재조회
            mutate([RQ_URL.SELECT_WORKSPACE, globalData.menuInfo.getSelectedProjectId()]);
            handleCloseBtn();
        }
    
      }

    return(
        <form className="flex flex-col gap-y-3 m-[10px]"
            onSubmit={onSubmit}
        >
            <div className="flex flex-row items-center">
                <label className="w-[118px] text-left mr-2">이름</label>
                <input
                    type='text'
                    name='name'
                    placeholder='작업공간명을 입력해주세요'
                    className="w-[500px] border-borderclr-bold border-[1px] px-3 py-1"
                    maxLength={100}
                />
            </div>
            <div className="flex flex-row">
                <div className="w-[118px] text-left mr-2">설명</div>
                <div>
                    <Tiptap
                        // content={content}
                        callbackManager={tiptapCallbackManager}
                        height='150px'
                    />
                </div>
            </div>
            <div className="flex flex-row">
                <div className="w-[118px] text-left mr-2">템플릿</div>
                <div className={clsx("w-full ml-6 mr-6 h-[190px] overflow-y-scroll",
                    'border-[1px] border-borderclr-bold bg-red-200')}>
                    템플릿 표시 자리
                </div>
            </div>
            <div className="flex flex-row-reverse">
                <button
                    type="submit"
                    className={clsx("ml-1 border-borderclr-bold border-[1px] px-3 py-1 w-[80px]",
                        "bg-hanablue-300 hover:bg-mouseoverclr-light")}
                        // onClick={() => alert(tiptapCallbackManager.getContent())}
                >
                    만들기
                </button>
                <button
                    type='button'
                    className={clsx("ml-1 border-borderclr-bold border-[1px] px-3 py-1 w-[80px]",
                        "bg-hanablue-100 hover:bg-mouseoverclr-light")}
                    onClick={handleCloseBtn}
                >
                    취소
                </button>
            </div>
        </form>
    );
}

export default function NewWorkspacePopup(
    {
        visible,
        setVisible
    } : {
        visible : boolean,
        setVisible : (visible : boolean) => void
    }) {
        return (
        <DefaultPopup
            title='작업공간 만들기'
            visible={visible}
            setVisible={setVisible}
            contentWidth={popupWidth}
            contentHeight={popupHeight}
        >
            <Content setVisible={setVisible}/>
        </DefaultPopup>);
}