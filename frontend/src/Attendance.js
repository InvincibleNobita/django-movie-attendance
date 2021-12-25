import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddAttModal} from './AddAttModal';
import {EditAttModal} from './EditAttModal';

export class Attendance extends Component{

    constructor(props){
        super(props);
        this.state={att:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'attendance/')
        .then(response=>response.json())
        .then(data=>{
            this.setState({att:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(sno){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'attendance/'+sno,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {att, seatno,fname,sname,mname,doj}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>SeatNo</th>
                        <th>AttendeeFirstName</th>
                        <th>AttendeeSecondName</th>
                        <th>MovieName</th>
                        <th>Date</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {att.map(emp=>
                            <tr key={emp.SeatNo}>
                                <td>{emp.SeatNo}</td>
                                <td>{emp.AttendeeFirstName}</td>
                                <td>{emp.AttendeeSecondName}</td>
                                <td>{emp.MovieName}</td>
                                <td>{emp.Date}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        seatno:emp.SeatNo,fname:emp.AttendeeFirstName,sname:emp.AttendeeSecondName,mname:emp.MovieName,
        doj:emp.Date})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteEmp(emp.SeatNo)}>
            Delete
        </Button>

        <EditAttModal show={this.state.editModalShow}
        onHide={editModalClose}
        seatno={seatno}
        fname={fname}
        sname={sname}
        mname={mname}
        doj={doj}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Attendees</Button>

                    <AddAttModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}