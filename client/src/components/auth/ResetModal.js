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
import { resetPassword } from '../../actions/resetActions';
import { clearErrors } from '../../actions/errorActions';
import { clearSuccess } from '../../actions/authActions';

class ResetModal extends Component{

    state = {
        modal: false,
        newPassword: null,
        verifyPassword: null,
        msg: null,
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        error: PropTypes.object.isRequired,
        resetPassword: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        success: PropTypes.bool
    };


    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal,
        });
    };


    componentDidUpdate(prevProps) {
        const { error, isAuthenticated, success } = this.props;
        if (error !== prevProps.error) {
          // Check for register error
          if (error.id === 'PASSWORD_RESET_FAIL') {
            this.setState({ msg: error.msg.msg });
          } else {
            this.setState({ msg: null }); 
          }
        }

        if(success == true){
            this.toggle();
            this.props.clearSuccess();
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        this.props.clearErrors();
        e.preventDefault();
        const { newPassword, verifyPassword } = this.state;
        const Password = {
            newPassword,
            verifyPassword
        };
        
        this.props.resetPassword(Password);
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
                                    name="newPassword"
                                    id="newPassword"
                                    placeholder="New Password"
                                    className="mb-3"                            
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for='password'>Re-Enter New Password</Label>
                                <Input
                                    type="password"
                                    name="verifyPassword"
                                    id="verifyPassword"
                                    placeholder="Re-Enter Password"
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


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    success: state.auth.success
});

export default connect(mapStateToProps, {resetPassword, clearErrors, clearSuccess})(ResetModal);

