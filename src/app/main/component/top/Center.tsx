import { Tab, TabHeadItem } from '@/app/main/component/top/Tab'

//Global Navigation Bar
export default function Center() {
    const tabHeadItems : TabHeadItem[] = [];

    return (
        <>
            <Tab items={tabHeadItems}/>
        </>
    );
}
