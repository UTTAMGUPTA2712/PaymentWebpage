import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import Image from "react-bootstrap/Image"

function Login() {
  localStorage.removeItem("user")
  localStorage.removeItem("amount")
  const [validated, setValidated] = useState(false);
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [username, setuname] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      localStorage.setItem("user", JSON.stringify([name, email, username]))
      localStorage.setItem("amount", JSON.stringify(0))
      await fetch("/user", {
        method: "post",
        body: JSON.stringify({ name, email, username }),
        headers: { "Content-Type": "application/json" }
      },
        navigate('./mainpage')
      )
    }
    setValidated(true);
  };
  return (
    <>
      <div>
      <Image id='loginlogo' src='https://imgs.search.brave.com/R7UjEg-dsbtjAVOxwIgpvdqguoV-wOfBurRPhXSg40E/rs:fit:800:500:1/g:ce/aHR0cHM6Ly8xMDAw/bWFyY2FzLm5ldC93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMS8w/Ni9QYXltZW50LUNl/bnRlci1Mb2dvLTgw/MHg1MDAucG5n' />
      <Form id='form' noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className='form-group' controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              onChange={(e) => setname(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='form-group' controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='form-group' controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
                onChange={(e) => setuname(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group className='form-group' controlId="validationCustomEmail">
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation>
              <Form.Control type="email" placeholder="Email"
                onChange={(e) => setemail(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Email ID.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <br />
          <Form.Group >
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group><br />
          <Button type="submit">Submit form</Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
