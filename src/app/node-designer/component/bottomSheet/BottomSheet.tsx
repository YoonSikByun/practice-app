const BottomSheet = (
    {
        selectedNodes,
    } : {
        selectedNodes : string,
    }
) => {
    return (
        <div>
            Selected Node ID : {selectedNodes}
        </div>
    )
}

export default BottomSheet;
