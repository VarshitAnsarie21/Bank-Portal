import React from 'react';   
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';  
import axios from 'axios'  
// import '../Student/Addstudent.css'  
class Edit extends React.Component {  
    constructor(props) {  
        super(props)  
     
    this.onChangeName = this.onChangeName.bind(this);  
    this.onChangeRollNo = this.onChangeRollNo.bind(this);  
    this.onChangeClass = this.onChangeClass.bind(this);  
    this.onChangeAddress = this.onChangeAddress.bind(this);  
    this.onSubmit = this.onSubmit.bind(this);  
  
         this.state = {  
            full_name: '',  
            address: '',  
            phone_no: '',  
            occupation: ''  
  
        }  
    }  
  
  componentDidMount() {  
      axios.get('http://localhost:61476/admin/allcustomerByemail?email='+this.props.match.params.email)  
          .then(response => {  
              this.setState({   
                full_name: response.data.full_name,   
                address: response.data.address,  
                phone_no: response.data.phone_no,  
                occupation: response.data.occupation });  
  
          })  
          .catch(function (error) {  
              console.log(error);  
          })  
    }  
  
  onChangeName(e) {  
    this.setState({  
        full_name: e.target.value  
    });  
  }  
  onChangeRollNo(e) {  
    this.setState({  
        address: e.target.value  
    });    
  }  
  onChangeClass(e) {  
    this.setState({  
        phone_no: e.target.value  
    });  
}  
    onChangeAddress(e) {  
        this.setState({  
            occupation: e.target.value  
        });  
  }  
  
  onSubmit(e) {  
    debugger;  
    e.preventDefault();  
    const obj = {  
        email:this.props.match.params.email,  
      full_name: this.state.full_name,  
      address: this.state.address,  
      phone_no: this.state.phone_no,  
      occupation: this.state.occupation  
  
    };  
    axios.post('http://localhost:61476/admin/update', obj)  
        .then(res => console.log(res.data));  
        debugger;  
        this.props.history.push('/Studentlist')  
  }  
    render() {  
        return (  
            <Container className="App">  
  
             <h4 className="PageHeading">Update Student Informations</h4>  
                <Form className="form" onSubmit={this.onSubmit}>  
                    <Col>  
                        <FormGroup row>  
                            <Label for="name" sm={2}>Name</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="Name" value={this.state.Name} onChange={this.onChangeName}  
                                placeholder="Enter Name" />  
                            </Col>  
                        </FormGroup>  
                        <FormGroup row>  
                            <Label for="Password" sm={2}>RollNo</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="RollNo" value={this.state.RollNo} onChange={this.onChangeRollNo} placeholder="Enter RollNo" />  
                            </Col>  
                        </FormGroup>  
                         <FormGroup row>  
                            <Label for="Password" sm={2}>Class</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="Class" value={this.state.Class} onChange={this.onChangeClass} placeholder="Enter Class" />  
                            </Col>  
                        </FormGroup>  
                         <FormGroup row>  
                            <Label for="Password" sm={2}>Address</Label>  
                            <Col sm={10}>  
                                <Input type="text" name="Address"value={this.state.Address} onChange={this.onChangeAddress} placeholder="Enter Address" />  
                            </Col>  
                        </FormGroup>   
                    </Col>  
                    <Col>  
                        <FormGroup row>  
                            <Col sm={5}>  
                            </Col>  
                            <Col sm={1}>  
                          <Button type="submit" color="success">Submit</Button>{' '}  
                            </Col>  
                            <Col sm={1}>  
                                <Button color="danger">Cancel</Button>{' '}  
                            </Col>  
                            <Col sm={5}>  
                            </Col>  
                        </FormGroup>  
                    </Col>  
                </Form>  
            </Container>  
        );  
    }  
  
}  
  
export default Edit;  