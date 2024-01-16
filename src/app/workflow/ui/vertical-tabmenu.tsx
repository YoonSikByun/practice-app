import '@/css/workflow/ui/vertical-menu.scss';
import { useState } from 'react';
import clsx from 'clsx';

export type MenuItem = {
    title : string,
    link : string
}

export default function VerticalTabMenu({
    menuItems
} : {
    menuItems : MenuItem[]
}) {
    const [indexClicked, SetIndexClicked] = useState<number>(0);
    const onButtonClick = (index : number) => {SetIndexClicked(index);}
    return (
        <div className="tab">
        {
            menuItems.map((menuItem, i) => {
                return (
                <div key={i}>
                    <TabHead
                     menuItem={menuItem}
                     index={i}
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
    index,
    clicked,
    onButtonClick
} : {
    menuItem : MenuItem,
    index : number,
    clicked : boolean,
    onButtonClick : (index : number) => void
}) {
    return (
        <button
            className={clsx(
                {"active" : clicked === true}
            )}
        onClick={(e)=>{onButtonClick(index)}}>
            {menuItem.title}
        </button>
    );
}
