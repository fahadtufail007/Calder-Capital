import React, { useState, useEffect } from "react";
import moment from 'moment';
import Select from 'react-select';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { CSVLink } from "react-csv";
import { toast } from 'react-toastify';
import {
  AddNewButton,
  Table,
  Button,
  TextInput,
  Modal,
  Assignees,
} from "../components";
import styles from "../styles/Payments.module.css";
import { addPayment, getPayments, updatePayment, getCsvDataPayment } from "../store/thunk/payment.thunk";
import { formatDate } from "../util/helper";
import { getContractors } from "../store/thunk/contractor.thunk";
import { getClients } from "../store/thunk/client.thunk";

const Payments = () => {
  const dispatch = useDispatch()
  const options = [];
  const payments = useSelector(state => state.payment.payments)
  const clients = useSelector(state => state.client.data)
  const employees = useSelector(state => state.contractor.data)
  const { csvData } = useSelector(state => state.payment);
  clients?.forEach(element => {
    options.push({ value: element._id, label: `${element.f_name} ${element.l_name}` })
  });
  const headers = [
    { label: 'Client Name', key: 'name' },
    { label: 'Date Range', key: 'dateRange' },
    { label: 'Payment', key: 'payment' },
    { label: 'Employee Detail', key: 'employeeDetail' }
  ];

  const [id, setId] = useState("")
  const [isEditted, setIsEditted] = useState({});
  const [selectedOption, setSelectedOption] = useState([]);
  const [clientId, setClientId] = useState("")
  const [dateStart, setDateStart] = useState()
  const [showStartDate, setShowStartDate] = useState("")
  const [showEndDate, setShowEndDate] = useState("")
  const [dateEnd, setDateEnd] = useState()
  const [payment, setPayment] = useState()
  const [createUpdateFlag, setCreateUpdateFlag] = useState(true)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [formEdit, setFormEdit] = useState(false)
  const [showClient, setShowClient] = useState('');

  useEffect(() => {
    const date = {
      startDate: showStartDate,
      endDate: showEndDate
    }
    dispatch(getPayments(date));
    dispatch(getCsvDataPayment(date))
  }, [showEndDate, showStartDate])

  useEffect(() => {
    dispatch(getClients());
    dispatch(getContractors());
  }, [])

  useEffect(() => {
    setSelectedOption([]);
    getEmployees(clientId)
  }, [clientId])

  useEffect(() => {
    validateForm();
    if (Object.keys(isEditted).length) {

      setCreateUpdateFlag(false)
      setFormEdit(true);
      const { dateStart, dateEnd, assignee } = isEditted;
      setShowClient(getClientName(clientId));
      setDateStart(formatDate(dateStart))
      setDateEnd(formatDate(dateEnd))
      setClientId(isEditted['clientId'])
      setPayment(Number(isEditted['payment']))
      setIsEditted("")
      setId(isEditted['_id'])
      setSelectedOption([]);
      assignee.map((x) => {
        setSelectedOption((prevState) => {
          const employee = employees.find(employee => employee._id === x.employee_id)
          return [
            ...prevState,
            {
              key: x.employee_id,
              value: `${employee.f_name} ${employee.l_name}`,
              commission: x.employee_percentage,
            },
          ];
        });
      })
    }
  }, [clientId, dateStart, dateEnd, selectedOption, isEditted]);

  const getEmployees = (clientId) => {
    const client = clients?.find(client => client._id === clientId);
    if (client) {
      client?.assignee.map((x) => {
        setSelectedOption((prevState) => {
          const employee = employees.find(employee => employee._id === x.employee_id)
          return [
            ...prevState,
            {
              key: x.employee_id,
              value: `${employee.f_name} ${employee.l_name}`,
              commission: x.employee_percentage,
            },
          ];
        });
      })

    }
  }

  const handleAddPayment = () => {
    const assignee = [];
    selectedOption.forEach((x) => {
      assignee.push({ employee_id: x.key, employee_percentage: x.commission })
    })
    if (!createUpdateFlag) {
      dispatch(updatePayment({ data: { clientId, dateStart, dateEnd, payment, assignee }, id: id }))
    } else {
      dispatch(addPayment({ clientId, dateStart, dateEnd, payment, assignee }))
    }

    resetStates();
  }

  const validateForm = () => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Regular expression for yyyy-mm-dd format
    const paymentRegex = /^\d+(\.\d+)?$/;

    const isValidStartDate = dateRegex.test(dateStart);
    const isValidEndDate = dateRegex.test(dateEnd);
    const isValidPayment = paymentRegex.test(payment);
    const isValidName = clientId !== ''

    // const areOptionsSelected = selectedOption.length > 0;
    const isStartDateBeforeEndDate = isValidStartDate && isValidEndDate && new Date(dateStart) < new Date(dateEnd);
    const isValid = (isValidName && isStartDateBeforeEndDate && isValidPayment);
    setIsButtonDisabled(!isValid);
  };

  const getClientName = (id) => {
    const client = clients?.find((x) => x._id == id);
    if (client) {
      return `${client.f_name} ${client.l_name}`;
    } else {
      return "";
    }
  };

  const getEmpName = (id) => {
    const emp = employees?.find((x) => x._id === id);
    if (emp) {
      return `${emp.f_name}`;
    } else {
      return "";
    }
  };

  const renderEmployeeList = (assignees) => {
    return (
      assignees.map((assignee) => (
        <div key={assignee.employee_id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 5 }}>
          <span>{getEmpName(assignee.employee_id)}</span>
          <span>{assignee.employee_percentage}%</span>
        </div>
      ))
    );
  };

  const renderEmployeeAmount = (assignees, payment) => {
    return (
      assignees?.map((assignee) => (
        <div key={assignee?.employee_id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
          <span>{((assignee?.employee_percentage / 100) * payment).toFixed(2)} USD</span>
        </div>
      ))
    );
  };

  const getFormatedDate = (date) => {
    return date ? moment(date).format('DD MMM, YYYY') : ''
  }

  const resetStates = () => {
    setClientId('')
    setPayment('')
    setDateEnd('')
    setShowClient('')
    setDateStart('')
    setSelectedOption([]);
  }

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      // width: 300, // Set your desired width
      minHeight: 45, // Set your desired height
    }),
  };

  function noPaymentMsg() {
    toast("No payment found", { type: "error" })
  }
  function paymentSucessMsg() {
    toast("Cvs downloaded successfully", { type: "success" })
  }
  let CSVBtn;
  if (Array.isArray(csvData) && csvData.length > 0) {
    const csvFilename = "payment " + (showStartDate ? "from " + showStartDate : "") + (showEndDate ? " to " + showEndDate : "");
    CSVBtn = <CSVLink data={csvData} headers={headers} filename={csvFilename}>
      <Button title="Download in CSV" radius="16px" size="13px" onClick={paymentSucessMsg} />
    </CSVLink>
  } else {
    CSVBtn = <Button title="Download in CSV" radius="16px" size="13px" onClick={noPaymentMsg} />
  }

  return (
    <div className={styles.paymentsContainer}>
      <Modal modalTitle="Payment" disable={isButtonDisabled} onClick={handleAddPayment} createUpdateFlag={createUpdateFlag}>
        <Select
          className={styles.reactSelectSingle}
          styles={customStyles}
          label="Client Name"
          placeholder={formEdit ? showClient : "Client Name"}
          onChange={(e) => {
            setClientId(e.value)
          }}
          isSearchable={true}
          required
          name="Client Name"
          options={formEdit ? [] : options}
          value={formEdit ? showClient : undefined}
        />
        <TextInput
          label="Payment"
          star="*"
          placeholder="Payment"
          type="number"
          value={payment}
          setValue={setPayment} />
        <TextInput
          label="Date Range"
          star="*"
          placeholder="Start Date"
          type="date"
          value={dateStart}
          setValue={setDateStart}
        />
        <TextInput
          label="Date Range"
          star="*"
          placeholder="End Date"
          type="date"
          value={dateEnd}
          setValue={setDateEnd}
        />
        {selectedOption.map((option) => {
          return <Assignees key={option.key} option={option} setSelected={setSelectedOption} disableCrossIcon />
        })}

      </Modal>
      <div className={styles.paymentHeader}>
        <div className={styles.dateRanger}>
          <TextInput
            label=" Start Date"
            placeholder="Start Date"
            type="date"
            value={showStartDate}
            setValue={setShowStartDate}
          />
          <TextInput
            label="End Date"
            placeholder="End Date"
            type="date"
            value={showEndDate}
            setValue={setShowEndDate}
          />
        </div>
        <AddNewButton
          title="Add New Payment"
          onClick={() => {
            setFormEdit(false);
            resetStates();
            setCreateUpdateFlag(true)
            document.getElementById("modalId").click()
          }}
        />
      </div>
      <Table
        headings={[
          "Client Name",
          "Date Range",
          "Payment",
          "Employee Detail",
          "Amount",
          "Actions",
        ]}
        column={[
          (element) => getClientName(element?.clientId),
          (element) => `${getFormatedDate(element.dateStart)} -- ${getFormatedDate(element.dateEnd)}`,
          (element) => parseFloat(element.payment).toFixed(2),
          (element) => renderEmployeeList(element?.assignee),
          (element) => renderEmployeeAmount(element?.assignee, element?.payment),
        ]}

        data={payments}
        title="Edit"
        componentTitle="Payments"
        setIsEditted={(e) => {
          setClientId(e.clientId)
          setIsEditted(e);
        }}
      />
      <div className={styles.paymentButtonWrapper}>
        {CSVBtn}
      </div>
    </div>
  );
};

export default Payments;
