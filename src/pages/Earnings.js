import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { CSVLink } from "react-csv";
import moment from "moment";

import styles from "../styles/Earnings.module.css";
import { Button, RevenueCard, Table } from "../components";

import totalRevenueIcon from "../assets/svgs/total-revenue-icon.svg";
// import monthlyRevenueIcon from "../assets/svgs/monthly-revenue-icon.svg";
import clientsIcon from "../assets/svgs/avatar-icon.svg";
import { getClients } from "../store/thunk/client.thunk";
import { getCsvData, getEarnings } from "../store/thunk/earning.thunk";
import { toast } from 'react-toastify';

const Earnings = () => {
  const { userId } = useParams();
  // console.log(userId, "userid X");
  const dispatch = useDispatch();
  const { data, csvData } = useSelector(state => state.earning);
  const clients = useSelector(state => state.client.data)
  const headers = [
    "Clients",
    "Clients Email",
    "Last Date Updated",
    "Commission Earned",
    "Employee Share",
  ]
  function handleCsvDownload() {
    toast("Cvs downloaded successfully", { type: "success" })
  }
  useEffect(() => {
    dispatch(getClients());
    dispatch(getEarnings(userId));
    dispatch(getCsvData(userId));
  }, [])

  const getClientData = (id) => {
    const client = clients?.find((x) => x._id == id);
    console.log(id, "client data");
    if (client) {
      return {
        name: `${client?.f_name} ${client?.l_name}`,
        email: client?.email
      };
    } else {
      return {
        name: '',
        email: ''
      };
    }
  };

  const getFormatedDate = (date) => {
    return date ? moment(date).format('DD MMM, YYYY') : ''
  }


  const currentDate = new Date();

  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  const year = currentDate.getFullYear();

  const formattedDate = `${month}-${day}-${year}`;
  const fileName = data?.name + "  " + formattedDate;




  return (
    <div className={styles.earningsContainer}>
      <div className={styles.revenuesHeader}>
        <div>
          <div className={styles.userName}>{data?.name}</div>
          <div className={styles.userEmail}>{data?.email}</div>
        </div>
        <div className={styles.revenueCards}>
          <RevenueCard
            title="Total Revenue"
            revenue={data?.totalEarning ? parseFloat(data.totalEarning).toFixed(2) : "N/A"}
            icon={totalRevenueIcon}
          />

          {/* <RevenueCard
            title="Monthly Revenue"
            revenue="$25k"
            icon={monthlyRevenueIcon}
          /> */}
          <RevenueCard title="Total Clients" revenue={`${data?.totalClients}`} icon={clientsIcon} />
        </div>
      </div>
      <Table
        headings={[
          "Clients",
          "Client Email",
          "Last Date Updated",
          "Commission Earned",
          "Contractor Share",
          "Actions",
        ]}
        componentTitle="Earnings"
        data={data?.earnings}
        column={[
          (element) => {
            return getClientData(element.clientId).name
          },
          (element) => {
            return getClientData(element.clientId).email
          },
          (element) => {
            return getFormatedDate(element.updatedAt)
          },
          (element) => {
            return `$ ${parseFloat(element.employeeAmount).toFixed(2)}`;
          },
          (element) => {
            return `${element.employeeShare} %`
          },
        ]}
      />
      <div className={styles.earningsButtonWrapper}>
        <CSVLink data={csvData} headers={headers} onClick={handleCsvDownload} filename={fileName}>
          <Button title="Download in CSV" radius="16px" size="13px" />
        </CSVLink>
      </div>
    </div>
  );
};

export default Earnings;
