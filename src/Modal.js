import React from 'react'
console.log('in modal cons')

const Modal = () => {
    return (
        <div className="modal">
            <div className="modal_content">
                <div className='modal_header'>
                    <h4 className='modal_title'>Modal Title</h4>
                </div>
                <div className='modal_body'>
                    This is modal content
                </div>
                <div className='modal_footer'>
                    <button className='modal_button'>Close</button>
                </div>
            </div>
        </div>
    )
}

export default Modal