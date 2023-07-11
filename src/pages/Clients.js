import React, { useState, useEffect } from "react";
import styles from "../styles/Clients.module.css";

import {
  AddNewButton,
  Table,
  TextInput,
  Modal,
  SelectInput,
  Assignees,
} from "../components";
import { useDispatch } from "react-redux";
import { addClient, getClients, updateClient } from "../store/thunk/client.thunk";
import { useSelector } from "react-redux/es/hooks/useSelector";
import axios from "axios";

const Clients = () => {
  const assignedToOptions = useSelector(state => state.client.assignedTo)
  const data = useSelector(state => state.client.data)

  const [selectedOption, setSelectedOption] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [id, setId] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isEditted, setIsEditted] = useState({});
  const [createUpdateFlag, setCreateUpdateFlag] = useState(true)
  const dispatch = useDispatch()

  const validateForm = () => {
    const emailRegex = /^\S+@\S+\.\S+$/; // Regular expression for email format

    // Perform your validation checks here
    const isFirstNameValid = /^[a-zA-Z]+$/.test(firstName); // Check if firstName contains only letters
    const isLastNameValid = /^[a-zA-Z]+$/.test(lastName); // Check if lastName contains only letters
    const isEmailValid = emailRegex.test(email); // Check if email matches the email format
    // const isSelectedOptionValid = Object.keys(selectedOption).length > 0; // Check if selectedOption is not empty

    const isValid = isFirstNameValid && isLastNameValid && isEmailValid;
    setIsButtonDisabled(!isValid);
  };

  const addUpdateClient = () => {
    const assignee = [];
    selectedOption.forEach((x) => {
      assignee.push({ employee_id: x.key, employee_percentage: x.commission })
    })
    if (!createUpdateFlag) {
      dispatch(updateClient({ data: { f_name: firstName, l_name: lastName, email, assignee }, id: id }))
    } else {
      dispatch(addClient({ f_name: firstName, l_name: lastName, email, assignee }))
    }
  }
  useEffect(() => {
    dispatch(getClients());
    fetchEmployees();
  }, [])

  useEffect(() => {
    validateForm();
    if (Object.keys(isEditted).length) {
      setCreateUpdateFlag(false)
      const { f_name, l_name } = isEditted;
      setFirstName(f_name)
      setLastName(l_name)
      setEmail(isEditted['email'])
      setSelectedOption(isEditted['assignee']?.map((x => {
        const emp = employees.find(y => y._id === x.employee_id)
        return { key: emp._id, value: emp.f_name + " " + emp.l_name, commission: x.employee_percentage }
      })))
      setId(isEditted['_id'])
      setIsEditted("")
    }
  }, [firstName, lastName, email, selectedOption, isEditted]);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/employee`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      setEmployees(res?.data)
    } catch (error) {
      console.log('err', error);
    }
  }

  const getAssinees = (arr) => {
    let result = '';
    console.log(arr, 'arrarr');
    arr.forEach((x, i) => {
      const emp = employees.find(y => y._id === x.employee_id)
      result = result + ` ${emp?.f_name} ${emp?.l_name} ${arr.length === i + 1 ? '' : ','}`

    })
    return result
  }
  return (
    <div className={styles.clientsContainer}>
      <Modal modalTitle={"Client"} onClick={addUpdateClient} disable={false} createUpdateFlag={createUpdateFlag}>
        <TextInput
          label="First Name"
          star="*"
          placeholder="First Name"
          type="text"
          setValue={setFirstName}
          value={firstName}
        />
        <TextInput
          label="Last Name"
          star="*"
          placeholder="Last Name"
          type="text"
          setValue={setLastName}
          value={lastName}
        />
        <TextInput
          label="Email Address"
          star="*"
          placeholder="Email Address"
          type="email"
          value={email}
          setValue={setEmail}
        />
        <SelectInput setSelected={setSelectedOption} selected={selectedOption}>
          {employees?.map(option => <option value={option._id}>{option.f_name + " " + option.l_name}</option>)}
        </SelectInput>
        {selectedOption.map((option) => {
          return <Assignees key={option.key} option={option} setSelected={setSelectedOption} />
        })}

      </Modal>
      <AddNewButton
        title="Add New Client"
        onClick={() => {
          setCreateUpdateFlag(true)
          setSelectedOption([])
          setEmail("")
          setFirstName("")
          setLastName("")
          document.getElementById("modalId").click()
        }}
      />
      <Table
        headings={["Name", "Email", "Date", "Assigned To", "Actions"]}
        column={[`f_name`, 'email', 'date', (element) => { return getAssinees(element.assignee) }]}
        data={data}
        title="Edit"
        componentTitle="Clients"
        setIsEditted={setIsEditted}
      />
    </div>
  );
};

export default Clients;
