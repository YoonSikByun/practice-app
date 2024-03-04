import { Tab, TabHeadItem } from '@/app/main/component/top/Tab'
// import { v4 as uuid } from "uuid";
import { useState } from 'react';

//Global Navigation Bar
export default function Center() {

    // const tabHeadItems : TabHeadItem[] = [
    //     {title: 'pipeline1', id : '1'},
    //     {title: 'pipeline1', id : '2'}
    // ];
    const tabHeadItems : TabHeadItem[] = [];

    return (
        <>
            <Tab items={tabHeadItems}/>
        </>
    );
}
