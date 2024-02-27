import VariableDeck from '@/app/node-designer/component/menu/variables/variableDeck' 
import clsx from 'clsx';

const VariableDeckList = ({deckList,
                            searchName,
                            handlingDeleteDeck,
                            className,
                            style
                          } : 
                          {deckList : JSX.Element[],
                           searchName : string,
                           handlingDeleteDeck : (deckId : string) => void,
                           className? : string,
                           style? : any
                          }) => {
  if(searchName != '') {
    deckList = deckList.filter(deck => deck.props.varName.includes(searchName));}

  return (
    <div className={clsx('overflow-y-auto overflow-x-hidden', className)}  style={{...style}}>
      {deckList.map((deck) => (
        <VariableDeck
          key={deck.props.varName}
          varName={deck.props.varName}
          handlingDeleteDeck={(() => handlingDeleteDeck(deck.props.varName))}
        />
      ))}
    </div>
  )
}

export default VariableDeckList
