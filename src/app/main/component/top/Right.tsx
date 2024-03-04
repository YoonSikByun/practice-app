import { mainLayoutSize } from "@/app/main/config/layoutFrame"
import GlobalSettingPopup from "@/app/main/component/popup/GlobalSettingPopup"
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useState } from "react"

export default function Right() {
    const [globalSettingPopupVisible, setGlobalSettingPopupVisible] = useState(false);
    return (
        <div style={{
            height: '100%',
            width: '100%',
            textAlign: 'right',
            alignItems: 'right'}}
        >
            {/* <button
                onClick={() => setGlobalSettingPopupVisible(!globalSettingPopupVisible)}
                style={{lineHeight: `${mainLayoutSize['topGNB'].height}px`, verticalAlign: 'middle', marginRight: '5px'}}
            >
                <Cog6ToothIcon className="h-7 w-7 text-gray-700"/>
            </button> */}
            <button
                onClick={() => setGlobalSettingPopupVisible(!globalSettingPopupVisible)}
                style={{
                    lineHeight: `${mainLayoutSize['topGNB'].height}px`,
                    verticalAlign: 'middle',
                    marginRight: '10px'}}
                title='환경설정'
            >
                <Cog6ToothIcon className="h-7 w-7"/>
            </button>
            <GlobalSettingPopup visible={globalSettingPopupVisible} setVisible={setGlobalSettingPopupVisible} />
        </div>
    )
}