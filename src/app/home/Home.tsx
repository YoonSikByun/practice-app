import { mainLayoutSize } from "@/app/main/config/layoutFrame"
import clsx from "clsx"
// import { mainStateCallBackManager, PageName } from "@/app/main/util/mainGlobalStateManager";

export default function Home() {
    return (
        <div className="absolute flex flex-col h-full w-full"
            style={{top: mainLayoutSize['topGNB'].height, height: `calc(100vh - ${mainLayoutSize['topGNB'].height}px)`}}
        >
            <div className={clsx("absolute h-full", "bg-orange-600")}
                style={{top: 0, width: mainLayoutSize['project'].width}}
            >
                Project
            </div>
            <div className="absolute h-full w-[calc(100vw-300px)] bg-white"
                style={{top: 0, left: 300}}
            >
                Pipeline<br/>
                {/* <p onClick={() => mainStateCallBackManager.setCurrentPageName(PageName.HOME)}>Node designer</p> */}
            </div>
        </div>
    )
}