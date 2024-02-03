import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';





function App() {

  const [show, setShow] = useState(false);
  const [successModal,setSuccessModal] = useState(false)
  const [showSuccessModal,setShowSuccessModal] = useState(false)
  const [successModalClose,setSuccessModalClose] = useState(false)
  const [passwordError,setPasswordError] = useState()
  const [confirmPasswordError,setConfirmPasswordError] = useState()
  const [nameError,setNameError] = useState()
  const [emailError,setEmailError] = useState()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSuccessClose = () => setSuccessModalClose(true)

  const [user,setUser] = useState({name:"",email:"",password:"",confirmPassword:""})

  const onHandleChange = (e) => {

    if(user.password.length >=0) {
      setPasswordError("")
    }

    if(user.confirmPassword >=0) {
      setConfirmPasswordError("")

    }

     if(user.name.length >=0 ) {
      setNameError("")

    }

     if(user.email.length>=0){
      setEmailError("")

    }

    setUser({...user,[e.target.name]:e.target.value})
  }

  const onHandleRegister = () => {
    localStorage.setItem('name',user.name)
    console.log(localStorage.getItem('name'))

    let validPassword = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
   )

   let validEmail = new RegExp(/.+@.+\.[A-Za-z]+$/)


   if(user.name.length < 5) {
    setNameError("Name Should be atleast 5 characters")
   }

   else {
    setNameError()
   }


   if(validEmail.test(user.email) == false ) {
    setEmailError("Enter a Valid Email")
   }

   else {
    setEmailError()
   }

   if(validPassword.test(user.password) == false){
    setPasswordError("Password Should Contain 8 Characters with 1 Uppercase, 1 Number and 1 Special Character")
    console.log(user)
  }

  else {
    setPasswordError()
  }

  if(user.password != user.confirmPassword)  {
    setConfirmPasswordError("Password does not match")
  }

  else {
    setConfirmPasswordError()
  }

   if(validPassword.test(user.password) && user.password == user.confirmPassword){
    handleClose()
    setSuccessModal(true)
    setShowSuccessModal(true)
    console.log(user)

    setTimeout(() => {
      setShowSuccessModal(false)
    }, 2000);

    

   }

  }

  


  return (
    <div className="App">
      
<Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">TASK</Navbar.Brand>
        <Button variant="primary" onClick = {handleShow}>Sign up</Button>{' '}
      </Container>
    </Navbar>


    <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={onHandleChange}
                name = "name"
              />
              <span>{nameError}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                onChange={onHandleChange}
                name = "email"
              />
              <span>{emailError}</span>
            </Form.Group>


            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                autoFocus
                onChange={onHandleChange}
                name = "password"
              />
            <span>{passwordError}</span>

            </Form.Group>


            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                autoFocus
                onChange={onHandleChange}
                name = "confirmPassword"

              />

              <span>{confirmPasswordError}</span>
              
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHandleRegister}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>

      {successModal?<Modal show={showSuccessModal} onHide={handleSuccessClose}>
      <Modal.Header>

          <Modal.Title>Hello {localStorage.getItem('name')}</Modal.Title>
          </Modal.Header>

          <Modal.Body>Take a Tour </Modal.Body>
          <Modal.Footer>
          #placement task
        </Modal.Footer>

        
        
      </Modal>:""}
      
      </div>
  );


}
export default App;
