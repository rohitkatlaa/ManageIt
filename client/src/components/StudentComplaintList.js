import React, { Component, Fragment } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem , refreshItems, upVote} from '../actions/itemActions';
import PropTypes from 'prop-types';
import { FaArrowUp } from 'react-icons/fa';


class StudentComplaintList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems();
  }

  upVoteClick = (id,userIdList) => {
    // console.log("hi")
    if(!userIdList.includes(this.props.userId)){
      this.props.upVote(id,this.props.userId)
    }
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
    console.log(items)
    const unfiltereditems=items;
    const { filterPrimaryCategory } = this.props.item;
    const { filterSubCategory } = this.props.item;
    const { filterStatus } = this.props.item;
    var finalItems=[];
    var unfiltereditems2=[];
    if(filterStatus!=="All" && unfiltereditems){
      var x;
      for(x in unfiltereditems){
        if(unfiltereditems[x].status===filterStatus){
          unfiltereditems2.push(unfiltereditems[x])
        }
      }
    }
    else{
      unfiltereditems2=unfiltereditems;
    }
    if(filterPrimaryCategory!=="All" && unfiltereditems2){
      var y;
      for(y in unfiltereditems2){
        if(filterSubCategory!=="All"){
          if(unfiltereditems2[y].PrimaryCategory===filterPrimaryCategory && unfiltereditems2[y].subCategory===filterSubCategory){
            finalItems.push(unfiltereditems2[y])
          }
        }
        else{
          if(unfiltereditems2[y].PrimaryCategory===filterPrimaryCategory){
            finalItems.push(unfiltereditems2[y])
          }
        }
      }
    }
    else{
      finalItems=unfiltereditems2;
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
                      <ListGroupItem style={{border: "none"}}>
                        Status: {item.status}
                      </ListGroupItem>
                      <ListGroupItem style={{border: "none"}}>
                        <a onClick={this.upVoteClick.bind(this, item._id,item.voteUserId)} style={{cursor: item.voteUserId.includes(this.props.userId) ? "default": "pointer",opacity: item.voteUserId.includes(this.props.userId) ? 0.4:1}}><FaArrowUp/></a> &nbsp; {item.voteUserId.length}
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
  userId: state.auth.user ?  state.auth.user._id : null,
  userEmail: state.auth.user ?  state.auth.user.email : null,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem, refreshItems, upVote }
)(StudentComplaintList);
