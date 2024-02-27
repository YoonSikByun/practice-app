import { useState } from "react";
import SelectBox from "@/app/node-designer/component/controls/selectBox/selectbox"
import { TrashIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";

export default function VariableDeck(
  {
    varName,
    handlingDeleteDeck,
  } 
  : 
  {
    varName : string,
    handlingDeleteDeck : (varName : string) => void
  }
) {

  const [inputValue, setInputValue] = useState<string>(varName); 
  const handlingVarName = (newVarName: string) => {setInputValue(newVarName)}

  return (
    <div className='m-2'>
      <div className='flex flex-col h-[100px] rounded bg-hanablue-100'>

        <div className="flex flex-row ml-2 mt-2">
          <div className="w-[90%]">
            <input className="w-[190px] border-[1px] border-borderclr-bold h-[25px]"
              style={{paddingLeft:"10px"}}
              placeholder="변수명"
              value={inputValue}
              onChange={e => handlingVarName(e.target.value)}
            />
          </div>
          <div className="relative w-[10%]">
            <button
              onClick={() => handlingDeleteDeck(varName)}
            >
              <TrashIcon className={clsx("h-5 w-5",
                    "fill-borderclr-bold hover:fill-mouseoverclr-bold")}
              />
            </button>
          </div>
        </div>

        <div className="flex flex-row  ml-2 mt-1">
          <SelectBox className={clsx("border-[1px] border-borderclr-bold",
                      "w-[190px] h-[25px]")}
            style={{paddingLeft:"10px"}}
          />
        </div>

        <input className={clsx('border-[1px] border-borderclr-bold',
          ' ml-2 mt-1 w-[190px] h-[25px]')}
          type="text"
          placeholder="값 입력"
          style={{textAlign:"left" , paddingLeft:"10px"}}
        />

      </div>
    </div>
  )
}
