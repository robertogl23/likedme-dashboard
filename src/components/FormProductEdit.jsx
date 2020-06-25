import React from "react";
import { useForm } from "react-hook-form";
import { Form, Col, Button, Alert } from "react-bootstrap";
import { putFetch } from "../api/app";
export default function FormProductEdit({ product, requestProduct }) {
	const { register, handleSubmit } = useForm();
	const [isLoading, setLoading] = React.useState(false);
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
			if (!resp.status) {
				return setMessage(true);
			}
			setMessage(true);
			requestProduct();
			setTimeout(() => {
				setMessage(false);
			}, 3000);
		});
	};
	return (
		<Form>
			{message && (
				<Alert variant='success'>This is a alert—check it out!</Alert>
			)}

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
