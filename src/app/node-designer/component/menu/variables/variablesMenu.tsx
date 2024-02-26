import clsx from 'clsx';
import {useState, useEffect} from 'react'

import '@/app/node-designer/scss/component/react-flow/custom/Sidebar.scss'
import { calcStyle } from '@/app/node-designer/util/calcStyleRegion';
import VariableDeckList from '@/app/node-designer/component/menu/variables/variableDeckList'
import VariableDeck from '@/app/node-designer/component/menu/variables/variableDeck';

const titleHeight = 40;
const searchHeight = 85;

export default function Variables({show} : {show : boolean}) {

    const [counter, setCounter] = useState(0)
    const [searchName , setSearchName] = useState('');

    const handlingDeleteDeck = (varName : string) => {
        const newDeckList = deckList.filter((deck)=> deck.props.varName != varName);
        setDeckList(newDeckList);
    }
    
    const [deckList, setDeckList] = useState([<VariableDeck key={0} varName={"deck_0"} handlingDeleteDeck= {handlingDeleteDeck}/>])

    const handlingAddBtn = () => {
        let varName = "deck_" + (counter+1);
        let newDeckList = [...deckList , <VariableDeck key={counter+1} varName={varName} handlingDeleteDeck= {handlingDeleteDeck} />]
        setCounter(prev => prev + 1);
        setDeckList(newDeckList)
    }

    const handlingSearch = (e : any) => {
        setSearchName(e.target.value);
    }

    useEffect(() => {
        handlingSearch
      }, []);

    return (
        <div  className={clsx(
                'flex flex-col',
                {'invisible': (!show)},
                'border-r-[1px]',
                'border-borderclr-bold')}
            style={{
                position: 'absolute',
                top: '0px',
                left: calcStyle.leftMargin(),
                height: calcStyle.accordionHeight(),
                width: calcStyle.accordionWidth(),
                backgroundColor:"white"}}
        >
            <div
                className="flex flex-col items-center"
                style={{height: `${titleHeight}px`}}
            >
                <span
                    className='font-bold'
                    style={{lineHeight: `${titleHeight}px`}}
                >
                    변수 설정
                </span>
            </div>
            <div className='flex flex-col items-center'
                style={{height: `${searchHeight}px`}}
            >
                <button
                    className={clsx('border-[1px] border-borderclr-bold',
                            'm-1 w-[80%] h-[28px]',
                            'bg-hanablue-100')}
                    onClick={handlingAddBtn}
                >
                 +변수 추가
                </button>
                <input className={clsx('border-[1px] border-borderclr-bold',
                    'm-1 w-[80%] h-[28px]')}
                    type="search"
                    placeholder="변수 검색"
                    style={{textAlign:"left" , paddingLeft:"10px"}}
                    onChange = {handlingSearch}
                />
            </div>
            <VariableDeckList
                style={{
                    height:`calc(100vh - ${calcStyle.getFixedTop() + titleHeight + searchHeight}px)`
                }}
                deckList={deckList}
                searchName={searchName}
                handlingDeleteDeck={handlingDeleteDeck}
            />
        </div>
    )
}
