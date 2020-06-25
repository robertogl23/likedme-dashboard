import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getFetch } from "../api/app";
import NavBar from "./NavBar";
import TableProducts from "./TableProducts";
import Jumbotron from "./Jumbotron";
import FormProductEdit from "./FormProductEdit";
import { Modal, Spinner, Button, Form, Row, Col } from "react-bootstrap";
export default function Dashboard() {
	const history = useHistory();
	const [sessionID] = useState(sessionStorage.getItem("id"));
	const [isLoading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [selectProduct, setSelectProduct] = useState([]);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleSelect = (p) => setSelectProduct(p);
	const requestProduct = (filter) => {
		getFetch("get/all/products").then((data) => {
			if (!data) {
				return;
			}
			setProducts(data.productsDB);
			setLoading(true);
		});
	};
	useEffect(() => {
		!sessionID && history.push("/");
		requestProduct("all");
	}, []);
	return (
		<>
			<NavBar />
			<Jumbotron />

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
					<Modal.Title>Modal title</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FormProductEdit
						product={selectProduct}
						requestProduct={requestProduct}
					/>
				</Modal.Body>
			</Modal>
			{isLoading ? (
				products ? (
					<>
						<TableProducts
							products={products}
							handleShow={handleShow}
							handleSelect={handleSelect}
							requestProduct={requestProduct}
						/>
					</>
				) : (
					<h>Error</h>
				)
			) : (
				<Spinner animation='border' role='status'>
					<span className='sr-only'>Loading...</span>
				</Spinner>
			)}
		</>
	);
}
