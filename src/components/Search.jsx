import React, { useState } from 'react'
import {Form,FormControl, Button} from 'react-bootstrap/'

export default function Search({busquedaInput}) {

  const [state, setstate] = useState('')
  const guardarBusqueda = (e) =>{
    e.preventDefault()
    busquedaInput(state)
  }

  const ObtenerBusqueda = (e) =>{
    
    setstate(e.target.value)
  }
    return (
      <>
        <Form onSubmit={guardarBusqueda} inline className="mb-3">
          <FormControl onChange={ObtenerBusqueda} type="text" placeholder="ID exacto del pozo.." className="mr-sm-2 ancho-300"  name="search" />
          <Button type="submit" variant="outline-success">Buscar</Button>
       </Form>
      </>
    )
}
