import '@/app/node-designer/scss/component/verticalMenu.scss';
import clsx from 'clsx';
import { VerticalTabMenuItem } from '@/app/node-designer/config/menu';
import { calcStyle } from '@/app/node-designer/util/calcStyleRegion';

export default function VerticalTabMenu({
    menuItems,
    indexClicked,
    setVTabIndexClicked,
    setVTabVisible,
} : {
    menuItems : VerticalTabMenuItem[],
    indexClicked : number,
    setVTabIndexClicked : (index : number) => void,
    setVTabVisible : (prev : boolean[]) => void
}) {
    const onButtonClick = (title : string) => {
        let mnu : boolean[] = [];
        menuItems.map((menuItem, i) => {
            if(menuItem.title == title) {
                if(indexClicked == i)
                {
                    mnu.push(false);
                    setVTabIndexClicked(-1);
                }
                else
                {
                    mnu.push(true);
                    setVTabIndexClicked(i);
                }
            }
            else
                mnu.push(false);
        });

        setVTabVisible(mnu);
    }
    return (
        <div className="tab" style={{width: calcStyle.verticalMenuWidth()}}>
        {
            menuItems.map((menuItem, i) => {
                return (
                <div key={i} className='h-[110px]'>
                    <TabHead
                     menuItem={menuItem}
                     clicked={(indexClicked === i)}
                     onButtonClick={onButtonClick}/>
                </div>);
            })
        }
        </div>
    );
}

function TabHead({
    menuItem,
    clicked,
    onButtonClick
} : {
    menuItem : VerticalTabMenuItem,
    clicked : boolean,
    onButtonClick : (title : string) => void
}) {
    return (
        <button
            className={clsx(
                'tab-head', 'select-none',
                {'bg-nodedg-tabhead-clicked font-bold' : clicked === true},
                {'bg-nodedg-tabhead' : clicked === false},
                'h-full w-full',
                'border-solid border-borderclr-bold border-r-[1px] border-b-[1px]',
                'hover:bg-mouseoverclr'
            )}
            onClick={(e)=>{onButtonClick(menuItem.title)}}>
            <p className={clsx('text-black text-center')}>
                {menuItem.title}
            </p>
        </button>
    );
}
