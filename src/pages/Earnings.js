import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CSVLink } from 'react-csv';

import styles from '../styles/Earnings.module.css';
import { Button, RevenueCard, Table, TextInput } from '../components';

import totalRevenueIcon from '../assets/svgs/total-revenue-icon.svg';
// import monthlyRevenueIcon from "../assets/svgs/monthly-revenue-icon.svg";
import clientsIcon from '../assets/svgs/avatar-icon.svg';
import { getEarnings } from '../store/thunk/earning.thunk';
import { toast } from 'react-toastify';

const Earnings = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.earning);
  const [selectedDate, setSelectedDate] = useState();
  const headers = [
    'Clients',
    // 'Clients Email',
    'Last Date Updated',
    'Commission Earned',
    'Employee Share',
  ];

  useEffect(() => {
    const params = ''
    dispatch(getEarnings({ userId, params }));
  }, []);

  const currentDate = new Date();

  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  const year = currentDate.getFullYear();

  const formattedDate = `${month}-${day}-${year}`;
  const fileName = data?.name + '  ' + formattedDate;

  function noPaymentMsg() {
    toast('No payment found', { type: 'error' });
  }

  function paymentSucessMsg() {
    toast('Cvs downloaded successfully', { type: 'success' });
  }

  let CSVBtn;
  if (Array.isArray(data?.data) && data?.data.length > 0) {
    CSVBtn = (
      <CSVLink
        data={data?.data}
        headers={headers}
        onClick={paymentSucessMsg}
        filename={fileName}
      >
        <Button title='Download in CSV' radius='16px' size='13px' />
      </CSVLink>
    );
  } else {
    CSVBtn = (
      <Button
        title='Download in CSV'
        radius='16px'
        size='13px'
        onClick={noPaymentMsg}
      />
    );
  }

  function getDaysInMonth(year, month) {
    // JavaScript months are 0-indexed, so January is 0 and December is 11
    const lastDayOfMonth = new Date(year, month + 1, 0);
    return lastDayOfMonth.getDate();
  }
  function getDateRange(dateString) {
    const currentDate = new Date(dateString);
    const startDate = new Date(currentDate);
    const endDate = new Date(startDate);

    if (currentDate.getDate() >= 16) {
      startDate.setDate(16);
      const daysInMonth = getDaysInMonth(
        startDate.getFullYear(),
        startDate.getMonth()
      );
      endDate.setDate(daysInMonth);
    } else {
      startDate.setDate(1);
      endDate.setDate(15);
    }

    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    return [formattedStartDate, formattedEndDate];
  }

  useEffect(() => {
    if (selectedDate) {
      const datesArray = getDateRange(selectedDate);
      const params = `startDate=${datesArray[0]}&endDate=${datesArray[1]}`;
      dispatch(getEarnings({ userId, params }));
    }
  }, [selectedDate]);

  return (
    <div className={styles.earningsContainer}>
      <div className={styles.revenuesHeader}>
        <div>
          <div className={styles.userName}>{data?.name}</div>
          <div className={styles.userEmail}>{data?.email}</div>
        </div>
        <TextInput
          label=' Select Date'
          placeholder='Select Date'
          type='date'
          value={selectedDate}
          setValue={setSelectedDate}
        />
        <div className={styles.revenueCards}>
          <RevenueCard
            title='Total Revenue'
            revenue={
              data.totalEarnings?.toFixed(2)
              // getTotalEarning()
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
            title='Total Clients'
            revenue={
              // data?.data?.length
              data?.uniqueClients
            }
            icon={clientsIcon}
          />
        </div>
      </div>

      <Table
        headings={[
          'Clients',
          // "Client Email",
          'Last Date Updated',
          'Commission Earned',
          'Contractor Share',
          'Actions',
        ]}
        componentTitle='Earnings'
        data={data?.data}
        column={[
          (element) => {
            return element[0];
          },
          (element) => {
            return element[1];
          },
          (element) => {
            return element[2];
          },
          (element) => {
            return element[3];
          },
        ]}
      />

      <div className={styles.earningsButtonWrapper}>{CSVBtn}</div>
    </div>
  );
};

export default Earnings;
