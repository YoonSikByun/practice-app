import clsx from "clsx";
import { useState, useCallback, useEffect } from "react";
import { mainLayoutSize } from "@/app/main/config/layoutFrame";
import {
    mainStateCallbackManager,
    PageName,
    multiNodeDesignerCallbackManager
} from '@/app/common/lib/globalStateManager';
import { XCircleIcon, PlusIcon, Square2StackIcon } from "@heroicons/react/24/outline";
import { SelectReactflow } from "@/app/api/lib/service/common/definition";

export type TabHeadItem = {
    title: string;
    id: string;
}

const topMargin : number = 10;
const selectionMargin : number = 8;

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
            className={clsx("flex flex-col text-sm bg-white border-solid border-[1px]",
                'border-borderclr-bold hover:bg-mouseoverclr-light w-[150px]')}
        >
            <div className={clsx(
                    {"bg-borderclr-bold" : (id === currentTabHeadId)})}
                    style={{
                        height: `${selectionMargin}px`,
                        width: '100%'
                    }}
            />
            <div className="flex flex-row px-2"
                style={{
                    height: `${mainLayoutSize['topGNB'].height - (selectionMargin+topMargin)}px`,
                    width: '100%'
                }}
            >
                <button
                    style={{
                        height: `${mainLayoutSize['topGNB'].height - (selectionMargin+topMargin)}px`,
                        lineHeight: `${mainLayoutSize['topGNB'].height - (selectionMargin+topMargin)}px`,
                        width: 'calc(100% - 10px)'
                    }}
                    onClick={handlerOnClick}
                >
                    {children}
                </button>
                <button
                    style={{
                        lineHeight: `${mainLayoutSize['topGNB'].height - (selectionMargin+topMargin)}px`,
                        width: '30px'}}

                    onClick={handlerOnClickX}
                    title='작업공간 닫기'
                >
                    <XCircleIcon className='h-6 w-6 hover:bg-mouseoverclr-bold' />
                </button>
            </div>

        </li>
    );
}

type TabItemData = {
    title : string,
    id : string
}

export function Tab( { items } : { items : TabHeadItem[]} ) {
    const [currentTabHeadId, setCurrentTabHeadId] = useState<string>('');
    const [tabItems, setTabItems] = useState<TabItemData[]>(items);

    const setCurrentTabIfExist = useCallback((id : string) => {
        for( let i = 0; i < tabItems.length; i++) {
            if(tabItems[i].id === id) {
                setCurrentTabHeadId(id);
                mainStateCallbackManager.setCurrentPageName(PageName.NODE_DESIGNER);
                return true;
            }
        }
        return false;
    }, [tabItems]);

    useEffect(() => {
        mainStateCallbackManager.registerSetCurrentTabIfExist(setCurrentTabIfExist);
    }, [setCurrentTabIfExist]);

    //노드디자이너 신규 생성한다.
    const addNodeDesigner = useCallback((data : SelectReactflow) => {
        const id : string = data.id;
        if(id === '') {
            alert('Node id is empty');
            return;
        }

        multiNodeDesignerCallbackManager.addNodeDesigner(id, data.design);
        
        const newTabItem = { title: data.name, id: id};
        setTabItems([...tabItems, newTabItem]);
        setCurrentTabHeadId(id);
        mainStateCallbackManager.setCurrentPageName(PageName.NODE_DESIGNER);
    }, [tabItems]);

    useEffect(() => {
        mainStateCallbackManager.registerSetCurrentTabHeadId(setCurrentTabHeadId);
        mainStateCallbackManager.registerAddNodeDesigner(addNodeDesigner);
    }, [addNodeDesigner]);

    //노드디자이너가 닫히면 탭헤더도 없앤한다.
    const deleteTabItem = useCallback((id : string) => {
        let deletedindex = -1;
        const newList = tabItems.filter((item, index) => {
            if(item.id !== id) return true;
            deletedindex = index;
            return false;
        });

        setTabItems(newList);

        if(newList.length < 1) {
            //노드디자이너가 모두 닫히면, 홈으로 페이지를 이동시킨다.
            mainStateCallbackManager.setCurrentPageName(PageName.HOME);
            setCurrentTabHeadId('');
        } else {
            mainStateCallbackManager.setCurrentPageName(PageName.NODE_DESIGNER);
            //닫힌 노드디자이너 대신 다른 노드디자이너를 선택해서 표시한다.
            if(newList.length-1 < deletedindex)
                setCurrentTabHeadId(newList[newList.length-1].id);
            else
                setCurrentTabHeadId(newList[deletedindex].id);
        }
    }, [tabItems]);

    return (
        <ul className={clsx(`flex space-x-[3px]`)}
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
                            <div className="flex flex-row items-center">
                                <Square2StackIcon className="h-5 w-5 mr-2"/>{item.title}
                            </div>
                        </ItemBox>
                    );
                })
            }

            {
                (currentTabHeadId) &&
                    <li style={{height: (mainLayoutSize['topGNB'].height - topMargin)}}
                        className={clsx('w-[30px]')}
                    >
                        <button
                            onClick={() => alert('만들기 창을 띄운다.')}
                            style={{marginTop: '7px', height: (mainLayoutSize['topGNB'].height - (topMargin + 11))}}
                            className={clsx('rounded mt-[3px] bg-hanablue-200 hover:bg-mouseoverclr-bold',
                            'border-solid border-[1px] border-borderclr-bold')}
                            title='작업공간 생성'
                        >
                            <PlusIcon className='h-5 w-5' />
                        </button>
                    </li>
            }
        </ul>
    );
}
