import React from 'react';
import Image from "react-bootstrap/Image"
import Card from 'react-bootstrap/Card';

function UserDetail() {
  const user = JSON.parse(localStorage.getItem("user"));
  const getdata = async () => {
    let data = await fetch("/user")
    data = await data.json()
  }
  console.log(getdata)
  if (!user[0]) {
    return <div>{user}Loading...</div>;
  }
  return (
    <>
      <Image className='logo' src='https://imgs.search.brave.com/R7UjEg-dsbtjAVOxwIgpvdqguoV-wOfBurRPhXSg40E/rs:fit:800:500:1/g:ce/aHR0cHM6Ly8xMDAw/bWFyY2FzLm5ldC93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMS8w/Ni9QYXltZW50LUNl/bnRlci1Mb2dvLTgw/MHg1MDAucG5n' />
      <br />
      <Card id='details'>
        <Card.Img id='userpic' variant="top" src="https://imgs.search.brave.com/G0_E1YCiOBe_kZUmWBCZwYqjNlOLyndU9P0Atdltt0g/rs:fit:353:400:1/g:ce/aHR0cHM6Ly93d3cu/cG5na2l0LmNvbS9w/bmcvZnVsbC8yNS0y/NTg2OTRfY29vbC1h/dmF0YXItdHJhbnNw/YXJlbnQtaW1hZ2Ut/Y29vbC1ib3ktYXZh/dGFyLnBuZw" />
        <Card.Body>
          <Card.Title>{user[0]}</Card.Title>
          <Card.Text>
            Username: {user[2]}
            <br />
            Email: {user[1]}
          </Card.Text>
        </Card.Body>
      </Card>
      <div id='mydetail'>Made by <a id='link' href='https://github.com/UTTAMGUPTA2712' target="_blank">@uttam_gupta</a></div>
    </>
  );
};
export default UserDetail;
