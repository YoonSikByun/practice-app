import clsx from "clsx";

function ItemBox(
    {
        index,
        selectIndex,
        className,
        setIndexState,
        children
    } : {
        index : number,
        selectIndex : number,
        className? : string,
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
            {"bg-slate-300" : selectIndex === index},
            'hover:bg-mouseoverclr-bold',
            className)}
         >
            {children}
        </button>
    );
}

export function RadioButton(
    {
        selectIndex,
        items,
        className,
        setIndexState
    } : {
        selectIndex : number,
        items : string[],
        className? : string,
        setIndexState : (index : number) => void
    }
) {
    return (
        <div className={clsx("flex flex-row gap-1 space-x-[1px]")}>
            {
            items.map((item, index) => {
                return (
                    <ItemBox
                    key={item}
                    index={index}
                    selectIndex={selectIndex}
                    setIndexState={setIndexState}
                    className={className}>
                        {item}
                    </ItemBox>
                );
            })
        }
        </div>
    )
}
