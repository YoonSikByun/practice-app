import clsx from "clsx";
import { useState } from "react";
import { mainLayoutSize } from "@/app/main/config/layoutFrame";
import {
    mainStateCallbackManager,
    PageName,
    multiNodeDesignerCallbackManager
 } from '@/app/main/util/globalStateManager';

export type TabHeadItem = {
    title: string;
    id: string;
}

function ItemBox(
    {
        id,
        currentTabHeadId,
        setCurrentTabHeadId,
        children
    } : {
        id : string,
        currentTabHeadId : string,
        setCurrentTabHeadId : (id : string) => void,
        children: React.ReactNode
    }
) {
    const handlerOnClick = () => {
        setCurrentTabHeadId(id);
        mainStateCallbackManager.setCurrentPageName(PageName.NODE_DESIGNER);
    };

    if(id === currentTabHeadId)
        multiNodeDesignerCallbackManager.showNodeDesigner(id);

    return (
        <li>
            <button
             onClick={handlerOnClick} 
             className={clsx("text-sm px-[5px]",
             `h-[${mainLayoutSize['topGNB'].height}px] w-[150px]`,
             {"bg-slate-100" : (id !== currentTabHeadId)},
             {"bg-slate-300" : (id === currentTabHeadId)})}
            >
                {children}
            </button>
        </li>
    );
}

export function Tab( { items } : { items : TabHeadItem[]} ) {
    const [currentTabHeadId, setCurrentTabHeadId] = useState<string>('');
    const [tabItems, setTabItems] = useState<any[]>(items);

    const addItem = () => {
        const id : string = multiNodeDesignerCallbackManager.addNodeDesigner();
        if(id === ''){
            alert('Node id is empty');
            return;
        }
        const newItem = { title: `New-${tabItems.length+1}`, id: id};
        setTabItems([...tabItems, newItem]);
        setCurrentTabHeadId(id);
        mainStateCallbackManager.setCurrentPageName(PageName.NODE_DESIGNER);
    }

    return (
        <ul className="flex space-x-[2px]">
            {
                tabItems.map((item, index) => {
                    return (
                        <ItemBox
                        key={index}
                        id={item.id}
                        currentTabHeadId={currentTabHeadId}
                        setCurrentTabHeadId={setCurrentTabHeadId}
                        >
                            {item.title}
                        </ItemBox>
                    );
                })
            }
            <li>
                <button
                    onClick={addItem} 
                    className={clsx("text-sm px-[5px]",
                    `h-[${mainLayoutSize['topGNB'].height}px] w-[150px]`)}
                >
                Add
                </button>
            </li>
        </ul>
    );
}
