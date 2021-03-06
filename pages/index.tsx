import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button, Container, Form, Toast, Alert, Spinner } from 'react-bootstrap'
import { useRef, useState } from 'react'
import axios from 'axios';


export default function Home() {
  const nameInputRef = useRef(null);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const name = nameInputRef!.current!.value
      await axios.post('/api/users/', {
        name: name
      });
      setIsLoading(false);
      setShow(true);
      nameInputRef!.current!.value = "";
      router.push(`/${name}`)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }

  }
  return (
    <div>
      <Head>
        <title>Simple Menn App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
        <Toast.Body>
          <Alert variant="success">
            User created successfully
      </Alert>
        </Toast.Body>
      </Toast>

      <Container fluid className="main-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="groupName">
            <Form.Control ref={nameInputRef} type="text" placeholder="Insert a name..." />
          </Form.Group>
          <Button variant="primary" block type="submit">
            {isLoading ? (<Spinner animation="border" variant="light" />) : "Create"}
          </Button>
        </Form>
      </Container>
    </div>
  )
}
