import React,{useState} from "react";
import { Jumbotron, Button } from "react-bootstrap";
export default function JumBotron({sessionID}) {
  const [data, setDate] = useState(JSON.parse(sessionStorage.getItem('id')))
  return (
    <Jumbotron>
      <h1>Dashboard, LikedMe!</h1>
      <p>
      <label>Admin: </label >
         {data.firtsName}
      <p>
      <label>Matricula: </label >
         {data.enrollment}
      </p>
      </p>
      <p>
        <Button variant="primary">Perfl</Button>
      </p>
    </Jumbotron>
  );
}
