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
    name: '',
    photoTake: false,
    imageData: defaultImg,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      name: "",
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
      name: this.state.name
    };

    if(this.state.imageData!==defaultImg){
      newItem.imageData=this.state.imageData;
      // console.log(this.state.imageData)
      // console.log(newItem)
    }

    // Add item via addItem action
    this.props.addItem(newItem);

    // Close modal
    this.toggle();
  };

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
                <Label for='item'>Complain</Label>
                <Input
                  type='text'
                  name='name'
                  id='item'
                  value={this.state.name ? this.state.name : ""}
                  placeholder='Add a Complain'
                  onChange={this.onChange}
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
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
