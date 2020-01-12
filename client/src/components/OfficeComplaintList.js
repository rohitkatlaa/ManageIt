import React, { Component, Fragment } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Collapse } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem , refreshItems, statusChange} from '../actions/itemActions';
import PropTypes from 'prop-types';
import Pusher from 'pusher-js';
import config from '../config/key'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';


class OfficeComplaintList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
  };

  state = {
      expandId : []
  }

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

  setExpand(id){
    return this.state.expandId.includes(id);
  }

  expand = (id) => {
    var array = this.state.expandId;
    const index = array.indexOf(id);
    if (index > -1) {
      array.splice(index, 1);
    }
    else{
      array.push(id);
    }
    this.setState({expandId:array});
  }  


  onStatusChangeClick(status,id){
    const data={
      status: status
    }
    this.props.statusChange(data,id);
  }

  render() {
    const { items } = this.props.item;
    const unfiltereditems=items;
    const { filterPrimaryCategory } = this.props.item;
    const { filterSubCategory } = this.props.item;
    const { filterStatus } = this.props.item;
    const { sortParams } = this.props.item;
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
    if(sortParams==="default"){
      finalItems.sort(function(a,b){return new Date(b.date)-new Date(a.date)})
    }
    else if(sortParams==="mostVotes"){
      finalItems.sort(function(a,b){return b.voteUserId.length-a.voteUserId.length})
    }
    else if(sortParams==="leastVotes"){
      finalItems.sort(function(a,b){return a.voteUserId.length-b.voteUserId.length})
    }
    else if(sortParams==="latestComplain"){
      finalItems.sort(function(a,b){return new Date(b.date)-new Date(a.date)})
    }
    else if(sortParams==="oldestComplain"){
      finalItems.sort(function(a,b){return new Date(a.date)-new Date(b.date)})
    }
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className='complain-list'>
            {finalItems && finalItems.map( item => (
              <CSSTransition key={item._id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  <ListGroup>
                      <ListGroupItem style={{border: "none"}} className="d-none d-md-block"> 
                        <Button
                          className='remove-btn float-right'
                          color='danger'
                          size='sm'
                          onClick={this.onDeleteClick.bind(this, item._id)}
                        >
                          Delete
                        </Button>
                        { item.status==="pending" &&
                        <Button
                          className='remove-btn float-right'
                          color='primary'
                          size='sm'
                          onClick={this.onStatusChangeClick.bind(this,"inProgress",item._id)}
                        >
                          Change status to In Progress
                        </Button>
                        }
                        { item.status==="inProgress" &&
                        <Button
                          className='remove-btn float-right'
                          color='primary'
                          size='sm'
                          onClick={this.onStatusChangeClick.bind(this,"completed",item._id)}
                        >
                          Change status to Completed
                        </Button>
                        }
                        Category: {item.PrimaryCategory}
                      </ListGroupItem>
                      <ListGroupItem style={{border: "none"}} className="d-md-none"> 
                        <Button
                          className='remove-btn float-right'
                          color='danger'
                          size='sm'
                          onClick={this.onDeleteClick.bind(this, item._id)}
                        >
                          Delete
                        </Button>
                        { item.status==="pending" &&
                        <Button
                          className='remove-btn'
                          color='primary'
                          size='sm'
                          onClick={this.onStatusChangeClick.bind(this,"inProgress",item._id)}
                        >
                          In Progress
                        </Button>
                        }
                        { item.status==="inProgress" &&
                        <Button
                          className='remove-btn'
                          color='primary'
                          size='sm'
                          onClick={this.onStatusChangeClick.bind(this,"completed",item._id)}
                        >
                          Completed
                        </Button>
                        }
                      </ListGroupItem>
                      <ListGroupItem style={{border: "none"}} className="d-md-none"> 
                        Category: {item.PrimaryCategory}
                      </ListGroupItem>
                      
                      { item.subCategory!=="none" ?
                        <ListGroupItem style={{border: "none"}}>
                          SubCategory: {item.subCategory}
                        </ListGroupItem>
                        :
                        <Fragment/>
                      }
                      <ListGroupItem style={{border: "none"}}>
                          Created: { this.displayDate(item.date) }
                      </ListGroupItem>
                      {this.setExpand(item._id) ?
                      <Collapse isOpen={true}>
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
                          Status: {item.status}
                        </ListGroupItem>
                        <ListGroupItem style={{border: "none"}}>
                            <a className = "float-right" onClick={this.expand.bind(this, item._id)} style={{cursor: "pointer",opacity:1}}><FaChevronUp/></a> 
                      </ListGroupItem>
                       </Collapse>
                       :
                      <ListGroupItem style={{border: "none"}}>
                            <a className = "float-right" onClick={this.expand.bind(this, item._id)} style={{cursor: "pointer",opacity:1}}><FaChevronDown/></a> 
                      </ListGroupItem>
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
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem, refreshItems, statusChange }
)(OfficeComplaintList);
