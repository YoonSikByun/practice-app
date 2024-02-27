import Boundary from "@/app/common/util/Boundary";
import { Size } from "@/app/common/util/definition";
import { useCallback, useEffect, useMemo } from "react";
import { MenuItem } from "./menuItems";

const MenuContext = (
    {
        menuItems,
        contextMenu,
        width,
        height,
        role,
        contextMenuRef
    } 
    : 
    {
        menuItems : MenuItem[],
        contextMenu : any,
        width : number,
        height : number,
        role : string,
        contextMenuRef : any
    }
    ) => { 
        const handleContextMenu = (e : any , item : any) => {
            e.stopPropagation()
        }

        return ( 
            <menu style={{
                top : contextMenu.position.y + 2 + "px",
                left : contextMenu.position.x + 2 + "px",
                width : width,
                height : height
                }}
                className={`context-menu ${contextMenu.isToggled ? "active" : ""}`}
                ref={contextMenuRef}
            >
                <ul>
                    {menuItems.map((item , index) => {
                        return <li key={index} onClick={(e) => handleContextMenu(e, item)}> item</li>;
                    })}
                </ul>
            </menu>
        ); 
}

export default MenuContext;
