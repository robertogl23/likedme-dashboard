import React, { useState } from "react";
import { Table, Button, Alert, Row, Col, Form } from "react-bootstrap";
import { delateFetch } from "../api/app";
import { useForm } from "react-hook-form";
export default function TableProducts({
	products,
	handleShow,
	handleSelect,
	requestProduct,
}) {
	const [message, setMessage] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [filterProducts, setFilterProducts] = useState(products);
	const { register, handleSubmit } = useForm();
	const filterProductsFunction = (data) => {
		switch (data.filter) {
			case "yt":
				setFilterProducts(products.filter((e) => e.type === "Youtube"));
				break;
			case "fb":
				setFilterProducts(products.filter((e) => e.type === "Facebook"));
				break;
			case "i":
				setFilterProducts(products.filter((e) => e.type === "Instagram"));
				break;
			case "t":
				setFilterProducts(products.filter((e) => e.type === "Twitter"));
				break;
			case "tt":
				setFilterProducts(products.filter((e) => e.type === "Tik-Tok"));
				break;
			case "all":
				setFilterProducts(products);
				break;

			default:
				setFilterProducts(products);
				break;
		}
	};
	const onSubmit = (data) => filterProductsFunction(data);
	const delateProduct = (id) => {
		setLoading(true);
		delateFetch(`dalate/product/${id}`).then((resp) => {
			if (!resp) {
				return;
			}
			setMessage(true);
			requestProduct();
			setLoading(false);
		});
	};
	return (
		<>
			{message && (
				<Alert variant='success'>This is a alert—check it out!</Alert>
			)}
			<div>
				<Row>
					<Col>
						<Button
							variant='success'
							style={{ marginBottom: 15, marginLeft: 16 }}
						>
							Agregar producto
						</Button>
					</Col>
					<Col style={{ marginRight: 16 }}>
						<Form.Control
							as='select'
							name='filter'
							onChange={handleSubmit(onSubmit)}
							ref={register}
						>
							<option value='all'>Default</option>
							<option value='yt'>Youtube</option>
							<option value='fb'>Facebook</option>
							<option value='i'>Instagram</option>
							<option value='t'>Twitter</option>
							<option value='tt'>Tik-Tok</option>
						</Form.Control>
					</Col>
				</Row>
			</div>
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
					{filterProducts.map((p, i) => (
						<tr key={i}>
							<td>{p.nameProduct}</td>
							<td>{p.type}</td>
							<td>{p.quantity}</td>
							<td>{p.price} USD</td>
							<td>Si</td>
							<td>
								<>
									<Button
										variant='info'
										onClick={() => {
											handleShow();
											handleSelect(p);
										}}
									>
										Editar
									</Button>{" "}
									<Button
										variant='danger'
										disabled={isLoading}
										onClick={() => {
											delateProduct(p._id);
										}}
									>
										{isLoading ? "Eliminando..." : "Eliminar"}
									</Button>{" "}
								</>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
}
