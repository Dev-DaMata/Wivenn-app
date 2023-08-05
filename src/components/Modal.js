import React, { useState } from 'react';


const Modal = (props) => {
let { open, setOpen } = props

  return (
    <div>
      {open && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Modal Title</h2>
            <p>This is the content of the modal.</p>
            <button onClick={()=>setOpen(false)}>Close Modal</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
