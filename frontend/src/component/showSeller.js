import React, { useState, useEffect } from 'react';
import SellerCard from './SellerCard';
import ItemList from './items';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
const ShowSeller = () => {
  const [place, setplace] = useState(1)
  const [show, setshow] = useState(true)
  const [value, setvalue] = useState([])
  useEffect(() => {
    getdata()
  }, [])
  const getdata = async () => {
    let data = await fetch("/seller")
    data = await data.json()
    setvalue(data)
  }
  function handleclick(n) {
    setshow(false)
    setplace(n)
  }
  return (
    <>
      {show && (
        <>
          <h1>Sellers</h1>
          <Row xs={1} md={3} className="g-0 ">
            {value.map((seller, index) => (
              <Col key={index}>
                <Card className='carditem' style={{ width: '18rem' }}>
                  <SellerCard key={seller.id} seller={seller} />
                  <Card.Body>
                    <Button variant="outline-danger " size='lg' onClick={() => handleclick(index)}>OPEN</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>)}
      {!show && (
        <>
          {/* {place} */}
          <Button variant='dark' onClick={() => setshow(!show)}>BACK</Button>
          <ItemList curseller={value[place]} />
        </>
      )}
    </>
  );
};

export default ShowSeller;
