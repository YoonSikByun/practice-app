import clsx from "clsx";
import { Dispatch, SetStateAction, useState } from "react";
import Draggable from 'react-draggable';

export default function AddProject ({showDialog , setShowDialog} : {showDialog :boolean ,setShowDialog : Dispatch<SetStateAction<boolean>>} ) {
    const [position, setPosition] = useState({ x: 200, y: 400 });
    const trackPos = (data : any) => {
        setPosition({ x: data.x, y: data.y }); 
      };

    const handleCloseBtn = () => {
        setShowDialog(false)
    }
    return (
        <div>
            {showDialog && <div className={clsx("dialog-overlay")}></div>}
            {showDialog && 
                <>
                <Draggable onDrag={(e, data) => trackPos(data)} >
                    <div className="dialog" >
                        <div className="dialog-header">
                            <span className="dialog-title">프로젝트 생성</span>
                            <button className="dialog-title-close-btn" onClick={handleCloseBtn}>X</button>
                        </div>
                        <div className="dialog-content">
                            <div className="dialog-input-container"> 
                                <span>이름</span>
                                <input></input>
                            </div>
                            <div className="dialog-button-container">
                                <button className="dialog-button btn-can" onClick={handleCloseBtn}>취소</button>
                                <button className="dialog-button btn-ok">확인</button>
                            </div>
                        </div>
                    </div>
                </Draggable>
                </>
            }
        </div>
    )
}


