import '@/app/globals.css';
import '@/css/workflow/ui/accordion.scss';
import '@/common/definition';
import clsx from 'clsx';

import { useState } from 'react';
import Boundary from './boundary';

export type AccordionData = {
    title: string;
    component: () => React.ReactNode;
};

export default function Accordion({
    accordItems,
    show,
    ref
} : {
    accordItems : AccordionData[],
    show : boolean,
    ref : any
}) {
    return (
        <Boundary ref={ref}>
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
        </Boundary>
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
