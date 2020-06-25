import React, { useState,useEffect } from "react";
import FormProductEdit from "./FormProductEdit";
import FormProductAdd from "./FormProductAdd";
import { Table, Button, Alert, Row, Col, Form,Modal} from "react-bootstrap";
import { delateFetch,getFetch } from "../api/app";
import { useForm } from "react-hook-form";
export default function TableProducts({
	products,
	requestProduct,
}) {
	const [message, setMessage] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [filterProducts, setFilterProducts] = useState([]);
	const [selectProduct, setSelectProduct] = useState([]);
	const [show, setShow] = useState(false);
	const [typeModal, setTypeModal] = useState(false);
	const [error, setError] = React.useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleSelect = (p) => setSelectProduct(p);
	const handleTypeModalAdd = () => setTypeModal(true);
	const handleTypeModalEdit = () => setTypeModal(false);
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
	const upDate = () => {
		getFetch("get/all/products").then((data) => {
			if (!data) {
				return;
			}
			requestProduct()
			setFilterProducts(data.productsDB);
		});
	};
	const delateProduct = (id) => {
		setLoading(true);
		delateFetch(`dalate/product/${id}`).then((resp) => {
			if (!resp) {
				setError(true)
				return setMessage(true);
			}
			upDate()
			setLoading(false)
			setMessage(true);
			setTimeout(() => {
				setMessage(false);
			}, 3000);
			
		});
	};

	useEffect(() => {
		setFilterProducts(products)
	},[])
	return (
		<>
			{message &&
				(error ? (
					<Alert variant='danger'>
						No se a podido borrar el producto, Por favor verifique los datos
					</Alert>
				) : (
					<Alert variant='success'>
						El producto se a borrado cerrectamente!
					</Alert>
				))}
			<Modal
				show={show}
				onHide={handleClose}
				backdrop='static'
				keyboard={false}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>
						{!typeModal ? "Editar Producto" : "Agregar Producto"}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{!typeModal ? (
						<FormProductEdit
							product={selectProduct}
							requestProduct={upDate}
						/>
					) : (
						<FormProductAdd requestProduct={upDate} />
					)}
				</Modal.Body>
			</Modal>
			<div>
				<Row>
					<Col>
						<Button
							variant='success'
							style={{ marginBottom: 15, marginLeft: 16 }}
							onClick={() => {
								handleTypeModalAdd();
								handleShow();
							}}
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
											handleTypeModalEdit()
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
