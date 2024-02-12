import { TabHead, TabHeadItem } from '@/app/main/component/controls/TabHead'
import { v4 as uuid } from "uuid";
import { useState } from 'react';

//Global Navigation Bar
export default function Center() {

    const tabHeadItems : TabHeadItem[] = [
        {title: 'pipeline1', id : '1'},
        {title: 'pipeline1', id : '2'}
    ];

    console.log(`pipeline1 : ${tabHeadItems[0].id}`);
    console.log(`pipeline1 : ${tabHeadItems[1].id}`);

    const [currentTabHeadId, setCurrentTabHeadId] = useState<string>('');

    return (
        <>
            <TabHead
                currentTabHeadId={currentTabHeadId}
                items={tabHeadItems}
                setCurrentTabHeadId={setCurrentTabHeadId}
            />
        </>
    )
}
