import '@/css/workflow/accordion.scss';
import '@/common/definition'
import clsx from 'clsx';
// import { AccordionData } from '@/common/definition';

import { useState } from 'react';

// let acc = document.getElementsByClassName("accordion");
// let i;

// for (i = 0; i < acc.length; i++) {
//   acc[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var panel = this.nextElementSibling;
//     if (panel.style.maxHeight) {
//       panel.style.maxHeight = null;
//     } else {
//       panel.style.maxHeight = panel.scrollHeight + "px";
//     } 
//   });
// }

export type AccordionData = {
    title: string;
    content: string;
};

export default function Accordion({accordItems} : {accordItems : AccordionData[]}) {
    return (
        <>
        {
            accordItems.map((accordItem) => {
                return (
                    <div key={accordItem.title}>
                        <AccordionNode accordItem={accordItem}/>
                    </div>
                );
            })
        }
        </>
    );
}

function AccordionNode({accordItem} : {accordItem : AccordionData}) {
    const [clicked, SetClicked] = useState<boolean>(false);
    return (
        <>
        <button
            className={
                clsx(
                    "accordion",
                    {
                        "active" : clicked == true
                    }
                )}
            onClick={(e) => {SetClicked(!clicked)}}
        >
            {accordItem.title}
        </button>
        <Panel height={(clicked) ? 100 : 0} />
        </>
    );
}

function Panel({height} : {height : number}) {

    return (
        <div className="panel" style={{maxHeight: height}}>
            <p>panel...</p>
        </div>
    );
}
