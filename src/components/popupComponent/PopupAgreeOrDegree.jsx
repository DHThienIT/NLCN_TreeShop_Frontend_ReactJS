import { Fragment, useRef } from "react";

const PopupAgreeOrDegree = ({ content, handleAgreeDelete }) => {
  const popupRef = useRef();

  return (
    <Fragment>
      <div
        ref={popupRef}
        className="modal fade"
        id="popupFormAgreeOrDegree"
        tabIndex="-1"
        aria-labelledby="popupFormAgreeOrDegreeLabel"
        aria-hidden="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="popupFormAgreeOrDegreeLabel">
                {content}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleAgreeDelete}
              >
                Đồng Ý
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      </div >
    </Fragment >
  );
}

export default PopupAgreeOrDegree;