import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class ResetModal extends Component{

    state = {
        modal: false,
        password: null,
        msg: null
    };

    toggle = () => {
       // this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const { password } = this.state;
        const newPassword = {
            password
        };
        //this.props.createRole(newRole);
        this.toggle();
    };

    render(){
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Reset Password
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Reset Password</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (
                        <Alert color='danger'>{this.state.msg}</Alert>
                        ) : null} 
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for='password'>New Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="New Password"
                                    className="mb-3"                            
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <Button color='dark' style={{ marginTop: '2rem' }} block>
                                Reset
                            </Button>
                        </Form>              
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default ResetModal;

