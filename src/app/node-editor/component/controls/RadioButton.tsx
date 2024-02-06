import clsx from "clsx";

function ItemBox(
    {
        index,
        selectIndex,
        setIndexState,
        children
    } : {
        index : number,
        selectIndex : number,
        setIndexState : (index : number) => void,
        children: React.ReactNode
    }
) {
    const thisIndex = index;
    return (
        <button
         onClick={() => {setIndexState(thisIndex)}} 
         className={clsx("text-sm rounded px-[5px]",
         "shadow-md",
         {"bg-slate-100" : selectIndex !== index},
         {"bg-slate-300" : selectIndex === index}) }>
            {children}
        </button>
    );
}

export function RadioButton(
    {
        selectIndex,
        items,
        setIndexState
    } : {
        selectIndex : number,
        items : string[]
        setIndexState : (index : number) => void
    }
) {
    return (
        <div className="flex space-x-[2px]">
            {
            items.map((item, index) => {
                return (
                    <ItemBox
                    key={item}
                    index={index}
                    selectIndex={selectIndex}
                    setIndexState={setIndexState}>
                        {item}
                    </ItemBox>
                );
            })
        }
        </div>
    )
}
