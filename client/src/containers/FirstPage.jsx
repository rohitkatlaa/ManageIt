import React, { Component } from 'react';
import AppNavbar from '../components/AppNavbar';
import ComplaintList from '../components/ComplaintList';
import ItemModal from '../components/ItemModal';
import FilterModal from '../components/FilterModal';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearSuccess } from '../actions/authActions';

class FirstPage extends Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    success: PropTypes.bool,
    msg: PropTypes.string
  };

  componentDidUpdate(prevProps) {
    const { success, msg } = this.props;
  }


  render() {
    return (
      <div>
        <Container>
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
  msg: state.auth.msg
});

export default connect(mapStateToProps, { clearSuccess })(FirstPage);