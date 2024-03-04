import clsx from 'clsx';
import NodeDesignBoundary from '@/app/node-designer/component/node/nodeDesignBoundary';
import {NodeItem} from '@/app/node-designer/config/node';

export default function NodeContainer(
  {
    nodeItems
  } : {
    nodeItems : NodeItem[]
  }
) {
  return (
    <div className={clsx('grid grid-cols-2')}>
    {
      nodeItems.map((nodeItem) => (
        <NodeDesignBoundary
          key={nodeItem['id']}
          nodeKind={nodeItem['nodeKind']}
          width={nodeItem['designNodeSize'].width}
          height={nodeItem['runNodeSize'].height}
          Icon={nodeItem['icon']}
          className={nodeItem['designClassName']}/>))
    }
    </div>
  );
}
