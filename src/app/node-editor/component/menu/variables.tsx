import clsx from 'clsx';
import {useState, useEffect} from 'react'
import '@/app/node-editor/css/component/react-flow/custom/Sidebar.scss'
import { calcStyle } from '@/app/node-editor/util/calcStyleRegion';
import {VariablesInput, VariableAddBtn} from '@/app/node-editor/component/variables/variableInput';
import VariableDeckList from '@/app/node-editor/component/variables/variableDeckList'
import VariableDeck from '@/app/node-editor/component/variables/variableDeck';
const Variables = ({show} : {show : boolean}) => {

    const handlingDeleteDeck = (deckId : string) => {
        const newDeckList = deckList.filter((deck)=> deck.props.deckId != deckId);
        setDeckList(newDeckList);
    }

    const handlingAddBtn = () => {
        let deckId = "deck_" + (counter+1);
        let newDeckList = [...deckList , <VariableDeck key={counter+1} deckId={deckId} handlingDeleteDeck= {handlingDeleteDeck}/>]
        setCounter(prev => prev + 1);
        setDeckList(newDeckList)
    }

    const [deckList, setDeckList] = useState([<VariableDeck key={0} deckId={"dec k_0"} handlingDeleteDeck= {handlingDeleteDeck}/>])
    const [counter, setCounter] = useState(0)


    return (
        <div  className={clsx('accordion-container',
            'overflow-auto', {'invisible': (!show)})}
            style={{left: calcStyle.leftMargin(),
            height: calcStyle.accordionHeight(),
            width: calcStyle.accordionWidth(),
            backgroundColor:"white"
            }
            }>
            <div className='sidebar-conatainer' style={{width: '332px'}}> 
                <SidebarHeader/>
                <VariableAddBtn onClick = {() => handlingAddBtn()}></VariableAddBtn>
                <VariablesInput/>
                <VariableDeckList deckList={deckList} handlingDeleteDeck= {handlingDeleteDeck}/>
            </div>
        </div>
    )
}


function SidebarHeader () {
    return (
        <div className="sidebar-wrapper">
            <div className="sidebar-header">변수 설정</div>
            <div className="sidebar-close-btn" >x</div>
        </div>
    )
}

export default Variables;