import React from "react";

import styles from "./Modal.module.css";

import Button from "../buttons/Button";

const Modal = ({ children, modalTitle }) => {
  return (
    <div>
      <button
        id="modalId"
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ display: "none" }}
      />
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
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
