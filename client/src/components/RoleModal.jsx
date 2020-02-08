import React, {Component} from 'react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { connect } from 'react-redux';
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
  Alert,
  Container,
  NavItem,
  Navbar,
  NavbarBrand

} from 'reactstrap';
import PropTypes from 'prop-types';
import { createRole } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
  

class RoleModal extends Component{
  state = {
    modal: false,
    name: '',
    primaryCategory: '',
    subCategory: '',
    deletePermission: 'yes',
    statusPermission: 'yes',
    minDays: 0,
    minVotes: 0,
    pushComplain:'no'
  };

  static propTypes = {
      error: PropTypes.object.isRequired,
      createRole: PropTypes.func.isRequired,
      clearErrors: PropTypes.func.isRequired
  };

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };
  componentWillReceiveProps(){
    console.log(this.props.auth);
  }
  onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, primaryCategory, subCategory, deletePermission, statusPermission, minDays, minVotes, pushComplain } = this.state;
    const newRole = {
      name,
      primaryCategory,
      subCategory,
      deletePermission,
      statusPermission,
      minDays,
      minVotes,
      pushComplain,
    };
    this.props.createRole(newRole);
    this.toggle();
  };

  render(){
    const { isAuthenticated, user } = this.props.auth;
    return(
      <div>
      {isAuthenticated && user.userType == "staff" ? 
        <Container>
        <Navbar color='dark' dark expand='sm' className='mb-5'>
         <NavItem>
            <span className='navbar-text mr-3'>
              <NavbarBrand href = "/" ><strong>{"ManageIt"}</strong></NavbarBrand>
            </span>
         </NavItem>
        </Navbar>
          <h1> Create a Role </h1>
          <AvForm onSubmit = {this.onSubmit}>
            <AvField name="name" label="Name " type="text" errorMessage="Invalid name" validate={{
              required: {value: true},
              pattern: {value: '^[A-Za-z0-9]+$'}
            }} onChange = {this.onChange} required />
            <AvField name="primaryCategory" label="Primary Category " type="text" errorMessage="Invalid Category" validate={{
              required: {value: true},
              pattern: {value: '^[A-Za-z0-9]+$'},
            }} onChange = {this.onChange}  required />
            <AvField name="subCategory" label="Sub Category " type="text" errorMessage="Invalid Category" validate={{
              required: {value: true},
              pattern: {value: '^[A-Za-z0-9]+$'},
            }} onChange = {this.onChange} />
            <FormGroup>
              <Label for="deletePermission">Delete Permission</Label>
                <Input type="select" name="deletePermission" onChange = {this.onChange}  >
                  <option value="no">Yes</option>
                  <option value="yes">No</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="statusPermission">Grant Permission to Change Status of a Complain</Label>
                <Input type="select" name="statusPermission" onChange = {this.onChange} >
                  <option value="no">Yes</option>
                  <option value="yes">No</option>
              </Input>
            </FormGroup>
            <AvField name="minVotes" label="Min Votes" type="number" onChange = {this.onChange} />
            <AvField name="minDays" label="Min Days" type="number" onChange = {this.onChange} />
            <FormGroup>
              <Label for="pushComplain">Grant Permission to Push Complain</Label>
                <Input type="select" name="pushComplain" onChange={this.onChange}>
                  <option value="no">Yes</option>
                  <option value="yes">No</option>
              </Input>
            </FormGroup>
            <Button color='dark' style={{ marginTop: '2rem' }} block>
                Create
              </Button>
          </AvForm>
        </Container>
        :
        <div></div>
      }
      </div>

      );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { createRole, clearErrors }
)(RoleModal);