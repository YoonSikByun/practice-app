import DefaultPopup from "@/app/main/component/popup/DefaultPopup"

function Content() {
    //여기에서 팝업 내용을 넣는다.
    return(
    <div className="bg-red-200 h-full">
        <p className="bg-blue-100 text-blue-500 text-2xl">content!!!!!</p>
        input : <input type="text" width={150}/>
    </div>
    );
}

const popupWidth : number = 500;
const popupHeight : number = 300;

export default function GlobalSettingPopup(
    {
        visible,
        setVisible
    } : {
        visible : boolean,
        setVisible : (visible : boolean) => void
    }) {
        return (
        <DefaultPopup
            title='환경설정'
            visible={visible}
            setVisible={setVisible}
            contentWidth={popupWidth}
            contentHeight={popupHeight}
        >
            <Content/>
        </DefaultPopup>);
}