import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { MenuItem } from "./MenuGroup";
import { TaskCardInfo } from "../workspace/TaskCard";

const MenuContext = (
    {
        menuItems,
        contextMenu,
        width,
        contextMenuRef,
        TaskCardList,
        setDataList,
    } 
    : 
    {
        menuItems : MenuItem[],
        contextMenu : any,
        width : number,
        contextMenuRef : any,
        TaskCardList : TaskCardInfo[],
        setDataList :  Dispatch<SetStateAction<TaskCardInfo[]>>,
    }
    ) => { 
        const handleClick = (e : any , item : any) => {
            console.log(e.target ,contextMenu);
            if(item.id == 2) {
                const taskId = contextMenu.id 
                console.log(contextMenu);
                
                if (taskId) {
                    const updatedDataList = TaskCardList.filter((_, index) => index !== parseInt(taskId)); 
                    console.log(updatedDataList);
                    setDataList(updatedDataList); 
                }
            }
            contextMenu.isToggled = false;
        }
        return ( 
            <menu style={{
                top : contextMenu.position.y + 2 + "px",
                left : contextMenu.position.x + 2 + "px",
                width : width,
                }}
                className={`context-menu ${contextMenu.isToggled ? "open" : ""}`}
                ref={contextMenuRef}
            >
                <ul>
                    {menuItems.map((item , index) => {
                        return item.hasUnderLine ? <li className="separate" key={index} onClick={(e) => handleClick(e, item)}> {item.title}</li> : <li key={index} onClick={(e) => handleClick(e, item)}> {item.title}</li>;
                    })}
                </ul>
            </menu>
        ); 
}

export default MenuContext;
