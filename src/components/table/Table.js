import React from "react";
import { ActionButton } from "..";
import styles from "./Table.module.css";
import styles1 from "../../styles/Clients.module.css";
// import style1 from '../../styles/'


const Table = ({  title, headings, data, setIsEditted }) => {
  // console.log("ee", data);
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
          {data.map((el) => {
            return (
            <tr>
              {Object.keys(el).map((key) => {
                if (key==='assigned') {
                  const array = []
                  el[key].forEach(element => {
                    array.push(element.value)
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
                // onClick={onClick} 
                onClick={() => {
                  setIsEditted(el)
                  document.getElementById("modalId").click()
                }}

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
