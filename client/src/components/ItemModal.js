import React, { Component, Fragment } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import defaultImg from './assets/default-img.jpg';


class ItemModal extends Component {
  state = {
    modal: false,
    PrimaryCategory: "Other",
    subCategory: "",
    roomNum: "",
    complainDesc: "",
    photoTake: false,
    imageData: defaultImg,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      PrimaryCategory: "Other",
      complainDesc: "",
      photoTake: false,
      imageData: defaultImg
    });
  };

  takePhoto = () => {
    this.setState({
      modal: false,
      photoTake: true
    })
  }

  handleTakePhoto = dataURI => {
    this.setState({
      modal: true,
      imageData: dataURI,
      photoTake: false
    })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    var newItem = {
      userEmail: this.props.userEmail,
      PrimaryCategory: this.state.PrimaryCategory,
      status: "pending"
    };

    if(this.state.imageData!==defaultImg){
      newItem.imageData=this.state.imageData;
    }

    if(this.state.PrimaryCategory!=='Other'){
      if(this.state.subCategory===""){
        newItem.subCategory="Other"
      }
      else{
        newItem.subCategory=this.state.subCategory;
      }
      if(this.state.roomNum!==""){
        console.log("hi")
        newItem.roomNum=this.state.roomNum;
      }
      else{
        newItem.roomNum="000";
      }
    }
    else{
      newItem.roomNum="000";
      newItem.subCategory="none";
    }

    if(this.state.complainDesc!==""){
      newItem.complainDesc=this.state.complainDesc;
    }

    // Add item via addItem action
    this.props.addItem(newItem);

    // Close modal
    this.toggle();
  };

  renderPrimarySwitch() {
    switch(this.state.PrimaryCategory) {
      case 'Other': 
        return <Fragment>
              </Fragment>
      case 'Room': 
      return <Fragment>
              <FormGroup>
                <Label for="subCategory">Sub Category</Label>
                <Input type="select" name="subCategory" onChange={this.onChange}>
                  <option>Other</option>
                  <option>Room Cleaning</option>
                  <option>Electrical Appliance</option>
                </Input>
              </FormGroup>
              <FormGroup>
              <Label for='RoomNum'>Room Number</Label><span style={{color: "red"}}>*</span>
              <Input
                type='text'
                name='roomNum'
                value={this.state.roomNum ? this.state.roomNum : ""}
                placeholder='Enter the room number'
                onChange={this.onChange}
              />
              </FormGroup>
            </Fragment>
    case 'Washroom': 
    return <Fragment>
            <FormGroup>
              <Label for="subCategory">Sub Category</Label>
              <Input type="select" name="subCategory" onChange={this.onChange}>
                <option>Other</option>
                <option>Hotwater</option>
                <option>No water</option>
                <option>Bathroom cleaning</option>
                <option>Broken faucet</option>
              </Input>
            </FormGroup>
            <FormGroup>
            <Label for='RoomNum'>Room Number adjacent to the Bathroom</Label><span style={{color: "red"}}>*</span>
            <Input
              type='text'
              name='roomNum'
              value={this.state.roomNum ? this.state.roomNum : ""}
              placeholder='Enter the room number'
              onChange={this.onChange}
            />
            </FormGroup>
          </Fragment>
    case 'Corridor amenities': 
    return <Fragment>
            <FormGroup>
              <Label for="subCategory">Sub Category</Label>
              <Input type="select" name="subCategory" onChange={this.onChange}>
                <option>Other</option>
                <option>Dustbins</option>
                <option>Corridor Cleaning</option>
                <option>Drinking Water</option>
              </Input>
            </FormGroup>
            <FormGroup>
            <Label for='RoomNum'>Room Number adjacent to the Problem</Label><span style={{color: "red"}}>*</span>
            <Input
              type='text'
              name='roomNum'
              value={this.state.roomNum ? this.state.roomNum : ""}
              placeholder='Enter the room number'
              onChange={this.onChange}
            />
            </FormGroup>
          </Fragment>
    case 'MPH': 
    return <Fragment>
            <FormGroup>
              <Label for="subCategory">Sub Category</Label>
              <Input type="select" name="subCategory" onChange={this.onChange}>
                <option>Other</option>
                <option>Gym</option>
              </Input>
            </FormGroup>
          </Fragment>
    default:
      return <Fragment/>
    }
  }

  render() {
    return (
      <div>
        { this.state.photoTake ? 
          <div style={{position: "absolute", left:"0",top:"0",zIndex:2, width:"100%",height:"100%",backgroundColor:"black"}}>
            <Camera 

              isFullScreen={true}
              onTakePhotoAnimationDone={this.handleTakePhoto}
              // idealResolution = {{width: 400, height: 400}}
              isMaxResolution = {false}
            />
          </div>
          :
          <Fragment/>
        }
        {this.props.isAuthenticated ? (
          <Button
            color='dark'
            style={{ marginBottom: '2rem' }}
            onClick={this.toggle}
          >
            Add Complain
          </Button>
        ) : (
          <h4 className='mb-3 ml-4'>Please log in to manage items</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add a Complain</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="itemCategory">Category</Label>
                <Input type="select" name="PrimaryCategory" onChange={this.onChange}>
                  <option>Other</option>
                  <option>Room</option>
                  <option>Washroom</option>
                  <option>Corridor amenities</option>
                  <option>MPH</option>
                </Input>
              </FormGroup>
              { this.renderPrimarySwitch() }
              <FormGroup>
                <Label for="itemDesc">Optional Description</Label>
                <Input 
                  type="textarea"
                  name="complainDesc" 
                  onChange={this.onChange}
                  placeholder="Enter a short Description"
                  />
              </FormGroup>
              <FormGroup>
                <Button onClick={this.takePhoto}>Take photo</Button>
                <br/>
                <br/>
                <img src={this.state.imageData} alt="upload-image" width="250px" height="250px"/>
              </FormGroup>
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Add Complain
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
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
  { addItem }
)(ItemModal);
