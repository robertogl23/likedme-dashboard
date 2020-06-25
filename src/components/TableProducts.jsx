import React from "react";
import { Table, Button } from "react-bootstrap";
export default function TableProducts({ products, handleShow, handleSelect }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre producto</th>
          <th>Tipo</th>
          <th>Catidad</th>
          <th>Precio</th>
          <th>Disponible</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p, i) => (
          <tr key={i}>
            <td>{p.nameProduct}</td>
            <td>{p.type}</td>
            <td>{p.quantity}</td>
            <td>{p.price} USD</td>
            <td>Si</td>
            <td>
              <>
                <Button
                  variant="info"
                  onClick={() => {
                    handleShow();
                    handleSelect(p);
                  }}
                >
                  Editar
                </Button>{" "}
                <Button variant="danger">Eliminar</Button>{" "}
              </>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
