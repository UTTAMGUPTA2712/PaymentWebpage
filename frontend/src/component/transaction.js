import React from "react";
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import TransactionForm from "./transactionfile";
function Transaction() {
  
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")))
  const [amount,setamount] = useState( JSON.parse(localStorage.getItem("amount")))
  setInterval(()=>{
      if(JSON.parse(localStorage.getItem("amount"))!=amount)setamount(JSON.parse(localStorage.getItem("amount")))
  },1000) 
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
  },[amount])
  const getdata = async () => {
    let data = await fetch("/transaction/" + user[0])
    data = await data.json()
    setvalue(data)
    console.log(data)
  }  

  
    const downloadteansaction = () => {
      fetch(`/download/${user[0]}`)
        .then((response) => {
          // Create a Blob from the response
          return response.blob();
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${user[0]}Transactions.txt`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error("Error downloading file:", error);
        });
    };



  return (
    <>
      <div style={{border:"2px double aliceblue",borderRadius:"5px",padding:"3px" ,textAlign:"left"}}>
      <h1>BALANCE: $ {amount}</h1>
      
      <Button  variant="danger" id="addmoney" onClick={() => { setAddShow(true) }}>+ Add Money</Button>
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
          <Accordion.Header><h5>Transactions for {user[0]}: </h5>
          
          </Accordion.Header>
          <Accordion.Body>
            
      <button id="download" onClick={downloadteansaction}>⬇️Download</button>
            <Table responsive striped hover>
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
          <div id="tdbox">
            <p className="colorit">Successful Payment</p>
            <br/>
            <h1 id="tdamount">${data.amount}</h1></div>
            <br/>
          <h3 id="tdseller">Paid to :{data.seller}</h3>
          <p>on: {data.time}</p>
          <br/><br/><hr/>
          Reference Id: {data.id}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  );
}
export default Transaction
