import React, { useState } from "react";
import axios from "axios";

import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const TransactionForm = () => {
  const balance = JSON.parse(localStorage.getItem("amount"))
  const [cardno, setcardno] = useState()
  const [cvv, setcvv] = useState()
  const [date, setdate] = useState()
  const [amount, setamount] = useState()
  const [show, setShow] = useState(false)
  function handleclick() {
    if (cardno && cvv && date && amount) {
      localStorage.setItem("amount", JSON.stringify(+balance + +amount))
      setShow(true)
      setcardno()
      setcvv()
      setdate()
      setamount()
      document.getElementById("myform").reset()
      setInterval(() => {
        window.location.reload()
      }, 2000)
    }
  }
  return (
    <>
      <ToastContainer position="top-end" className="p-3">
        <Toast bg="info" className="m-1 d-inline-block" onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">UPDATED</strong>
            <small>1sec ago</small>
          </Toast.Header>
          <Toast.Body>
            <p>Successfully added: {amount}</p>
            New Balance: <h5>{balance}</h5>

          </Toast.Body>
        </Toast>
      </ToastContainer>
      <div className="container">
        <div className="row">
          <div className="panel panel-default">
            <div className="panel-heading">
              <div className="row">
                <img className="img-responsive cc-img" src="http://www.prepbootstrap.com/Content/images/shared/misc/creditcardicons.png" />
              </div>
            </div>
            <div className="panel-body">
              <form role="form" id="myform">
                <div className="row">
                  <div className="col-xs-12">
                    <div className="form-group">
                      <label>CARD NUMBER</label>
                      <div className="input-group">
                        <input onChange={(e) => setcardno(e.target.value)} type="tel" className="form-control" placeholder="Valid Card Number" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-7 col-md-7">
                    <div className="form-group">
                      <label>EXPIRATION DATE</label>
                      <input onChange={(e) => setdate(e.target.value)} type="tel" className="form-control" placeholder="MM / YY" />
                    </div>
                  </div>
                  <div className="col-xs-5 col-md-5 pull-right">
                    <div className="form-group">
                      <label>CVV CODE</label>
                      <input onChange={(e) => setcvv(e.target.value)} type="tel" className="form-control" placeholder="CVV" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <div className="form-group">
                      <label>AMOUNT</label>
                      <input onChange={(e) => setamount(e.target.value)} type="number" className="form-control" placeholder="Amount to be added" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <br />
            <div className="panel-footer">
              <div className="row">
                <button onClick={handleclick} className="btn btn-warning btn-lg btn-block">Process payment</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionForm;
