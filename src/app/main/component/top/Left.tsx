import { mainStateCallbackManager, PageName } from "@/app/main/util/globalStateManager";
//Global Navigation Bar
export default function Left() {
    return (
        <>
            <button title='Home으로 이동' className='font-bold' onClick={() => mainStateCallbackManager.setCurrentPageName(PageName.HOME)}>Node Designer</button>
        </>
    );
}
