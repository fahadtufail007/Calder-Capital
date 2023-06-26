import React from "react";

import styles from "./Modal.module.css";

import Button from "../buttons/Button";

const Modal = ({ children, modalTitle , onClick, disable}) => {
  return (
    <div>
      <button
        id="modalId"
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ display: "none" }}
      />
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className={styles.modaHeader}>
                <div className={styles.modalTitle}>{modalTitle}</div>
              </div>
              <div className={styles.contentWrapper}>
                {children}
                <div
                  data-bs-dismiss="modal"
                  className={styles.modalButtonWarpper}>
                  <Button
                    title="Create"
                    radius="10px"
                    size="15px"
                    height="36px"
                    onClick={onClick}
                    disabled={disable}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
