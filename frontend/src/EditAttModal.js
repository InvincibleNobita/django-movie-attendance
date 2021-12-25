import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditAttModal extends Component{
    constructor(props){
        super(props);
        this.state={movs:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'movies/')
        .then(response=>response.json())
        .then(data=>{
            this.setState({movs:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'attendance/',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                SeatNo:event.target.SeatNo.value,
                AttendeeFirstName:event.target.AttendeeFirstName.value,
                AttendeeSecondName:event.target.AttendeeSecondName.value,
                MovieName:event.target.MovieName.value,
                Date:event.target.Date.value,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }


    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit Attendee
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="SeatNo">
                        <Form.Label>SeatNo</Form.Label>
                        <Form.Control type="text" name="SeatNo" required 
                        placeholder="SeatNo"
                        disabled
                        defaultValue={this.props.seatno}/>
                    </Form.Group>

                    <Form.Group controlId="AttendeeFirstName">
                        <Form.Label>AttendeeFirstName</Form.Label>
                        <Form.Control type="text" name="AttendeeFirstName" required 
                        defaultValue={this.props.fname}
                        placeholder="AttendeeFirstName"/>
                    </Form.Group>

                    <Form.Group controlId="AttendeeSecondName">
                        <Form.Label>AttendeeSecondName</Form.Label>
                        <Form.Control type="text" name="AttendeeSecondName" required 
                        defaultValue={this.props.sname}
                        placeholder="AttendeeSecondName"/>
                    </Form.Group>

                    <Form.Group controlId="MovieName">
                        <Form.Label>MovieName</Form.Label>
                        <Form.Control as="select" defaultValue={this.props.mname}>
                        {this.state.movs.map(mov=>
                            <option key={mov.MovieId}>{mov.MovieName}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control 
                        type="date"
                        name="Date"
                        required
                        placeholder="Date"
                        defaultValue={this.props.doj}
                        />
                       
                        
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Attendee
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="info" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}