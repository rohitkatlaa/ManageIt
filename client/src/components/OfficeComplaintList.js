import React, { Component, Fragment } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem , refreshItems} from '../actions/itemActions';
import PropTypes from 'prop-types';
import Pusher from 'pusher-js';
import config from '../config/key'


class OfficeComplaintList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems();
    Pusher.logToConsole = true;

    var pusher = new Pusher(config.pusherAppId, {
      cluster: 'ap2',
      forceTLS: true
    });

    var channel = pusher.subscribe('ManageIt');
    channel.bind('complainUpdate', (data)=> {
      // alert(JSON.stringify(data));
      this.props.refreshItems(data);
    });
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  displayDate(date){
    var a=new Date(date);
    var b=new Date();
    const diffTime = Math.abs(b-a);
    const diffSecs = Math.floor(diffTime / (1000));
    const diffMins = Math.floor(diffTime / (1000 * 60));
    const diffHrs = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if(diffDays===0){
      if(diffHrs===0){
        if(diffMins===0){
          return diffSecs.toString()+" Seconds before";
        }
        return diffMins.toString()+" Minutes before";
      }
      return diffHrs.toString()+" Hours before";
    }
    return diffDays.toString()+" Days before"
  }  

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className='complain-list'>
            {items.map(item => (
              <CSSTransition key={item._id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  <ListGroup>
                      <ListGroupItem style={{border: "none"}}>
                      {this.props.isAuthenticated ? (
                        <Button
                          className='remove-btn float-right'
                          color='danger'
                          size='sm'
                          onClick={this.onDeleteClick.bind(this, item._id)}
                        >
                          Delete
                        </Button>
                      ) : null}
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
                      <ListGroupItem style={{border: "none"}}>
                        Created: { this.displayDate(item.date) }
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
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem, refreshItems }
)(OfficeComplaintList);
