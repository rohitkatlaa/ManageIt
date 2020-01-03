import React, { Component, Fragment } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem , refreshItems} from '../actions/itemActions';
import PropTypes from 'prop-types';


class StudentComplaintList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  


  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className='complain-list'>
            {items.map( item => (
              <CSSTransition key={item._id} timeout={500} classNames='fade'>
                  <ListGroupItem>
                    <ListGroup>
                      <ListGroupItem style={{border: "none"}}>
                      {
                        this.props.userEmail===item.userEmail ? (
                        <Button
                              className='remove-btn float-right'
                              color='danger'
                              size='sm'
                              onClick={this.onDeleteClick.bind(this, item._id)}
                            >
                              Delete
                        </Button>)
                        :
                        null
                      }
                        Category: {item.PrimaryCategory}
                      </ListGroupItem>
                      { item.subCategory!=="none" ?
                        <ListGroupItem style={{border: "none"}}>
                          SubCategory: {item.subCategory}
                        </ListGroupItem>
                        :
                        <Fragment/>
                      }
                      { item.roomNum!=="000" ?
                        <ListGroupItem style={{border: "none"}}>
                          RoomNumber: {item.roomNum}
                        </ListGroupItem>
                        :
                        <Fragment/>
                      }
                      { item.complainDesc ?
                        <ListGroupItem style={{border: "none"}}>
                          Complain Description: {item.complainDesc}
                        </ListGroupItem>
                        :
                        <Fragment/>
                      }
                      { item.imageData ? 
                      <ListGroupItem  style={{border: "none"}}>
                        <img src={item.imageData} alt="upload-image" width="250px" height="250px"/>
                      </ListGroupItem>
                      :
                      <Fragment/>
                      }
                      <ListGroupItem style={{border: "none"}}>
                        CreatedBy: {item.userEmail}
                      </ListGroupItem>
                  </ListGroup>
                  </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  userEmail: state.auth.user ?  state.auth.user.email : null,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem, refreshItems }
)(StudentComplaintList);
