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
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    userType: 'student',
    password: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
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
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, userType, password } = this.state;

    // Create user object
    const newUser = {
      name,
      email,
      userType,
      password
    };

    // Attempt to register
    this.props.register(newUser);
    this.toggle()
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Create a User
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='name'>Name</Label>
                <Input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Name'
                  className='mb-3'
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for='email'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  className='mb-3'
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                  <Label for="usertype">Type of the User</Label>
                  <Input type="select" name="userType" onChange={this.onChange}>
                    <option value="student">Student</option>
                    <option value="staff">Staff</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for='password'>Password</Label>
                  <Input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Password'
                    className='mb-3'
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Register
                </Button>
            </Form>
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
  { register, clearErrors }
)(RegisterModal);
