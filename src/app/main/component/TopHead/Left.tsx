import { mainStateCallbackManager, PageName } from "@/app/util/globalStateManager";
//Global Navigation Bar
export default function Left() {
    return (
        <>
            <button className='font-bold' onClick={() => mainStateCallbackManager.setCurrentPageName(PageName.HOME)}>Node Designer</button>
        </>
    );
}
