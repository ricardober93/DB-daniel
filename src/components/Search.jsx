import React from 'react'
import {Form,FormControl, Button} from 'react-bootstrap/'

export default function Search({busquedaInput}) {

  const ObtenerBusqueda = (e) =>{
    e.preventDefault()
    busquedaInput(e.target.value)
  }
    return (
      <>
        <Form inline className="mb-3">
          <FormControl onChange={ObtenerBusqueda} type="text" placeholder="buscar.." className="mr-sm-2" name="search" />
          <Button variant="outline-success">Buscar</Button>
       </Form>
      </>
    )
}
