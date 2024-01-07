import React from "react";

export default React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
    function Boundary(
        props,
        ref) {
            return (
                <div
                    {...props}
                    ref={ref}
                    className={props.className}
                />
            );
        }
);