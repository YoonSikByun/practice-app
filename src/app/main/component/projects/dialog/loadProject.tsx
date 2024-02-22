import { Dispatch, SetStateAction, useState } from "react";
import '@/app/main/scss/layout.scss'
import clsx from "clsx";


export default function LoadProject({showLoadDialog, setShowLoadDialog} : {showLoadDialog : boolean , setShowLoadDialog : Dispatch<SetStateAction<boolean>> }){
    // const [showFileSearch setSHowFileSearch] = useState()

    const handleCloseBtn = () => {
        setShowLoadDialog(false)
    }

    const handleSearchBtn = () => {

    }
    return (
        <>
            {showLoadDialog && <div className={clsx("dialog-overlay")}></div>}
            {showLoadDialog && 
                <div className={clsx("dialog-load-project")}>
                        <div className="dialog-load-project-header">
                            <span className="dialog-load-project-title">프로젝트 가져오기</span>
                            <button className="dialog-title-close-btn" onClick={handleCloseBtn}>X</button>
                        </div>
                        <div className="dialog-load-project-body">
                            <div className="dialog-load-project-label">프로젝트 불러오기</div>
                            <div className="dialog-load-project-filename">프로젝트를 선택하세요</div>
                            <div className="dialog-load-project-btn" onClick={handleSearchBtn}>찾기</div>
                            <div className="dialog-load-project-label">이름</div>
                            <input className="dialog-load-project-filename"></input>
                        </div>
                </div>
            }
        </>
    )
}   