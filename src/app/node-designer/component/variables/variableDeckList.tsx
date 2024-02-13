import VariableDeck from '@/app/node-designer/component/variables/variableDeck' 
import { useState } from 'react';
const VariableDeckList = ({deckList , handlingDeleteDeck} : {deckList : JSX.Element[] , handlingDeleteDeck : (deckId : string) => void}) => {
  return (
    <>
      {deckList.map((item) => (
        <div key={item.props.deckId}>
          <VariableDeck
            deckId={item.props.deckId}
            handlingDeleteDeck={(() => handlingDeleteDeck(item.props.deckId))}
          />
        </div>
      ))}
    </>
  )
}

export default VariableDeckList
