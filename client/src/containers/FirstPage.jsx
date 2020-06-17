import React, { Component } from 'react';
import AppNavbar from '../components/AppNavbar';
import ComplaintList from '../components/ComplaintList';
import ItemModal from '../components/ItemModal';
import FilterModal from '../components/FilterModal';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearSuccess } from '../actions/authActions';
import { Alert } from 'reactstrap';

class FirstPage extends Component {

  state = {
    msg: null,
    greenAlert: false
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    success: PropTypes.bool,
  };

  setSuccessTimer = () => {
    setTimeout(() => this.setState({
      msg: null,
      greenAlert: false
    }), 2000);
  }

  componentDidUpdate(prevProps) {
    const { success } = this.props;

    if(success == true){
      this.setState({
        msg: 'Password Reset Successfully!!',
        greenAlert: true
      })
      this.setSuccessTimer();
    }

  }

  onDismiss = () => {
    this.setState({
      greenAlert:false,
      msg:null
    });
  }

  render() {
    const resetSuccess = (
      <Alert color="success" style={{position:"relative"}} isOpen={this.state.greenAlert} toggle={this.onDismiss}>
          {this.state.msg}
      </Alert>
    );
    return (
      <div>
        <Container>
          {
          this.state.greenAlert ? resetSuccess : null
          }
          <AppNavbar />
          <FilterModal />
          <ItemModal />
          <ComplaintList />
          
        </Container>
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAutenticated,
  success: state.auth.success,
});

export default connect(mapStateToProps, { clearSuccess })(FirstPage);