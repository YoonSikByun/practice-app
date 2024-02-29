import { useCallback, useEffect, useMemo, useState } from "react";
import { MenuItem } from "./MenuGroup";

const MenuContext = (
    {
        menuItems,
        contextMenu,
        width,
        contextMenuRef
    } 
    : 
    {
        menuItems : MenuItem[],
        contextMenu : any,
        width : number,
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
                }}
                className={`context-menu ${contextMenu.isToggled ? "open" : ""}`}
                ref={contextMenuRef}
            >
                <ul>
                    {menuItems.map((item , index) => {
                        return item.hasUnderLine ? <li className="separate" key={index} onClick={(e) => handleContextMenu(e, item)}> {item.title}</li> : <li key={index} onClick={(e) => handleContextMenu(e, item)}> {item.title}</li>;
                    })}
                </ul>
            </menu>
        ); 
}

export default MenuContext;
