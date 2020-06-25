import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getFetch } from "../api/app";
import NavBar from "./NavBar";
import TableProducts from "./TableProducts";
import Jumbotron from "./Jumbotron";
import { Modal, Spinner } from "react-bootstrap";
export default function Dashboard() {
	const history = useHistory();
	const [sessionID] = useState(sessionStorage.getItem("id"));
	const [isLoading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);

	const requestProduct = () => {
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
		requestProduct();
	}, []);
	return (
		<>
			<NavBar />
			<Jumbotron adminDate={sessionID} />
			{isLoading ? (
				products ? (
					<>
						<TableProducts
							products={products}
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
