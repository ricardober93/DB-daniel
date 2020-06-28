import React, {useState} from "react";
import { Container, Table, Button, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useHistory, Link } from "react-router-dom";
// Search
 import Search from "./Search";
import GuardarLink from "./GuardarLink";


export default function Home() {
  const [PozoBusqueda, setPozoBusqueda] = useState('')
  const [link, setLink] = useState('');
  // const [limit, setLimit] = useState()
  let history = useHistory();
  const firestore = useFirestore()
  let busquedafn = [[ 'IdPozo', "==", PozoBusqueda ]]
  

  useFirestoreConnect([
    { collection: "Pozos",
    where: PozoBusqueda ? busquedafn : null ,
    }
    // or 'todos'   
  ]);

  const Pozos = useSelector((state) => state.firestore.ordered.Pozos);

  const DeletePozo = (id) => {
    return firestore.collection('Pozos').doc(id).delete()
  }

   const busquedaInput = (pozo, e) => {
    setPozoBusqueda(pozo)
}

  // const nextpage = (index) => {
  //   setPage(index*1+5)
  //   setLimit(index*5)

  //   }

  const eliminararchivo = (id) => {
    return firestore
    .collection("Pozos")
    .doc(id)
    .set({archivo:''}, { merge: true })
    .then(() => history.push("/"));
};

const onSubmitHandle = (id) => {
  // e.preventDefault()
  console.log(id, link)
  return firestore
    .collection("Pozos")
    .doc(id)
    .set({archivo: link}, { merge: true });
};

  return (
    <>
      <Container>
        <h2>Base de Datos Pozos</h2>
        {Pozos ? <p>{Pozos.length} Guardados</p> : <span>No hay pozos</span>}
        <main className="mt-5">
          <Row className="d-flex justify-content-around">
            <Search busquedaInput={busquedaInput} xs={12} />
            <div className="p-2">
              <Button variant="primary" xs={12}>
                <Link className="text-white" to="/nuevo/pozo">
                  Nuevo Pozo
                </Link>
              </Button>
            </div>
          </Row>
          <Row className="d-flex justify-content-around">
            <Table striped bordered hover lg={11} md={10} xs={3}>
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
                  Pozos.map((pozo, index) => (
                    <tr key={index}>
                      <td>
                        <Link to={"/pozo/" + pozo.id}>{pozo.IdPozo}</Link>
                      </td>
                      <td>{pozo.perforado}</td>
                      <td>{pozo.metrosPerforado}</td>
                      <td>{pozo.Entregado}</td>
                      <td>
                        {pozo.archivo ? (
                          <>
                            <a
                              href={pozo.archivo}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Ver Archivo
                            </a>
                            <Button
                              size="sm"
                              className="ml-2"
                              type="button"
                              onClick={(e) => (eliminararchivo(pozo.id, e))}
                              variant="danger"
                            > x </Button>
                          </>
                        ) : (
                           <>
                            <GuardarLink setLink={setLink} onSubmitHandle={onSubmitHandle} id={pozo.id} />
                          </>
                         ) }
                      </td>
                      <td>
                        <Button className="mr-2" variant="warning">
                          <Link to={"/edit/" + pozo.id}>
                            <FontAwesomeIcon size="xs" icon={faEdit} />
                          </Link>{" "}
                        </Button>
                        <Button
                          type="button"
                          onClick={() => DeletePozo(pozo.id)}
                          variant="danger"
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>No hay Pozos para mostrar</p>
                )}
              </tbody>
            </Table>
            {/* <div className="mt-1 d-flex justify-content-center">
              <Pagination>

          {
              Pozos ?(       
                Pozos.map((pozo, index) => (
                  <Pagination.Item onClick={()=> nextpage(index)} key={pozo.id} active={ index === page }>
                    { index  }
                  </Pagination.Item>
                ))
              )
              : null
            }
              </Pagination>
              </div> */}
          </Row>
        </main>
      </Container>
    </>
  );
}
