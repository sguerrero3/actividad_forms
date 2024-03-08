import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function App() {

  const validatePassword = (pas) => {
    // Implement your password validation logic here
    // For example, you can check if the password meets certain criteria such as length, containing uppercase, lowercase, and special characters.
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/; 
    return regex.test(pas);
  };

  const validateEmail = (em) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(em)
  }

  const [validationStates, setValidationStates] = useState({ emailState: false, passwordState: false });

  const [formValues, setFormValues] = useState({email:"", password:"", favClass:"1"})

  const handleEmailChange = ((e) => {
    setFormValues({...formValues, email: e.target.value})
  });
 
  const handlePasswordChange = ((e) => {
    setFormValues({...formValues, password: e.target.value})
    const isValidPassword = validatePassword(e.target.value);

    setValidationStates({...validationStates, passwordState: isValidPassword});
  });
 
  const handleSelectChange = ((e) => {
    setFormValues({...formValues, favClass: e.target.value})
  });

  const clickSubmit = (() => {
    //Call fetch
    const isValidEmail = validateEmail(formValues.email)

    setValidationStates({...validationStates, emailState: isValidEmail})

    if(validationStates.emailState && validationStates.passwordState){
      alert(JSON.stringify(formValues))
    }
    else{
      alert(JSON.stringify(validationStates))
    }
    
  })

  

  return (
    <div>
      <h1>Ejemplo de formularios!</h1>
     
      <Form>
      <Form.Group className="mb-6" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={formValues.email} />
        { !validationStates.emailState && <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>}
      </Form.Group>
 
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={formValues.password} className={validationStates.passwordState ? '' : 'is-invalid'}/>
        { !validationStates.passwordState && <Form.Text className="text-muted">Your password should be have numbers and letters and should be at least 9 char long</Form.Text>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Favorite Class</Form.Label>
        <Form.Select onChange={handleSelectChange}>
          <option value="1">ISIS3710</option>
          <option value="2">Programación con tecnologias web</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" onClick={clickSubmit}>
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default App;