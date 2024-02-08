import { useEffect , useState } from "react";
import SelectBox from "@/app/node-editor/component/selectBox/selectbox"
import { OPTIONS } from "@/app/node-editor/component/selectBox/options"
const VariableDeck = ( {deckId , handlingDeleteDeck} : {deckId : string , handlingDeleteDeck : (deckId : string) => void}) => {

    const [inputValue, setInputValue] = useState<string>(""); // 상태 추가

    useEffect(() => {
    setInputValue(`$(변수명+${deckId})`);
    }, [deckId]);

    return (
      <div className='sidebar-variable-deck'>
        <div className='sidebar-variable-remove' onClick={() => handlingDeleteDeck(deckId)}>x</div>
        <input className="sidebar-variable-deck-row" placeholder="변수명" ></input>
        <SelectBox></SelectBox>
        <input className="sidebar-variable-deck-row"type="search" placeholder="Enter Value" role="textbox"></input>
      </div>
    )
}

    
export default VariableDeck
