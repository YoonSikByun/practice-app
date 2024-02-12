import clsx from "clsx";
import { mainLayoutSize } from "@/app/main/config/layoutFrame";

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
    const thisTabHeadId = id;
    return (
        <li>
            <button
            onClick={() => {setCurrentTabHeadId(thisTabHeadId)}} 
            className={clsx("text-sm px-[5px]",
            `h-[${mainLayoutSize['topGNB'].height}px] w-[150px]`,
            {"bg-slate-100" : thisTabHeadId !== currentTabHeadId},
            {"bg-slate-300" : thisTabHeadId === currentTabHeadId}) }>
                {children}
            </button>
        </li>
    );
}

export function TabHead(
    {
        currentTabHeadId,
        items,
        setCurrentTabHeadId
    } : {
        currentTabHeadId : string,
        items : TabHeadItem[],
        setCurrentTabHeadId : (id : string) => void
    }
) {
    return (
        <ul className="flex space-x-[2px]">
            {
            items.map((item, index) => {
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
        </ul>
    )
}
