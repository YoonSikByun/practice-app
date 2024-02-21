import { mainLayoutSize } from "@/app/main/config/layoutFrame"
import ShowPopup from "../popup/popup"
import { useState } from "react"

export default function Right() {
    const [showGlobalSettingPopup, setShowGlobalSettingPopup] = useState(false);
    return (
        <div
            style={{lineHeight: `${mainLayoutSize['topGNB'].height}px`, width: '30px' }}
        >
            <button onClick={() => setShowGlobalSettingPopup(!showGlobalSettingPopup)}>
                Show
            </button>
            <ShowPopup
                title='테스트 팝업!!!!!'
                visible={showGlobalSettingPopup}
                setVisible={setShowGlobalSettingPopup}/>
        </div>
    )
}