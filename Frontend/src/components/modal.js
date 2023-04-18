import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {Modal,Form} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
//const Up = React.createContext();
import axios from 'axios';

function Update() {
    const [show, setShow] = useState(false);
    const [data, setdata] = useState(null);
    const navigate = useNavigate()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handlechange = (e)=>{
        if(e.target.name==='upassword'){
            setdata(e.target.value)        
        }
    }
    const handlesubmit = async (e)=>{
        e.preventDefault()
        try{
            const res = await axios.post("http://localhost:3007/updatepwd",{"upassword":data},{
                headers:{
                    Authorization:"Bearer "+ localStorage.getItem("token")
                }
            })
            //console.log(res.data)
            localStorage.removeItem("token")
            alert(res.data.msg)
            navigate("/signin")
            
        }
        catch(err){
            console.log(err)
        }
        setShow(false);
    }
  return (
    <div> 
    <button className="btn btn-primary my-3" style={{width:'10rem',margin: 'auto',display: 'block' }} onClick={handleShow}>Update Password</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
            >
              <Form.Label>Updated Password</Form.Label>
              <Form.Control type='password' name="upassword" onChange={(e)=>handlechange(e)} rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>handlesubmit(e)} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Update