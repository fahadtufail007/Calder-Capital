import React from "react";
import { ActionButton } from "..";
import styles from "./Table.module.css";
import styles1 from "../../styles/Clients.module.css";

const Table = ({ title, headings, data, setIsEditted, componentTitle, column = [] }) => {
  return (
    <div className={styles.scrollTable}>
      <table className={styles.GeneratedTable}>
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data?.map((element, index) => {
            return (
              <tr key={index}>
                {column.map((item, index) => {
                  if (typeof item == 'string') {
                    return (<td key={index}>
                      {element[item]}
                    </td>)
                  } else {
                    return (<td key={index}>
                      {item(element)}
                    </td>)
                  }
                })}
                <td>
                  <ActionButton title={title}
                    componentTitle={componentTitle}
                    onClick={() => {
                      setIsEditted(element)
                      document?.getElementById("modalId")?.click()
                    }}
                    id={element._id}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
