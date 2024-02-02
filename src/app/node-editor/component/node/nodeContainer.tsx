import clsx from 'clsx';
import NodeDesignBoundary from '@/app/node-editor/component/node/nodeDesignBoundary';

import {NodeItem} from '@/app/node-editor/config/node';

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
      nodeItems.map((nodeItem, index) => (
          <NodeDesignBoundary
            key={nodeItem['id']}
            nodeKind={nodeItem['nodeKind']}
            width={nodeItem['designNodeSize'].width}
            height={nodeItem['runNodeSize'].height}
            className={nodeItem['designClassName']}/>))
    }
    </div>
  );
}
