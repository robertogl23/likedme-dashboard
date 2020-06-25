import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  Card,
  Button,
  Container,
  Col,
  Row,
  Form,
  Alert,
} from "react-bootstrap";
import { postFetch } from "../api/app";
export default function Login() {
  const { register, handleSubmit } = useForm();
  const [isLoading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState(false);
  const history = useHistory();
  const onSubmit = (data) => {
    setLoading(true);
    postFetch(data, "login/admin").then((resp) => {
      setLoading(false);
      if (!resp.status) {
        return setMessage(true);
      }
      sessionStorage.setItem("id", JSON.stringify(resp.adminDB));
      history.push("/dashboard");
    });
  };
  React.useEffect(() => {
    sessionStorage.removeItem("id")
  }, []);
  return (
    <Container style={{ marginTop: 60 }}>
      <Row>
        <Col>
          <Card>
            <Card.Header as="h5">LikedMe Admin</Card.Header>
            <Card.Body>
              <Card.Title>Login</Card.Title>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Admin enrollment </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enrollment"
                    name="enrollment"
                    ref={register}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    ref={register}
                  />
                </Form.Group>
              </Form>
              {message && (
                <Alert
                  variant="danger"
                  onClose={() => setMessage(false)}
                  dismissible
                >
                  <Alert.Heading>Oh ah corrido un error!</Alert.Heading>
                  <p>Porfavor verifique sus datos y vueva a inicia sesion.</p>
                </Alert>
              )}

              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                onClick={handleSubmit(onSubmit)}
              >
                {isLoading ? "Verificando..." : "Iniciar Sesion"}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
