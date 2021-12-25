import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddMovModal} from './AddMovModal';
import {EditMovModal} from './EditMovModal';

export class Movies extends Component{

    constructor(props){
        super(props);
        this.state={movs:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+"movies/")
        .then((response) => {
            // console.log(response);
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("NETWORK RESPONSE ERROR");
            }
        })
        .then(data=>{
            // console.log(data);
            this.setState({movs:data});
        })
        .catch((error) => console.error("FETCH ERROR:", error));
    }
    

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deletemov(movId){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'movies/'+movId,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {movs, movid,mname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>MoviesId</th>
                        <th>MoviesName</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movs.map(mov=>
                            <tr key={mov.MovieId}>
                                <td>{mov.MovieId}</td>
                                <td>{mov.MovieName}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        movid:mov.MovieId,mname:mov.MovieName})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deletemov(mov.MovieId)}>
            Delete
        </Button>

        <EditMovModal show={this.state.editModalShow}
        onHide={editModalClose}
        movid={movid}
        mname={mname}/>
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Movies</Button>

                    <AddMovModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}