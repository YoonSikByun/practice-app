import DefaultPopup from "@/app/main/component/popup/DefaultPopup"

function Content({setVisible} : {setVisible : (visible : boolean) => void}) {
    //여기에서 팝업 내용을 넣는다.
    const handleCloseBtn = () => {
        setVisible(false)
    }
    
    return(
            <div className="dialog-content">
                <div className="dialog-input-container"> 
                        <span>이름</span>
                        <input></input>
                </div>
                <div className="dialog-button-container">
                    <button className="dialog-button btn-can" onClick={handleCloseBtn}>취소</button>
                    <button className="dialog-button btn-ok">확인</button>
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