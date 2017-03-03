import React from 'react';
import './Modal.scss';

export const Modal = ({ children, title, onRequestClose, open, titleStyle, bodyStyle, showCloseButton}) => (
  <div className="modal-container" style={{display: open? 'block':'none'}} onClick={()=>onRequestClose && onRequestClose()}>
    <div className="modal-content" onClick={e=>e.stopPropagation()}>
      <h2 className="modal-header" style={titleStyle}>
        {title}
        {showCloseButton?
          <button type="button" className="close" onClick={()=>onRequestClose && onRequestClose()}>
            <span>×</span>
          </button>
          :null
        }
      </h2>
      <div className="modal-body" style={bodyStyle}>
        {children}
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  children : React.PropTypes.element,
  title : React.PropTypes.string,
  onRequestClose : React.PropTypes.func,
  open : React.PropTypes.bool,
  titleStyle: React.PropTypes.object,
  bodyStyle: React.PropTypes.object,
  showCloseButton: React.PropTypes.bool,
};

export default Modal;
