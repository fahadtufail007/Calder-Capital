import React from "react";
import { ActionButton } from "..";
import styles from "./Table.module.css";
import styles1 from "../../styles/Clients.module.css";

const Table = ({  title, headings, data, setIsEditted, componentTitle }) => {
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
          {data?.map((el) => {
            return (
            <tr>
              {Object.keys(el)?.map((key) => {
                if (key === 'id') return null
                if (key==='assigned') {
                  const array = []
                  el[key].forEach(element => {
                    array.push(element?.value)
                  });
                  return (
                    <td>
                    <div className={styles1.assignees}>
                      {array.join(', ')}
                    </div>
                    </td>
                  )
                } else {
                  return (<td>{el[key]}</td>)
                }
                })}
              <td>
                <ActionButton title={title} 
                componentTitle={componentTitle}
                onClick={() => {
                  setIsEditted(el)
                  document.getElementById("modalId").click()
                }}
                id={el.id}
                />
              </td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
