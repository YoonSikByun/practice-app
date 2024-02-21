import '@/app/main/component/popup/popup.scss';
import { useState, useRef, useMemo, useEffect, KeyboardEvent, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { XCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Boundary from '@/app/common/util/Boundary';
import {registMouseEvent} from "@/app/common/util/moudeMove";
import { Rect, Size, Position } from '@/app/common/util/definition';

const INVALID_INDEX = -10000;
let PIVOT_POSITION : Position = {x: INVALID_INDEX, y: INVALID_INDEX};

function Popup(
    {
        title,
        closePopup,
        children
    } : {
        title : string,
        closePopup : () => void,
        children: React.ReactNode
    }) {

    const popupSize : Size = useMemo<Size>(() => ({width: 800, height: 500}), []);

    const [popupTop, setPopupTop] = useState<string>(`calc(50% - ${(popupSize.height/2)}px)`);
    const [popupLeft, setPopupLeft] = useState<string>(`calc(50% - ${(popupSize.width/2)}px)`);

    const popupRef = useRef<HTMLDivElement>(null);

    //ESC키를 누르면 팝업을 닫는다.
    const EscKeyDown = useCallback((event : any) => {
        if(event.key === 'Escape') closePopup();
    }, [closePopup]);

    const getRefPosition = (ref : any) => {
        const r : Rect = ref.current?.getBoundingClientRect() as Rect;
        if(!r) return {x: INVALID_INDEX, y: INVALID_INDEX};
        else  return {x: r.left, y: r.top};
    }

    const OnDrageChange = (deltaX : number, deltaY : number) => {
        if(PIVOT_POSITION.x === INVALID_INDEX && PIVOT_POSITION.y === INVALID_INDEX) {
            PIVOT_POSITION = getRefPosition(popupRef);
        }

        const newPopupTop = `${PIVOT_POSITION.y + deltaY}px`;
        const newPopupLeft = `${PIVOT_POSITION.x + deltaX}px`;
        setPopupTop(newPopupTop);
        setPopupLeft(newPopupLeft);
    }

    const OnMouseUp = () => { PIVOT_POSITION = {x:INVALID_INDEX, y:INVALID_INDEX}}

    return (
    <div className='popup'>
        <Boundary
            className='popup_inner'
            style={{
                top: popupTop,
                left: popupLeft,
                width: popupSize.width,
                height: popupSize.height
            }}
            ref={popupRef}
            onKeyDown={EscKeyDown}
            tabIndex={0}
        >
            <div className='flex'
                {...registMouseEvent(OnDrageChange, OnMouseUp)}
            >
                {title}
                <button onClick={closePopup}>
                    <XCircleIcon className={clsx("relative m-[3px] h-7 w-7 text-gray-700")} />
                </button>
            </div>
            <div>
                {children}
            </div>
        </Boundary>
    </div>
    );
}

export default function ShowPopup(
    {
        title,
        visible,
        setVisible
    } : {
        title : string,
        visible : boolean,
        setVisible : (visible:boolean) => void
    }) {
    const overlayRootEl = (typeof document !== 'undefined') ?
                            document.querySelector('#main-body')
                            : null;

    const closePopup = () => setVisible(false);

    return (
    <>
        {
            (visible && overlayRootEl) && createPortal(
                <Popup title={title} closePopup={closePopup}>
                    <h1>content</h1>
                </Popup>,
                overlayRootEl
            )
        }
    </>
    );
}
