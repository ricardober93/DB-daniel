import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Card, Container } from "react-bootstrap";

export default function PozoDetalle() {
  let { id } = useParams();
  useFirestoreConnect(() => [
    { collection: "Pozos", doc: id }, // or `todos/${props.todoId}`
  ]);
  const Pozo = useSelector(
    ({ firestore: { data } }) => data.Pozos && data.Pozos[id]
  );

  return (
    <Container>
      { Pozo ? 
      <Card>
        <Card.Body>
          <Card.Title><h3>ID: {Pozo.IdPozo}</h3></Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Metros Perforados: {Pozo.metrosPerforado} Mtrs
          </Card.Subtitle>
          <Card.Text>
            <p>¿Logueado?: { Pozo.Logueado}</p>
            <p>Inicio de la perforación: { Pozo.inicioPerforacion}</p>
            <p>Equipo de la perforación: { Pozo.EquipoPerforacion}</p>
            <p>Codigo del Equipo: { Pozo.codigoEquipo}</p>
            <p>Fecha de Fin de la perforación: { Pozo.finPerforacion}</p>
            <p>Entregado: { Pozo.Entregado}</p>
            <p>Perforación Terminada: { Pozo.perforado}</p>
            <p>Fecha de la Entrega: { Pozo.fechaEntregado}</p>
            <p>Archivo: { Pozo.archivo}</p>

          </Card.Text>
          <Card.Link> <Link to="/" >Devolver</Link> </Card.Link>
          <Card.Link> <Link  to={"/edit/"+Pozo.id} > Editar </Link></Card.Link>
        </Card.Body>
      </Card>
        :
        <p>No hay pozo para mostrar</p>  
    }
    </Container>
  );
}
