import '@/app/globals.css';
import '@/css/workflow/ui/accordion.scss';
import '@/common/definition';
import clsx from 'clsx';

import { useState } from 'react';

export type AccordionData = {
    title: string;
    component: () => React.ReactNode;
};

export default function Accordion({
    accordItems,
    show
} : {
    accordItems : AccordionData[],
    show : boolean
}) {
    return (
        <div className={clsx('accordion-container',
        'overflow-auto',
        {'invisible': (!show)})}>
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
    accordItem : AccordionData
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
    accordItem : AccordionData,
    height : number
}) {
    return (
        (height > 0) ? accordItem.component() : null
    );
}
