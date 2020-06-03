import React from 'react'
import {Form,FormControl, Button} from 'react-bootstrap/'
export default function Search() {
    return (
      <>
        <Form  inline className="mb-3">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
       </Form>
      </>
    )
}
