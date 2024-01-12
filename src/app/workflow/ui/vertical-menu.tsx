import '@/css/workflow/ui/vertical-menu.scss';

export type MenuItem = {
    title : string,
    link : string
}

export default function VerticalMenu({
    menuItems
} : {
    menuItems : MenuItem[]
}) {
    return (
        <div className="tab">
        {
            menuItems.map((menuItem) => {
                return (
                <>
                    <button>{menuItem.title}</button>
                </>
                )
            })
        }
        </div>
    );
}