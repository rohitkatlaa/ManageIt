import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StudentComplaintList from './StudentComplaintList';
import OfficeComplaintList from './OfficeComplaintList';


class ComplaintList extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  render() {
    return (
      <Container>
          { this.props.userType==='staff' ? 
            <OfficeComplaintList/>
            :
            <StudentComplaintList/>
          }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userType: state.auth.user ? state.auth.user.userType : "normal",
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps
)(ComplaintList);
