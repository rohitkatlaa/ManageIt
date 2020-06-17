import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import ResetModal from './auth/ResetModal';

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  componentDidMount(){
    const { isAuthenticated, user } = this.props.auth;
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <Fragment>
        <NavItem>
          <span className='navbar-text mr-3'>
            <strong>{user ? `Welcome ${user.name}` : ''}</strong>
          </span>
        </NavItem>
        { this.props.userType==="staff" ?
          <NavItem>
              <RegisterModal />
          </NavItem>
          :
          <Fragment/>
        }
        { this.props.userType === "staff"?
        <NavItem>
          <NavLink href='/createRole/'>
            Create a Role
          </NavLink>
        </NavItem>
        :
        <Fragment />
        }

        <NavItem>
          <ResetModal/>
        </NavItem>

        <NavItem>
          <Logout />
        </NavItem>

      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color='dark' dark expand='sm' className='mb-5'>
          <Container>
            <NavbarBrand href='/'>ManageIt</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  userType: state.auth.user ? state.auth.user.userType : "normal",
});

export default connect(
  mapStateToProps,
  null
)(AppNavbar);
