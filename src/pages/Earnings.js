import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import styles from "../styles/Earnings.module.css";
import { Button, RevenueCard, Table } from "../components";

import totalRevenueIcon from "../assets/svgs/total-revenue-icon.svg";
import monthlyRevenueIcon from "../assets/svgs/monthly-revenue-icon.svg";
import clientsIcon from "../assets/svgs/avatar-icon.svg";
import { getClients } from "../store/thunk/client.thunk";
import { getEarnings } from "../store/thunk/earning.thunk";

const Earnings = () => {

  const dispatch = useDispatch();
  const { data } = useSelector(state => state.earning);
  const clients = useSelector(state => state.client.data)

  useEffect(() => {
    dispatch(getClients());
    dispatch(getEarnings());
  }, [])

  const getClientData = (id) => {
    const client = clients?.find((x) => x._id == id);
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

  console.log(data, data?.earnings, 'data');

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
            revenue={`${data?.totalEarning}`}
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
          "Employee Share",
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
            return `$ ${element.employeeAmount}`
          },
          (element) => {
            return `${element.employeeShare} %`
          },
        ]}
        title="Download"
      />
      <div className={styles.earningsButtonWrapper}>
        <Button title="Download in CSV" radius="16px" size="13px" />
      </div>
    </div>
  );
};

export default Earnings;
