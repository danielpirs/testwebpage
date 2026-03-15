import PropTypes from 'prop-types';

function Modal({ isOpen, title, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      data-testid="modal-overlay"
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        data-testid="modal"
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 data-testid="modal-title">{title}</h2>
          <button
            data-testid="modal-close-btn"
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p data-testid="modal-message">{message}</p>
        </div>
        <div className="modal-footer">
          <button
            data-testid="modal-ok-btn"
            className="btn btn-primary"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
