import React from "react";
import { useForm } from "react-hook-form";
import { Form, Col, Button, Alert } from "react-bootstrap";
import { putFetch } from "../api/app";
export default function FormProductEdit({ product, requestProduct }) {
	const { register, handleSubmit } = useForm();
	const [isLoading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [message, setMessage] = React.useState(false);
	const onSubmit = (data) => {
		const obj = {
			quantity: parseInt(data.quantity),
			type: data.type,
			price: parseInt(data.price),
			name: data.name,
			available: data.available,
		};
		setLoading(true);

		putFetch(obj, `update/product/${data._id}`).then((resp) => {
			setLoading(false);
			console.log(resp);
			if (!resp.status) {
				setMessage(true);
				return setError(true);
			}
			setMessage(true);
			setError(false);
			requestProduct();
			setTimeout(() => {
				setMessage(false);
			}, 3000);
		});
	};
	return (
		<Form>
			{message &&
				(error ? (
					<Alert variant='danger'>
						Ha cocurrido un error,Por favor verifique sus datos que este
						correctos
					</Alert>
				) : (
					<Alert variant='success'>
						El producto de a editado cerrectamente!
					</Alert>
				))}

			<Form.Row>
				<Form.Group as={Col} controlId='formGridEmail'>
					<Form.Label>ID Producto</Form.Label>
					<Form.Control
						defaultValue={product._id}
						type='text'
						placeholder='ID Producto'
						name='_id'
						ref={register}
					/>
				</Form.Group>
			</Form.Row>
			<Form.Row>
				<Form.Group as={Col} controlId='formGridEmail'>
					<Form.Label>Nombre Producto</Form.Label>
					<Form.Control
						defaultValue={product.nameProduct}
						type='text'
						placeholder='Nombre Producto'
						name='name'
						ref={register}
					/>
				</Form.Group>

				<Form.Group as={Col} controlId='formGridEmail'>
					<Form.Label>Nombre Producto</Form.Label>
					<Form.Control
						defaultValue={product.type}
						type='text'
						placeholder='Nombre Producto'
						name='type'
						ref={register}
					/>
				</Form.Group>
			</Form.Row>

			<Form.Row>
				<Form.Group as={Col} controlId='formGridCity'>
					<Form.Label>Precio</Form.Label>
					<Form.Control
						type='number'
						placeholder='Precio'
						defaultValue={product.price}
						name='price'
						ref={register}
					/>
				</Form.Group>

				<Form.Group as={Col} controlId='formGridCity'>
					<Form.Label>Cantidad</Form.Label>
					<Form.Control
						type='number'
						placeholder='Cantidad'
						defaultValue={product.quantity}
						name='quantity'
						ref={register}
					/>
				</Form.Group>
			</Form.Row>
			<Form.Group controlId='formGridEmail'>
				<Form.Label>Nombre Producto</Form.Label>
				<Form.Control
					defaultValue={product.available}
					type='text'
					placeholder='Nombre Producto'
					name='available'
					ref={register}
				/>
			</Form.Group>
			<Button
				type='submit'
				variant='primary'
				disabled={isLoading}
				onClick={handleSubmit(onSubmit)}
			>
				{isLoading ? "Verificando..." : "Iniciar Sesion"}
			</Button>
		</Form>
	);
}
