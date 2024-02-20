import { useState } from 'react';
import { createPortal } from 'react-dom';

function ModalContent({ onClose } : { onClose : () => void}) {
    console.log('create modal....');
    return (
    //   <div className="modal">
    <div style={{
        position: 'absolute',
        zIndex: 100
    }}>
        <p>Showing a modal dialog</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

export default function PortalExample() {
  const [showModal, setShowModal] = useState(false);
  console.log(`showModal : ${showModal}`);
  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Show
      </button>
      {showModal && createPortal(
        <ModalContent onClose={() => setShowModal(false)} />,
        document.body
      )}
    </>
  );
}
