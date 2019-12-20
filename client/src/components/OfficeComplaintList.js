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
                          className='remove-btn'
                          color='danger'
                          size='sm'
                          onClick={this.onDeleteClick.bind(this, item._id)}
                        >
                          &times;
                        </Button>
                      ) : null}
                      {item.name}
                    </ListGroupItem>
                      { item.imageData ?
                        <ListGroupItem  style={{border: "none"}}>
                          <img src={item.imageData} alt="upload-image" width="250px" height="250px"/>
                        </ListGroupItem>
                        :
                        <Fragment/>
                      }
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
