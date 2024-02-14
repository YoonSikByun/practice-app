import VariableDeck from '@/app/node-designer/component/variables/variableDeck' 
import { useState } from 'react';

const VariableDeckList = ({deckList,
                            searchName,
                            handlingDeleteDeck,
                          } : 
                          {deckList : JSX.Element[],
                           searchName : string,
                           handlingDeleteDeck : (deckId : string) => void,
                          }) => {
  if(searchName != ''){
    deckList = deckList.filter(deck => deck.props.varName.includes(searchName));
  }
 
  return (

    <>
      {deckList.map((deck) => (

        <div key={deck.props.varName}>
          <VariableDeck
            varName={deck.props.varName}
            handlingDeleteDeck={(() => handlingDeleteDeck(deck.props.varName))}
          />
        </div>
      ))}
    </>
  )
}

export default VariableDeckList
