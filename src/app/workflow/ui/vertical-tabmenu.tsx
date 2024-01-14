import '@/css/workflow/ui/vertical-menu.scss';
import { useState } from 'react';

export type MenuItem = {
    title : string,
    link : string
}

export default function VerticalTabMenu({
    menuItems
} : {
    menuItems : MenuItem[]
}) {
    return (
        <div className="tab">
        {
            menuItems.map((menuItem, i) => {
                return (
                <div key={i}>
                    <TabHead menuItem={menuItem}/>
                </div>
                )
            })
        }
        </div>
    );
}

function TabHead({
    menuItem
} : {
    menuItem : MenuItem
}) {
    const [clicked, SetClicked] = useState<boolean>(false);
    return (
        <button>{menuItem.title}</button>
    );
}
