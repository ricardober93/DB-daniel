import React, {useState} from "react";
import { Button, Fade, Form } from "react-bootstrap";
export default function GuardarLink(props) {
  const {onSubmitHandle, setLink, id} = props
    const [Show, setShow] = useState(false);

    const onSubmitHandlefn = (id , e) => {
      e.preventDefault()
      onSubmitHandle(id)
      setShow(!Show)
    }

  return (
    <>
      <Fade in={Show}>
        <Form onSubmit={(e) => onSubmitHandlefn(id, e)}>
          <Form.Group>
            <Form.Control
              name="archivo"
              type="text"
              placeholder="link de drive google"
              onChange={(e) => setLink(e.target.value)}
            />
          </Form.Group>
          <Button variant="success" size="sm" type="submit">
            Guardar Link
          </Button>
          <Button
            className="ml-2"
            variant="warning"
            size="sm"
            onClick={() => setShow(!Show)}
          >
            Ocultar
          </Button>
        </Form>
      </Fade>
      <Fade in={!Show}>
        <Button size="sm" onClick={() => setShow(!Show)}>
          Guardar Documento
        </Button>
      </Fade>
    </>
  );
}
