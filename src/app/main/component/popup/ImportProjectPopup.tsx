import DefaultPopup from "@/app/main/component/popup/DefaultPopup"
import TextEditor from "../textEditor/textEditor";

function Content() {
    //여기에서 팝업 내용을 넣는다.
    const handleCloseBtn = () => {
        // setShowLoadDialog(false)
    }
    const handleSearchBtn = () => {

    }

    return(
        <div>
            <div className="dialog-load-project-body">
                <div className="dialog-load-project-label">프로젝트 불러오기</div>
                <div className="dialog-load-project-filename">프로젝트를 선택하세요</div>
                <div className="dialog-load-project-btn" onClick={handleSearchBtn}>찾기</div>
                <div className="dialog-load-project-label">이름</div>
                <input className="dialog-load-project-filename"></input>
                <div className="dialog-load-project-label">설명</div>
            </div>
            <TextEditor></TextEditor>
        </div>
    );
}

const popupWidth : number = 800;
const popupHeight : number = 480;

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
            <Content/>
        </DefaultPopup>);
}