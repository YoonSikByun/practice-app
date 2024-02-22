import clsx from "clsx";
import { useState } from "react";
import { mainLayoutSize } from "@/app/main/config/layoutFrame";
import {
    mainStateCallbackManager,
    PageName,
    multiNodeDesignerCallbackManager
} from '@/app/main/util/globalStateManager';
import { XCircleIcon, PlusIcon } from "@heroicons/react/24/outline";

export type TabHeadItem = {
    title: string;
    id: string;
}

const topMargin : number = 20;

function ItemBox(
    {
        id,
        currentTabHeadId,
        setCurrentTabHeadId,
        deleteTabItem,
        children
    } : {
        id : string,
        currentTabHeadId : string,
        setCurrentTabHeadId : (id : string) => void,
        deleteTabItem : (id: string) => void,
        children: React.ReactNode
    }
) {
    //노드디자이너 선택
    const handlerOnClick = () => {
        setCurrentTabHeadId(id);
        mainStateCallbackManager.setCurrentPageName(PageName.NODE_DESIGNER);
    }

    //노드디자이너 삭제 처리
    const handlerOnClickX = () => {
        multiNodeDesignerCallbackManager.deleteNodeDesigner(id);
        deleteTabItem(id);
    }

    //선택된 노드디자이너면 화면에 보여준다.
    if(id === currentTabHeadId)
        multiNodeDesignerCallbackManager.showNodeDesigner(id);

    return (
        <li
            style={{height: (mainLayoutSize['topGNB'].height - topMargin)}}
             className={clsx("text-sm px-[5px] border-solid border-1",
                `border-sky-500 hover:bg-yellow-100 w-[150px]`,
             {"bg-slate-100" : (id !== currentTabHeadId)},
             {"bg-white border-t-4" : (id === currentTabHeadId)})}
        >
            <div className="flex">
                <button
                 style={{
                    lineHeight: `${mainLayoutSize['topGNB'].height - topMargin}px`,
                     width: 'calc(100% - 10px)'
                }}
                 onClick={handlerOnClick}
                >
                    {children}
                </button>
                <button
                 style={{lineHeight: `${mainLayoutSize['topGNB'].height - topMargin}px`, width: '30px' }}
                 onClick={handlerOnClickX}
                >
                    <XCircleIcon className='h-6 w-6 hover:bg-red-100' />
                </button>
            </div>
            <div>

            </div>
        </li>
    );
}

export function Tab( { items } : { items : TabHeadItem[]} ) {
    const [currentTabHeadId, setCurrentTabHeadId] = useState<string>('');
    const [tabItems, setTabItems] = useState<any[]>(items);

    //노드디자이너 신규 생성한다.
    const addItem = () => {
        const id : string = multiNodeDesignerCallbackManager.addNodeDesigner();
        if(id === '') {
            alert('Node id is empty');
            return;
        }
        const newItem = { title: `New-${tabItems.length+1}`, id: id};
        setTabItems([...tabItems, newItem]);
        setCurrentTabHeadId(id);
        mainStateCallbackManager.setCurrentPageName(PageName.NODE_DESIGNER);
    }

    //노드디자이너가 삭제되면 탭헤더도 삭제한다.
    const deleteTabItem = (id : string) => {
        let deletedindex = -1;
        const newList = tabItems.filter((item, index) => {
            if(item.id !== id) return true;
            deletedindex = index;
            return false;
        });

        setTabItems(newList);

        if(newList.length < 1) {
            //노드디자이너가 모두 삭제되었다면, 홈으로 페이지를 이동시킨다.
            mainStateCallbackManager.setCurrentPageName(PageName.HOME);
        } else {
            //삭제된 노드디자이너 대신 다른 노드디자이너를 선택해서 표시한다.
            if(newList.length-1 < deletedindex)
                setCurrentTabHeadId(newList[newList.length-1].id);
            else
                setCurrentTabHeadId(newList[deletedindex].id);
        }
    }

    return (
        <ul className={clsx(`flex space-x-[2px]`)}
        style={{
            height: (mainLayoutSize['topGNB'].height - topMargin),
            lineHeight: `${mainLayoutSize['topGNB'].height - topMargin}px`,
            marginTop: `${topMargin}px`}}>
            {
                tabItems.map((item, index) => {
                    return (
                        <ItemBox
                         key={index}
                         id={item.id}
                         currentTabHeadId={currentTabHeadId}
                         setCurrentTabHeadId={setCurrentTabHeadId}
                         deleteTabItem={deleteTabItem}
                        >
                            {item.title}
                        </ItemBox>
                    );
                })
            }
            <li
                style={{height: (mainLayoutSize['topGNB'].height - topMargin)}}
                className={clsx("text-sm border-solid border-1 border-sky-500",
                'w-[30px]')}
            >
                <button
                    onClick={addItem}
                    style={{height: (mainLayoutSize['topGNB'].height - (topMargin + 6 ))}}
                    className='rounded bg-slate-100 mt-1 hover:bg-yellow-100'
                >
                    <PlusIcon className='h-6 w-6' />
                </button>
            </li>
        </ul>
    );
}
