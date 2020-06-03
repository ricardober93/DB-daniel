import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";

// Search
import Search from "./Search";

export default function Home() {
  useFirestoreConnect([
    { collection: "Pozos" }, // or 'todos'
  ]);
  const Pozos = useSelector((state) => state.firestore.ordered.Pozos);

  return (
    <>
      <Container>
        <h2>Base de Datos Pozos</h2>
         {Pozos ? <p>{Pozos.length} Guardados</p> : <span>No hay pozos</span>}
        <main className="mt-5">
            <Search />
          <Table striped bordered hover >
            <thead>
              <tr>
                <th>ID</th>
                <th>¿Perforación Finalizada?</th>
                <th>Metros Perforados</th>
                <th>¿Entregado?</th>
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
                    <td>
                      <Button variant="warning">Editar</Button>
                      <Button variant="danger">Eliminar</Button>
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
