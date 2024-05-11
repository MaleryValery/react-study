import { MODAL_TEXT } from '../constants/const';

type ModalProps = {
  isHiden: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

function Modal({ isHiden, onConfirm, onCancel }: ModalProps) {
  return (
    <div className={`overlay ${!isHiden ? 'hiden' : ''}`}>
      <div className="modal-wrappet">
        <p>{MODAL_TEXT}</p>
        <div className="btns-wrapper">
          <button className="modal-btn" type="button" onClick={onConfirm}>
            sure
          </button>
          <button className="modal-btn" type="button" onClick={onCancel}>
            oh no
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
