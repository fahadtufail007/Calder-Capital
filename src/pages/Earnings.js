import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CSVLink } from "react-csv";

import styles from "../styles/Earnings.module.css";
import { Button, RevenueCard, Table, TextInput } from "../components";

import totalRevenueIcon from "../assets/svgs/total-revenue-icon.svg";
// import monthlyRevenueIcon from "../assets/svgs/monthly-revenue-icon.svg";
import clientsIcon from "../assets/svgs/avatar-icon.svg";
import { getClients } from "../store/thunk/client.thunk";
import { getCsvData, getEarnings } from "../store/thunk/earning.thunk";
import { toast } from "react-toastify";

const Earnings = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { data, csvData } = useSelector((state) => state.earning);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedData, setSelectedData] = useState(csvData || []);
  const headers = [
    "Clients",
    "Clients Email",
    "Last Date Updated",
    "Commission Earned",
    "Employee Share",
  ];

  useEffect(() => {
    setSelectedData(csvData);
  }, [csvData]);

  console.log("csvData", csvData);
  console.log("selectedData", selectedData);

  useEffect(() => {
    dispatch(getClients());
    dispatch(getEarnings(userId));
    dispatch(getCsvData(userId));
  }, []);

  const currentDate = new Date();

  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(currentDate.getDate()).padStart(2, "0");
  const year = currentDate.getFullYear();

  const formattedDate = `${month}-${day}-${year}`;
  const fileName = data?.name + "  " + formattedDate;

  function noPaymentMsg() {
    toast("No payment found", { type: "error" });
  }

  function paymentSucessMsg() {
    toast("Cvs downloaded successfully", { type: "success" });
  }

  let CSVBtn;
  if (Array.isArray(selectedData) && selectedData.length > 0) {
    CSVBtn = (
      <CSVLink
        data={selectedData}
        headers={headers}
        onClick={paymentSucessMsg}
        filename={fileName}>
        <Button title="Download in CSV" radius="16px" size="13px" />
      </CSVLink>
    );
  } else {
    CSVBtn = (
      <Button
        title="Download in CSV"
        radius="16px"
        size="13px"
        onClick={noPaymentMsg}
      />
    );
  }

  const filteredData = (date) => {
    if (!date) {
      setSelectedData(csvData);
      return;
    }
    const selectedDate = new Date(date);
    setSelectedData(
      csvData?.filter((item) => {
        console.log("item[2]", item);
        if (selectedDate.toDateString() == new Date(item[2]).toDateString()) {
          return true;
        } else {
          return false;
        }
      })
    );
  };

  const getTotalEarning = () => {
    let total = 0;
    selectedData.forEach((item) => {
      total = total + Number(item[3].slice(2));
    });
    return `$ ${total}`;
  };

  useEffect(() => {
    filteredData(selectedDate);
  }, [selectedDate, data]);

  return (
    <div className={styles.earningsContainer}>
      <div className={styles.revenuesHeader}>
        <div>
          <div className={styles.userName}>{data?.name}</div>
          <div className={styles.userEmail}>{data?.email}</div>
        </div>
        <TextInput
          label=" Select Date"
          placeholder="Select Date"
          type="date"
          value={selectedDate}
          setValue={setSelectedDate}
        />
        <div className={styles.revenueCards}>
          <RevenueCard
            title="Total Revenue"
            revenue={
              getTotalEarning()
              // data?.totalEarning
              //   ? parseFloat(data.totalEarning).toFixed(2)
              //   : "N/A"
            }
            icon={totalRevenueIcon}
          />

          {/* <RevenueCard
            title="Monthly Revenue"
            revenue="$25k"
            icon={monthlyRevenueIcon}
          /> */}
          <RevenueCard
            title="Total Clients"
            revenue={
              selectedData?.length
              // `${data?.totalClients}`
            }
            icon={clientsIcon}
          />
        </div>
      </div>

      <Table
        headings={[
          "Clients",
          // "Client Email",
          "Last Date Updated",
          "Commission Earned",
          "Contractor Share",
          "Actions",
        ]}
        componentTitle="Earnings"
        data={selectedData}
        column={[
          (element) => {
            return element[0];
          },
          (element) => {
            return element[2];
          },
          (element) => {
            return element[3];
          },
          (element) => {
            return element[4];
          },
        ]}
      />

      <div className={styles.earningsButtonWrapper}>{CSVBtn}</div>
    </div>
  );
};

export default Earnings;
