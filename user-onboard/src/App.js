import React, { useState, useEffect, useDebugValue } from 'react';
import './App.css';
import axios from "axios"
import Form from './components/Form'
import * as yup from "yup"
import schema from './validation/formSchema'


const initialFormValues = {
  name: '',
  email: '',
  password: '',
  terms: false,
}

const initialUsers = [];

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  terms: '',
}

function App() {

  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [initialErr, setInitialErr] = useState(initialFormErrors);

  const getUsers = () => {
  axios.get("https://reqres.in/api/users")
  .then((res) => {
    setUsers(res.data.data);
  }) .catch((err) => {
    debugger
    alert("😣 Uh Ohh 😣")
  })
}

  const postNewUser = (newUser) => {

    axios.post("https://reqres.in/api/users", newUser)
    .then((res) => {
      setUsers([res.data.data, ... users]);
      setFormValues(initialFormValues);
    }) .catch((err) => {
      debugger 
      alert("🥔 NOT THIS AGAIN 🥔")
    })
  }

  useEffect(() => {
    getUsers();
  }, []);

  const updateForm = (inputName, inputValue) => {
    setFormValues({
      ...formValues,
      [inputName]: inputValue,
    })
  }

  const submitForm = () => {
    let newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: formValues.terms
    }
    setUsers([...users, newUser]);
    setFormValues(initialFormValues);
  }
  
  const inputChange = (name, value) => {
    
    yup
    .reach(schema, name)
    .validate(value)
    .then(() => {
      setInitialErr({
        ...initialErr,
        [name]: ''
      })
    })
    .catch((err) => {
      setInitialErr({
        ...initialErr,
      [name]: err.errors[0],
      })
    })

    setFormValues({
      ...formValues,
      [name]: value,
    })
  };

  return (
    <>
      <Form
        values={formValues}
        update={inputChange}
        submit={submitForm}
        errors={initialErr}
      />
    
    </>
  );
}


export default App;
