import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem , refreshItems} from '../actions/itemActions';
import PropTypes from 'prop-types';
import Pusher from 'pusher-js';


class ComplaintList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems();
    Pusher.logToConsole = false;

    var pusher = new Pusher('85de801d88609126da17', {
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
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className='remove-btn'
                      color='danger'
                      size='sm'
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  ) : null}
                  {name}
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
)(ComplaintList);
