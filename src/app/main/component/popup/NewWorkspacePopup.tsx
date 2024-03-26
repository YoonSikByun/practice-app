import DefaultPopup from "@/app/main/component/popup/DefaultPopup"
import Tiptap, {TiptapCallbackManager} from "@/app/main/component/controls/TextEditor/Tiptap";
import { useMemo, FormEvent, useRef  } from "react";
import clsx from "clsx";
import { v4 as uuid } from "uuid";
import { InsertWorkspace } from "@/app/api/lib/service/common/definition";
import { submitInsertWorkspace } from "@/app/api/lib/service/client/request";
import { globalData } from "@/app/common/lib/globalData";
import { useSWRConfig } from "swr";
import { RQ_URL } from "@/app/api/lib/service/client/request";
import { globalMessageManager } from "@/app/common/lib/globalMessage";
import { openNodeDesignerTab } from "@/app/main/component/workspace/Workspace";

const popupWidth : number = 800;
const popupHeight : number = 500;

export const prettyjson = require('prettyjson');

function Content(
    {
        setVisible,
        optional = null,
    } : {
        setVisible : (visible : boolean) => void,
        optional? : Object | null,
    }) {
    //여기에서 팝업 내용을 넣는다.
    const firstInputRef = useRef<HTMLInputElement>(null);

    const onFocusFirst = () => firstInputRef.current?.focus();

    const handleCloseBtn = () => {setVisible(false)}
    const tiptapCallbackManager : TiptapCallbackManager = useMemo<TiptapCallbackManager>(() => (
        new TiptapCallbackManager()), []);

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
            globalMessageManager.setInfoMsg('작업공간 이름을 입력해주세요.');
            firstInputRef.current?.focus();
            return;
        }
        console.log('-------- Submit formData ---------');
        console.log(prettyjson.render(JSON.stringify(newWorkspace)));
        console.log('----------------------------------');

        const recvData = await submitInsertWorkspace(newWorkspace,
                                    `[${newWorkspace['name']}] 작업공간 신규 추가되었습니다.`);
        if(!recvData['error']) {
            let type = null;

            if(optional && 'type' in optional)
                type = optional['type'];

            if (type && type == 'open') {
                await openNodeDesignerTab(newWorkspace.id);
            } else {
                // 정상 처리면 프로젝트 재조회
                mutate([RQ_URL.SELECT_WORKSPACE, globalData.menuInfo.getSelectedProjectId()]);
            }

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
                    className="order-1 focus:outline-double w-[500px] border-borderclr-bold border-[1px] px-3 py-1"
                    maxLength={100}
                    tabIndex={0}
                    ref={firstInputRef}
                    autoFocus
                />
            </div>
            <div className="flex flex-row">
                <div className="w-[118px] text-left mr-2">설명</div>
                <div>
                    <Tiptap
                        className='order-2 focus:outline-double'
                        callbackManager={tiptapCallbackManager}
                        height='150px'
                    />
                    {/*아래 input은 마지막 탭에서 탭키를 누르면 첫번 탭으로 보내기 위한 용도 */}
                    <div className="h-0 w-0"><input onBlur={onFocusFirst} type="text" className="order-3 h-0 w-0" /></div>
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
                    className={clsx("focus:outline-double ml-1 border-borderclr-bold border-[1px] px-3 py-1 w-[80px]",
                        "bg-hanablue-300 hover:bg-mouseoverclr-light")}
                >
                    만들기
                </button>
                <button
                    type='button'
                    className={clsx("focus:outline-double ml-1 border-borderclr-bold border-[1px] px-3 py-1 w-[80px]",
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
        setVisible,
        optional = null,
    } : {
        visible : boolean,
        setVisible : (visible : boolean) => void
        optional? : Object | null
    }) {
        return (
        <DefaultPopup
            title='작업공간 만들기'
            visible={visible}
            setVisible={setVisible}
            contentWidth={popupWidth}
            contentHeight={popupHeight}
            optional={optional}
        >
            <Content setVisible={setVisible} optional={optional}/>
        </DefaultPopup>);
}