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
import PropTypes, { element } from 'prop-types';
import { mass_register } from '../actions/usersActions';
import { clearErrors } from '../actions/errorActions';

class RegisterMultipleUsersModal extends Component {
  state = {
    modal: false,
    inputs: ['Email Id 1'],
    emails: [''],
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    mass_register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'MASS_REGISTRATION_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if(this.state.modal){
      if(isAuthenticated){
        this.toggle();
      }
    }

  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal,
      inputs: ['Email Id 1'],
      emails: [''],
      msg: null
    });
  };

  onChange = e => {
    var emails = this.state.emails;
    emails[e.target.name.slice(-1) - 1] = e.target.value;
    this.setState({ emails: emails});
  };

  onSubmit = () => {
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    var emailIds = this.state.emails;
    var invalidEmails = [];
    emailIds.forEach(element => {
      if(!validEmailRegex.test(element)) {
        invalidEmails.push(element);
      }
    })
    if(invalidEmails.length !== 0) {
      this.setState({
        msg: 'Invalid emails: ' + invalidEmails.join(', ')
      })
    } else {
      this.props.mass_register(emailIds);
      this.toggle()
    }
  };

  appendInput() {
    var newInput = `Email Id ${this.state.inputs.length + 1}`;
    this.setState({
      inputs: this.state.inputs.concat([newInput]),
      emails: this.state.emails.concat('')
    });
  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Create multiple users
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register Multiple Users</ModalHeader>
          <ModalBody>
              <p className="lead">Note: </p>
              <p style={{marginLeft: "15px"}}>The first part of the email id will be used as the name of the student.</p>
          {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form>
              {this.state.inputs.map(input => {
                return (
                  <FormGroup key={input}>
                    <Label for='email'>{input}:</Label>
                    <Input
                      type='email'
                      name={input}
                      id='email'
                      placeholder='Enter Email Id'
                      className='mb-3'
                      onChange={this.onChange}
                    />
                  </FormGroup>
                )
              })}
            </Form>
            <Button type="button" onClick={ () => this.appendInput() }>
                   Click to add additional entry
            </Button>
            <Button type="submit" color='dark' style={{ marginTop: '2rem' }} block onClick={this.onSubmit}>
                  Register
            </Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error
});

export default connect(
  mapStateToProps,
  { mass_register, clearErrors }
)(RegisterMultipleUsersModal);
