import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


const ItemList = ({ curseller }) => {
  const [userdata, setuserdata] = useState(JSON.parse(localStorage.getItem("amount")))
  const [items, setitem] = useState(curseller.item)
  const name = JSON.parse(localStorage.getItem("user"))
  const [counts, setCounts] = useState(items.map(() => 0));
  const [show, setShow] = useState(false)

  // const [value, setValue] = useState();
  const handleIncrement = (index) => {
    setCounts((prevCounts) => {
      const updatedCounts = [...prevCounts];
      updatedCounts[index] += 1;
      return updatedCounts;
    });
  };
  const handleDecrement = (index) => {
    setCounts((prevCounts) => {
      const updatedCounts = [...prevCounts];
      if (updatedCounts[index] > 0) {
        updatedCounts[index] -= 1;
      }
      return updatedCounts;
    });
  };

  const handleSubmit = async () => {
    let amount = 0;
    for (let i = 0; i < items.length; i++) {
      amount += items[i].price * counts[i];
    }
    console.log('Total Price:', amount);
    if (amount <= userdata && amount != 0) {
      window.location.reload()
      localStorage.setItem("amount", JSON.stringify(userdata - amount))
      let seller = curseller.name
      let user = name[0]
      // setCounts(items.map(()=>0))
      await fetch("/transaction", {
        method: "post",
        body: JSON.stringify({ user, seller, amount }),
        headers: { "Content-Type": "application/json" }
      })
    } else if (amount != 0) {
      setShow(true)
    }
  };

  return (
    <div id='item'>
      <h1>Item List</h1>
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Balance is less</strong>
            <small>1sec ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're dont have this much balance</Toast.Body>
        </Toast>
      </ToastContainer>
      <Table bgcolor='white' striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ITEM NAME</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr className="table-info" key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>
                <Button variant='success' onClick={() => handleIncrement(index)}>+</Button>
                <span className='piece'>{counts[index]}</span>
                <Button variant='danger' onClick={() => handleDecrement(index)}> ~ </Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button id='submit' size='lg' variant='outline-warning' onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default ItemList;
