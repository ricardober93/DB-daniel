import React, {  } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Alert, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useFirestore } from 'react-redux-firebase'


export default function NuevoPozo() {
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();
  const firestore = useFirestore()

  const onSubmit = (data, e) => {
      e.preventDefault()
      return firestore.collection('Pozos').add(data).then( ()=> history.push("/"))
    }

  return (
    <Container>
      <Link to="/">
        <FontAwesomeIcon size="2x"   icon={faArrowCircleLeft} />
      </Link>

      <Row className="mt-3 justify-content-md-center mb-4 ">
        <Col  lg="8">
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                    <Form.Label>ID Pozo</Form.Label>
                    <Form.Control  name="IdPozo" type="text" placeholder="ABC 123" ref={register({ required: true })}/>
                    <Form.Text className="text-muted">
                    {errors.IdPozo && <Alert variant="danger">Este campo es requerido</Alert>}
                    </Form.Text>
                </Form.Group>
                <Form.Group >
                    <Form.Label>¿Perforación Finalizada?</Form.Label>
                    <Form.Control as="select" ref={register()} name="perforado">
                    <option>Si</option>
                    <option>No</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Metros de la Perforacion</Form.Label>
                    <Form.Control  name="metrosPerforado" type="text" ref={register({ required: true})}/>
                    <Form.Text className="text-muted">
                    {errors.metrosPerforado && <Alert variant="danger">Este campo es requerido</Alert>}
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Inicio de la Perforacion</Form.Label>
                    <Form.Control  name="inicioPerforacion" type="date" ref={register({ required: true})}/>
                    <Form.Text className="text-muted">
                    {errors.inicioPerforacion && <Alert variant="danger">Este campo es requerido</Alert>}
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Fin de perforación</Form.Label>
                    <Form.Control  name="finPerforacion" type="date" ref={register()}/>
                    <Form.Text className="text-muted">
                    {errors.finPerforacion && <Alert variant="danger">Este campo es requerido</Alert>}
                    </Form.Text>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Equipo Perforacion</Form.Label>
                    <Form.Control as="select" ref={register()} name="EquipoPerforacion">
                    <option>Ly 44 Geominas</option>
                    <option>Ly 34 Serviminas</option>
                    <option>Ly 38 Geominas</option>
                    <option>Ly 38 Serviminas</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group >
                    <Form.Label>¿Logueado?</Form.Label>
                    <Form.Control as="select" ref={register()} name="Logueado">
                    <option>Si</option>
                    <option>No</option>
                    </Form.Control>
                </Form.Group>
              
                <Form.Group >
                    <Form.Label>¿Entregado?</Form.Label>
                    <Form.Control as="select" ref={register()} name="Entregado">
                    <option>Si</option>
                    <option>No</option>
                    </Form.Control>
                </Form.Group>
               
                <Form.Group>
                    <Form.Label>Fecha de Entrega</Form.Label>
                    <Form.Control  name="fechaEntregado" type="date" ref={register()}/>
                    <Form.Text className="text-muted">
                    {errors.fechaEntregado && <Alert variant="danger">Este campo es requerido</Alert>}
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Guardar Pozo
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
