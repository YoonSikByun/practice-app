import '@/app/node-editor/css/component/verticalMenu.scss';
import clsx from 'clsx';
import { VerticalTabMenuItem } from '@/app/node-editor/config/menu';
import { calcStyle } from '@/app/node-editor/util/calcStyleRegion';

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
                <div key={i}>
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
        <div
            className={clsx(
                'tab-head', 'select-none',
                {'bg-orange-400 font-bold' : clicked === true},
                {'bg-red-100' : clicked === false},
                'h-[110px] w-full'
            )}
            onClick={(e)=>{onButtonClick(menuItem.title)}}>
            <p className={clsx('text-black text-center')}>
                {menuItem.title}
            </p>
        </div>
    );
}
