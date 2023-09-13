import React from "react";
import { useDispatch } from "react-redux";

import styles from "./ActionButton.module.css";
import dropdownIcon from "../../assets/svgs/dropdown-icon.svg";
import { getDeleteDispatch } from "../../util/helper";
import { Link, useLocation } from "react-router-dom";

const ActionButton = ({ onClick, title, id, componentTitle }) => {
  const location = useLocation();
  const dispatch = useDispatch()

  return (
    <div className="dropdown">
      <div
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        className={styles.buttonContainer}>
        <div className={styles.buttonTitle}>Action</div>
        <img src={dropdownIcon} alt="icon" />
      </div>

      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {componentTitle !== 'Earnings' && <li>
          <button onClick={onClick} className="dropdown-item">
            {title}
          </button>
        </li>}
        <li>
          <button className="dropdown-item" onClick={() => getDeleteDispatch(id, dispatch, componentTitle)}>Delete</button>
        </li>
        {componentTitle == 'Contractors' && <li>
          <Link to={`/earnings/${id}`} className={styles.links}>
            <li>
              <button className="dropdown-item" >Earnings</button>
            </li>
          </Link>
        </li>}
      </ul>
    </div>
  );
};

export default ActionButton;