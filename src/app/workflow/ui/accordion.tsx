import '@/css/workflow/ui/accordion.scss';
import '@/common/definition'
import clsx from 'clsx';

import { useState } from 'react';

export type AccordionData = {
    title: string;
    content: string;
};

export default function Accordion({
    accordItems
} : {
    accordItems : AccordionData[]
}) {
    return (
        <div className={clsx('accordion-container')}>
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
            <Panel height={(clicked) ? 100 : 0}/>
        </>
    );
}

function Panel({
    height
} : {
    height : number
}) {
    return (
        <div className="panel" style={{maxHeight: height}}>
            <p>panel...</p>
        </div>
    );
}
