import { useRef, useMemo, useEffect, useState } from "react";

import {
    MenuRole,
    menuGroups,
    ContextMenuArgument }
    from "@/app/main/component/menuContext/definition";
import clsx from "clsx";

type ContextMenuVisible = {
    x : number;
    y : number;
    visible : boolean;
}

export class ContextMenuManager {
    private currentMenuRole : MenuRole | null = null;
    private contextMenuRef : React.RefObject<HTMLInputElement> | null = null;
    private contextMenuVisible : ContextMenuVisible = {x:0,y:0,visible:false};

    setArgument(c : ContextMenuArgument) {
        this.calcDisplayPosition(c.clientX, c.clientY);
        this.setCurrentMenuRole(c.menuRole);
    }

    setRef(ref : React.RefObject<HTMLInputElement> ) {
        this.contextMenuRef = ref;
    }

    setCurrentMenuRole(r : MenuRole) { this.currentMenuRole = r; }
    getCurrentMenuRole() { return this.currentMenuRole; }
    getContextMenuVisible() { return this.contextMenuVisible; }

    calcDisplayPosition(clientX : number, clientY : number) {
        if(this.contextMenuRef && this.contextMenuRef.current) {
            const contextMenuAttr = this.contextMenuRef.current.getBoundingClientRect();
            const isLeft = clientX < window?.innerWidth / 2;
            this.contextMenuVisible.y = clientY;

            if(isLeft) {
                this.contextMenuVisible.x = clientX
            } else {
                this.contextMenuVisible.x = clientX - contextMenuAttr.width;
            }
        }
    }
}

const isValidPosition = (X : number, Y : number) =>
{
    if (X > 0 && Y > 0)
        return true;
    else
        return false;
}

export default function MenuContext(
    {
        width = 200,
        visible,
        setVisible,
        contextMenuArgument,
    } : {
        width? : number,
        visible : boolean,
        setVisible : (v : boolean) => void,
        contextMenuArgument : ContextMenuArgument,
    }
) {
        const manager : ContextMenuManager = useMemo(() => new ContextMenuManager(), []);
        const contextMenuRef = useRef<HTMLInputElement>(null);
        const [positionX, setPositionX] = useState(-1);
        const [positionY, setPositionY] = useState(-1);

        useEffect(() => {
            manager.setRef(contextMenuRef);
            manager.setArgument(contextMenuArgument);
            setPositionX(manager.getContextMenuVisible().x);
            setPositionY(manager.getContextMenuVisible().y);
        } , [manager, contextMenuArgument]);

        useEffect(() => {
            if( visible &&
                contextMenuRef.current &&
                isValidPosition(positionX, positionY))
            {
                contextMenuRef.current.focus();
            }
        }, [visible, positionX, positionY]);

        const handleClick = (e : any , item : any) => {
            setVisible(false);
            contextMenuArgument.callbackProc(item.action, contextMenuArgument.parentKey);
        }

        const menuRole = manager.getCurrentMenuRole();
        const outfocus = () => setVisible(false);

        return ( 
            <menu style={{
                top : `${positionY + 2}px`,
                left : `${positionX + 2}px`,
                width : width,
                }}
                className={
                    clsx(`context-menu ${
                        isValidPosition(positionX, positionY) ?
                            (visible ? "open" : "")
                        :
                            ""
                    }`)
                }
                ref={contextMenuRef}
                onBlur={outfocus}
                tabIndex={0}
            >
                <ul>
                    {menuRole && menuGroups[menuRole].map((item , index) => {
                        return item.hasUnderLine ?
                            <li className="separate"
                                key={index} onClick={(e) => handleClick(e, item)}
                            >
                                {item.title}
                            </li>
                            :
                            <li
                                key={index} onClick={(e) => handleClick(e, item)}
                            >
                                {item.title}
                            </li>;
                    })}
                </ul>
            </menu>
        ); 
}