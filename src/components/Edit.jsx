import React from 'react'
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { useFirestore } from 'react-redux-firebase'
import { Container, Row, Col, Card, Form, Alert, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

export default function Edit() {
    let { id } = useParams();
    let history = useHistory();
    const firestore = useFirestore()
    const { register, handleSubmit, errors } = useForm();

    useFirestoreConnect(() => [
        { collection: "Pozos", doc: id }, // or `todos/${props.todoId}`
      ]);
      const Pozo = useSelector(
        ({ firestore: { data } }) => data.Pozos && data.Pozos[id]
      );


      const onSubmit = (data, e) => {
        e.preventDefault()
        return firestore.collection('Pozos').doc(id).set(data).then( ()=> history.push("/"))
      }

    return (
        <Container>
        <Link to="/">
          <FontAwesomeIcon size="2x"   icon={faArrowCircleLeft} />
        </Link>
        
        {
            Pozo ?
            <Row className="mt-3 justify-content-md-center mb-4 ">
            <Col  lg="8">
              <Card>
                <Card.Body>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group>
                        <Form.Label>ID Pozo</Form.Label>
                        <Form.Control  name="IdPozo" type="text" placeholder="ABC 123" defaultValue={Pozo.IdPozo} ref={register({ required: true })}/>
                        <Form.Text className="text-muted">
                        {errors.IdPozo && <Alert variant="danger">Este campo es requerido</Alert>}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Inicio de la Perforacion</Form.Label>
                        <Form.Control  name="metrosPerforado" type="text"  defaultValue={Pozo.metrosPerforado} ref={register({ required: true})}/>
                        <Form.Text className="text-muted">
                        {errors.metrosPerforado && <Alert variant="danger">Este campo es requerido</Alert>}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Metros de la Perforacion</Form.Label>
                        <Form.Control  name="inicioPerforacion" type="date"  defaultValue={Pozo.inicioPerforacion} ref={register({ required: true})}/>
                        <Form.Text className="text-muted">
                        {errors.inicioPerforacion && <Alert variant="danger">Este campo es requerido</Alert>}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>¿Perforación Finalizada?</Form.Label>
                        <Form.Control as="select" ref={register()} defaultValue={Pozo.perforado} name="perforado">
                        <option>Si</option>
                        <option>No</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>¿Logueado?</Form.Label>
                        <Form.Control as="select" ref={register()} defaultValue={Pozo.Logueado} name="Logueado">
                        <option>Si</option>
                        <option>No</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Fin de perforación</Form.Label>
                        <Form.Control  name="finPerforacion" defaultValue={Pozo.finPerforacion}  type="date" ref={register()}/>
                        <Form.Text className="text-muted">
                        {errors.finPerforacion && <Alert variant="danger">Este campo es requerido</Alert>}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>¿Entregado?</Form.Label>
                        <Form.Control as="select" ref={register()} defaultValue={Pozo.Entregado} name="Entregado">
                        <option>Si</option>
                        <option>No</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Equipo Perforacion</Form.Label>
                        <Form.Control as="select" ref={register()}  defaultValue={Pozo.EquipoPerforacion} name="EquipoPerforacion">
                        <option>Ly 44 Geominas</option>
                        <option>Ly 34 Serviminas</option>
                        <option>Ly 38 Geominas</option>
                        <option>Ly 38 Serviminas</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Fecha de Entrega</Form.Label>
                        <Form.Control  name="fechaEntregado" defaultValue={Pozo.fechaEntregado} type="date" ref={register()}/>
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
          </Row> :
          <p>No hay Pozo para editar</p>
        }
      
      </Container>
    )
}
