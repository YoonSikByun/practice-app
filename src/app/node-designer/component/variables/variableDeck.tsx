import { useState } from "react";
import SelectBox from "@/app/node-designer/component/selectBox/selectbox"
const VariableDeck = ({
                        varName,
                        handlingDeleteDeck,
                      } 
                      : 
                      {
                        varName : string,
                        handlingDeleteDeck : (varName : string) => void
                      }) => {

    const [inputValue, setInputValue] = useState<string>(varName); 

    const handlingVarName = (newVarName: string) => {
      setInputValue(newVarName)
  }

  return (
    <div className='sidebar-variable-deck'>
      <div className='sidebar-variable-remove' onClick={() => handlingDeleteDeck(varName)}>x</div>
      <input className="sidebar-variable-deck-row" placeholder="변수명" value={inputValue} onChange={e => handlingVarName(e.target.value)}></input>
      <SelectBox></SelectBox>
      <input className="sidebar-variable-deck-row" type="text" placeholder="Enter Value" role="textbox"></input>
    </div>
  )
}

    
export default VariableDeck
