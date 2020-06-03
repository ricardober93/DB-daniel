import React from "react";
import { useFirebase } from "react-redux-firebase";
import { Card, Form, Button, Container, Row, Col, Alert  } from "react-bootstrap";
import { useForm } from "react-hook-form";

export default function Login() {
  const firebase = useFirebase();
  const { register, handleSubmit, watch, errors } = useForm();

  
  const onSubmit = data => console.log(data);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={10} md={8} lg={6}>
          <Card>
            <Card.Body>
              <Form  onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>usuario</Form.Label>
                  <Form.Control name="email" ref={register({ required: true })} type="email" placeholder="Usuario" />
                  <Form.Text className="text-muted">
                  {errors.email && <Alert variant="danger">Este campo es requerido</Alert>}
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control name="password" ref={register} type="password"  />
                  <Form.Text className="text-muted">
                  {errors.password && <Alert variant="danger">Este campo es requerido</Alert>}
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Iniciar sesión
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
