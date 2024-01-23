import '@/css/workflow/ui/vertical-menu.scss';
import { useState } from 'react';
import clsx from 'clsx';

export type MenuItem = {
    title : string,
    link : string
}

export default function VerticalTabMenu({
    menuItems,
    indexClicked,
    setVTabIndexClicked,
    setVTabVisible,
} : {
    menuItems : MenuItem[],
    indexClicked : number,
    setVTabIndexClicked : (index : number) => void,
    setVTabVisible : (prev : boolean[]) => void
}) {
    const onButtonClick = (title : string) => {
        let mnu : boolean[] = [];
        menuItems.map((menuItem, i) => {
            if(menuItem.title == title) {
                if(indexClicked == i)
                {
                    mnu.push(false);
                    setVTabIndexClicked(-1);
                }
                else
                {
                    mnu.push(true);
                    setVTabIndexClicked(i);
                }
            }
            else
                mnu.push(false);
        });

        setVTabVisible(mnu);
    }
    return (
        <div className="tab">
        {
            menuItems.map((menuItem, i) => {
                return (
                <div key={i}>
                    <TabHead
                     menuItem={menuItem}
                     clicked={(indexClicked === i)}
                     onButtonClick={onButtonClick}/>
                </div>);
            })
        }
        </div>
    );
}

function TabHead({
    menuItem,
    clicked,
    onButtonClick
} : {
    menuItem : MenuItem,
    clicked : boolean,
    onButtonClick : (title : string) => void
}) {
    return (
        <button
            className={clsx({"active" : clicked === true})}
            onClick={(e)=>{onButtonClick(menuItem.title)}}
        >
            {menuItem.title}
        </button>
    );
}
