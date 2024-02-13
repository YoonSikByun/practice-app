import '@/app/globals.css';
import '@/app/node-designer/scss/component/accordion.scss';
import clsx from 'clsx';
import { useState } from 'react';
import { AccordionPanelItem } from '@/app/node-designer/config/menu';
import { calcStyle } from '@/app/node-designer/util/calcStyleRegion';
import {forwardRef} from 'react';

export default forwardRef(
    function Accordion({accordItems, show} : {accordItems : AccordionPanelItem[], show : boolean}, ref:any) {
        
        return (
            <div  ref={ref} className={clsx('accordion-container',
                    'overflow-auto', {'invisible': (!show)})}
                style={{
                left: calcStyle.leftMargin(),
                height: calcStyle.accordionHeight(),
                width: calcStyle.accordionWidth()}}>
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
});

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