import React from 'react'
import { useForm } from "react-hook-form";
import {postFetch} from '../api/app'
import { Form, Col, Button, Alert } from "react-bootstrap";
export default function FormProductAdd({requestProduct}) {
    const { register, handleSubmit } = useForm();
	const [isLoading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState(false);
    const [error, setError] = React.useState(false);
	const onSubmit = (data) => {
		
		postFetch(data,'add/product').then(resp => {
            setLoading(false);
			if (!resp.status) {
                setError(true)
				return setMessage(true);
            }
			requestProduct();
            setError(false)
			setMessage(true);
			setTimeout(() => {
				setMessage(false);
			}, 3000);
        })
	};
	return (
		<Form>
			{message &&
				(error ? (
					<Alert variant='danger'>
						No se a podido crear el producto, Por favor verifique los datos
					</Alert>
				) : (
					<Alert variant='success'>
						El producto se a creado cerrectamente!
					</Alert>
				))}
			<Form.Row>
				<Form.Group as={Col} controlId='formGridEmail'>
					<Form.Label>Nombre Producto</Form.Label>
					<Form.Control
						type='text'
						placeholder='Nombre Producto'
						name='name'
						ref={register}
					/>
				</Form.Group>

				<Form.Group as={Col} controlId='formGridEmail'>
					<Form.Label>Tipo de Producto</Form.Label>
					<Form.Control
						type='text'
						placeholder='Tipo Producto'
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
						name='price'
						ref={register}
					/>
				</Form.Group>

				<Form.Group as={Col} controlId='formGridCity'>
					<Form.Label>Cantidad</Form.Label>
					<Form.Control
						type='number'
						placeholder='Cantidad'
						name='quantity'
						ref={register}
					/>
				</Form.Group>
			</Form.Row>
			<Form.Group controlId='formGridEmail'>
				<Form.Label>Disponible</Form.Label>
				<Form.Control
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
