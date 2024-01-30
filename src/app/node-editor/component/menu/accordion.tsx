import '@/app/globals.css';
import '@/app/node-editor/css/ui/accordion.scss';
import '@/common/definition';
import clsx from 'clsx';
import { useState } from 'react';
import { AccordionPanelItem } from '@/app/node-editor/config/menu';
import {layoutSize} from '@/app/node-editor/config/layoutFrame'

export default function Accordion({
    accordItems,
    show
} : {
    accordItems : AccordionPanelItem[],
    show : boolean
}) {
    return (
        <div id='accordion-container' className={clsx('accordion-container',
            'overflow-auto', {'invisible': (!show)})}>
        {
            accordItems.map((accordItem) => {
                return (
                    <div key={accordItem.title}>
                        <AccordionNode accordItem={accordItem}/>
                    </div>
                );
            })
        }
        </div>
    );
}

function AccordionNode({
    accordItem
} : {
    accordItem : AccordionPanelItem
}) {
    const [clicked, setClicked] = useState<boolean>(false);
    return (
        <>
            <button
                className={clsx(
                        "accordion",
                        {"active" : clicked == true}
                    )}
                onClick={(e) => {setClicked(!clicked)}}
            >
                {accordItem.title}
            </button>
            <Panel accordItem={accordItem} height={(clicked) ? 0 : 500}/>
        </>
    );
}

function Panel({
    accordItem,
    height
} : {
    accordItem : AccordionPanelItem,
    height : number
}) {
    return (
        (height > 0) ? accordItem.component() : null
    );
}
