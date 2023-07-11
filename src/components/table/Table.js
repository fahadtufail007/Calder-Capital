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
            {headings.map((heading) => (
              <th>{heading}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data?.map((element) => {
            return (
              <tr>
                {column.map(item => {
                  if (typeof item == 'string') {
                    return (<td>
                      {element[item]}
                    </td>)
                  } else {
                    return (<td>
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
