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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class ResetModal extends Component{

    state = {
        modal: false,
        newPassword: null,
        msg: null
    };

    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const { newPassword } = this.state;
        const newRole = {
          newPassword
        };
        //this.props.createRole(newRole);
        this.toggle();
      };
    
    render(){
        return(
            <div>
                <NavLink  href="#">
                    Reset Password
                </NavLink>
            </div>
        )
    }

}
