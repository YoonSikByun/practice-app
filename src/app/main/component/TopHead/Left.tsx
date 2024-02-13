import { mainStateCallBackManager, PageName } from "@/app/main/util/mainGlobalStateManager";
//Global Navigation Bar
export default function Left() {
    return (
        <>
            <button className='font-bold' onClick={() => mainStateCallBackManager.setCurrentPageName(PageName.HOME)}>Node Designer</button>
        </>
    );
}
