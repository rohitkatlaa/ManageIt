import React, { Component, Fragment } from 'react';
import { Container,Badge } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StudentComplaintList from './StudentComplaintList';
import OfficeComplaintList from './OfficeComplaintList';


class ComplaintList extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  render() {
    const { filterPrimaryCategory } = this.props.item;
    const { filterSubCategory } = this.props.item;
    const { filterStatus } = this.props.item;
    const { sortParams } = this.props.item;
    const { sortByUser } = this.props.item;
    return (
      <Container>
          { filterPrimaryCategory!=="All" ||  filterStatus!=="All" ? 
            <div>
              <h5 style={{display:"inline"}}>FilterParameters:</h5> &nbsp;
              { filterStatus!=="All" ?
                <Fragment>
                  <Badge color="primary" pill>
                    {filterStatus}
                  </Badge>
                  &nbsp;
                </Fragment>
                : null
              }
              { filterPrimaryCategory!=="All" ?
                <Fragment>
                  <Badge color="primary" pill>
                    {filterPrimaryCategory}
                  </Badge>
                  &nbsp;
                  { filterSubCategory!=="All" ? <Badge color="primary" pill>{filterSubCategory}</Badge>: <Fragment/>}
                </Fragment>
              : null
              }
              <br/>
              <br/>
            </div>
            : <Fragment/>}
          { sortParams!=="default" || sortByUser !== "All" ? 
            <div>
              <h5 style={{display:"inline"}}>SortParameters:</h5> &nbsp;
              {sortParams !== "default" ?
              <Badge color="primary" pill>
                  {sortParams} 
              </Badge>
              :
              ""}
              &nbsp;
              {sortByUser !== "All" ?
              <Badge color="primary" pill>
                  {sortByUser}
              </Badge>
              :
              ""}
              <br/>
              <br/>
            </div>
            :
            <Fragment/>
          }
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
  item: state.item,
  userType: state.auth.user ? state.auth.user.userType : "normal",
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps
)(ComplaintList);
