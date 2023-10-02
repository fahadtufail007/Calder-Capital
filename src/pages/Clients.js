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
import moment from 'moment';
import { getContractors } from "../store/thunk/contractor.thunk";

const Clients = () => {
  const assignedToOptions = useSelector(state => state.client.assignedTo)
  const data = useSelector(state => state.client.data)
  const employees = useSelector(state => state.contractor.data)

  const [selectedOption, setSelectedOption] = useState([]);
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
    const isFirstNameValid = /^[a-zA-Z0-9\s]+$/.test(firstName); // Check if firstName contains letters, number and spaces
    // const isLastNameValid = /^[a-zA-Z\s]+$/.test(lastName); // Check if lastName contains only letters
    // const isEmailValid = emailRegex.test(email); // Check if email matches the email format
    const isSelectedOptionValid = Object.keys(selectedOption).length > 0; // Check if selectedOption is not empty

    const isValid = isFirstNameValid && isSelectedOptionValid;
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
    dispatch(getContractors());
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
        const emp = employees?.find(y => y._id === x.employee_id)
        return { key: emp._id, value: emp.f_name + " " + emp.l_name, commission: x.employee_percentage }
      })))
      setId(isEditted['_id'])
      setIsEditted("")
    }
  }, [firstName, lastName, email, selectedOption, isEditted]);

  const getAssinees = (arr) => {
    let result = '';
    arr?.forEach((x, i) => {
      const emp = employees?.find(y => y._id === x.employee_id)
      result = result + ` ${emp?.f_name} ${emp?.l_name} ${arr.length === i + 1 ? '' : ','}`

    })
    return result
  }
  return (
    <div className={styles.clientsContainer}>
      <Modal modalTitle={"Client"} btnTitle={"Add Client"} onClick={addUpdateClient} disable={isButtonDisabled} createUpdateFlag={createUpdateFlag}>
        <TextInput
          label="Client Name"
          star="*"
          placeholder="Client Name"
          type="text"
          setValue={setFirstName}
          value={firstName}
        />
        {/* <TextInput
          label="Last Name"
          star="*"
          placeholder="Last Name"
          type="text"
          setValue={setLastName}
          value={lastName}
        /> */}
        {/* <TextInput
          label="Email Address"
          star="*"
          placeholder="Email Address"
          type="email"
          value={email}
          setValue={setEmail}
        /> */}
        <SelectInput setSelected={setSelectedOption} selected={selectedOption}>
          {employees?.map(option => <option key={option._id} value={option._id}>{option.f_name + " " + option.l_name}</option>)}
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
        headings={["Name", "Email", "Date updated", "Assigned To", "Actions"]}
        column={[
          `f_name`,
          'email',
          (element) => {
            return element?.updatedAt ? moment(element?.updatedAt).format('MMM DD, YYYY') : ''
          },
          (element) => { return getAssinees(element.assignee) }
        ]}
        data={data}
        title="Edit"
        componentTitle="Clients"
        setIsEditted={setIsEditted}
      />
    </div>
  );
};

export default Clients;
