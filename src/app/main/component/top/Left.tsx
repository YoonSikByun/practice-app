import { mainStateCallbackManager, PageName } from "@/app/common/lib/globalStateManager";
import Image from 'next/image'
import logo_png from '@/app/main/image/logo.png';
//Global Navigation Bar
export default function Left() {
    return (
        <div className='flex h-full mt-1 ml-3'>
            <button
                title='Home으로 이동'
                onClick={() => mainStateCallbackManager.setCurrentPageName(PageName.HOME)}
            >
                <Image
                    src={logo_png}
                    width={174}
                    height={33}
                    className="hidden md:block"
                    alt="NodeApp Dsigner producted by AI Solution Cell, HanaTI"
                />
            </button>
        </div>
    );
}
