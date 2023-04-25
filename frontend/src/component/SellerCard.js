import React from 'react';
import Card from 'react-bootstrap/Card';

const SellerCard = ({ seller }) => {
  const { name, image, status } = seller;
  return (
    <>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{status}
        </Card.Text>
      </Card.Body>
    </>
  );
};

export default SellerCard;


