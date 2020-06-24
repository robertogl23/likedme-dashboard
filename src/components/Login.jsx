import React from "react";
import { Card, Button, Container, Col, Row, Form } from "react-bootstrap";
export default function Login() {
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
                  <Form.Control type="text" placeholder="Enrollment" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
              </Form>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
