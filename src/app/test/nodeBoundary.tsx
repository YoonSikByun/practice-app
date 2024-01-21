import React from "react";

export default React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
    function NodeBoundary() {
        return (
            <div className="select-none m-[2px] shadow-md bg-orange-200 align-middle text-center border-[1px] border-rose-600 border-solid rounded w-[180px] h-[50px]"/>
        )
    }
);