const BottomSheet = (
    {
        selectedNodes,
        showBottomSheet
    } : {
        selectedNodes : string[],
        showBottomSheet : (show : boolean) => void
    }
) => {
    showBottomSheet(selectedNodes.length === 1);
    return (
        <div>
            nodes : {selectedNodes.length}
        </div>
    )
}

export default BottomSheet;