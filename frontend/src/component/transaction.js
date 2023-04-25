import React from "react";
import { useState, useEffect } from 'react';
// import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import TransactionForm from "./transactionfile";
function Transaction() {
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")))
  const amount = JSON.parse(localStorage.getItem("amount"))
  const [show, setShow] = useState(false);
  const [addshow, setAddShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setAddShow(false)
  }
  const [data, setdata] = useState({ "transactionid": 0, "seller": "", "amount": 0, "time": "", "id": "" })
  const [value, setvalue] = useState([])
  useEffect(() => {
    getdata()
  }, [])
  const getdata = async () => {
    let data = await fetch("/transaction/" + user[0])
    data = await data.json()
    setvalue(data)
    console.log(data)
  }
  return (
    <>
      <h1>BALANCE: $ {amount}</h1>
      <Button variant="danger" id="addmoney" onClick={() => { setAddShow(true) }}>+ Add Money</Button>
      <Modal show={addshow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Money in You Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TransactionForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <br />
      <Accordion bgcolor="yellow">
        <Accordion.Item eventKey="0">
          <Accordion.Header><h5>Transactions for {user[0]}: </h5></Accordion.Header>
          <Accordion.Body>
            
            <Table  striped hover>
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Seller</th>
                  <th>Credited</th>
                  <th>Timestamp</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {value.map((transaction, index) => (
                  <tr className="table-primary" key={transaction.transaction_id}>
                    <td>{index + 1}</td>
                    <td>{transaction.seller}</td>
                    <td>${transaction.amount.toFixed(2)}</td>
                    <td>{transaction.createdAt}</td>
                    <td><Button 
                      onClick={() => {
                        setShow(true);
                        setdata({ "transactionid": index + 1, "seller": transaction.seller, "amount": transaction.amount, "time": transaction.createdAt, "id": transaction._id })
                      }}>VIEW</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <hr />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>${data.amount}</h1>
          <h3>Paid to :{data.seller}</h3>
          <p>on: {data.time}</p>
          reference: {data.id}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Transaction