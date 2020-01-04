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
    const unfiltereditems=items;
    const { filterPrimaryCategory } = this.props.item;
    const { filterSubCategory } = this.props.item;
    var finalItems=[];
    if(filterPrimaryCategory!=="All" && unfiltereditems){
      var x;
      for(x in unfiltereditems){
        if(filterSubCategory!=="All"){
          if(unfiltereditems[x].PrimaryCategory===filterPrimaryCategory && unfiltereditems[x].subCategory===filterSubCategory){
            finalItems.push(unfiltereditems[x])
          }
        }
        else{
          if(unfiltereditems[x].PrimaryCategory===filterPrimaryCategory){
            finalItems.push(unfiltereditems[x])
          }
        }
      }
    }
    else{
      finalItems=unfiltereditems;
    }
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className='complain-list'>
            {finalItems && finalItems.map( item => (
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
  userEmail: state.auth.user ?  state.auth.user.email : null,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem, refreshItems }
)(StudentComplaintList);
