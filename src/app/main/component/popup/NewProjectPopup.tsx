import DefaultPopup from "@/app/main/component/popup/DefaultPopup"

function Content() {
    //여기에서 팝업 내용을 넣는다.
    return(
    <div className="bg-red-200 h-full">
        <p className="bg-blue-100 text-blue-500 text-2xl">프로젝트 만들기!!!!</p>
        input : <input type="text" width={150}/>
    </div>
    );
}

const popupWidth : number = 600;
const popupHeight : number = 400;

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
            <Content/>
        </DefaultPopup>);
}