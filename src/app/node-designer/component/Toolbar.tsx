import Image from 'next/image';
import floppyDisk from "@/app/common/image/floppy-disk.svg";
import { multiNodeStateCallback } from '@/app/node-designer/lib/nodeDesignerStateManager';
import { submitUpdateReactflow } from '@/app/api/lib/service/client/request';
import { UpdateReactflow } from '@/app/api/lib/service/common/definition';

export default function Toolbar({id} : {id : string}) {

    const saveReactflow = async () => {
        const saveData = multiNodeStateCallback.call(id).saveReactflow();
        const data : UpdateReactflow = {
            workspaceId: id,
            data : saveData
        }
        await submitUpdateReactflow(data, '저장이 완료되었습니다.');
    }

    return (
        <div className="flex flex-row-reverse items-center bg-titlebg-2 h-full w-full">
            <button onClick={saveReactflow}>
                <Image priority src={floppyDisk} className='h7 w-7 mr-3' alt='저장'/>
            </button>
        </div>
    );
}