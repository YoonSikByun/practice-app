import { mainLayoutSize } from "@/app/main/config/layoutFrame"
import { FixedModalButton } from "../modal/fixedModal"

export default function Right() {
    return (
        <div
            style={{lineHeight: `${mainLayoutSize['topGNB'].height}px`, width: '30px' }}
        >
            <FixedModalButton/>
        </div>
    )
}