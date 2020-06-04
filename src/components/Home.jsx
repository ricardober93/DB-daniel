import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

// Search
import Search from "./Search";

export default function Home() {
  const firestore = useFirestore()
  useFirestoreConnect([
    { collection: "Pozos" }, // or 'todos'
  ]);
  const Pozos = useSelector((state) => state.firestore.ordered.Pozos);

  const DeletePozo = (id) => {
    return firestore.collection('Pozos').doc(id).delete()
  }


  return (
    <>
      <Container>
        <h2>Base de Datos Pozos</h2>
         {Pozos ? <p>{Pozos.length} Guardados</p> : <span>No hay pozos</span>}
        <main className="mt-5">
          <div className="d-flex justify-content-around">
            <Search />
            <div className="p-2">
            <Button variant="primary"  ><Link className="text-white" to="/nuevo/pozo">Nuevo Pozo</Link></Button>
            </div>
          </div>
          <Table striped bordered hover >
            <thead>
              <tr>
                <th>ID</th>
                <th>¿Perforación Finalizada?</th>
                <th>Metros Perforados</th>
                <th>¿Entregado?</th>
                <th>Archivo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Pozos ? (
                Pozos.map((pozo) => (
                  <tr key={pozo.IdPozo}>
                    <td> <Link to={"/pozo/"+pozo.id} > {pozo.IdPozo} </Link> </td>
                    <td>{pozo.perforado}</td>
                    <td>{pozo.metrosPerforado}</td>
                    <td>{pozo.Entregado}</td>
                    <td> en proceso...</td>
                    <td>
                      <Button className="mr-2" variant="warning"> <Link to={"/edit/"+pozo.id}> <FontAwesomeIcon icon={faEdit} /></Link> </Button>
                      <Button type="button" onClick={()=> DeletePozo(pozo.id)} variant="danger"><FontAwesomeIcon icon={faTrashAlt} /></Button>
                    </td>
                  </tr>
                ))
              ) : (
                <p>No hay Pozos para mostrar</p>
              )}
            </tbody>
          </Table>
        </main>
      </Container>
    </>
  );
}
