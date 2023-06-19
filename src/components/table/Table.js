import React from "react";
import { ActionButton } from "..";
import styles from "./Table.module.css";

const Table = ({ onClick, title, headings, data }) => {
  return (
    <div className={styles.scrollTable}>
      <table className={styles.GeneratedTable}>
        <thead>
          <tr>
            {headings.map((heading) => (
              <th>{heading}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((el) => (
            <tr>
              {Object.keys(el).map((key) => (
                <td>{el[key]}</td>
              ))}
              <td>
                <ActionButton title={title} onClick={onClick} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
