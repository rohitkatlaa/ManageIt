import React, { Component , Fragment } from 'react';
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
import { filterItems } from '../actions/itemActions';

class FilterModal extends Component {
  state = {
    modal: false,
    PrimaryCategory: "All",
    subCategory: "All",
    status: "All",
    sortParams: "default",
    sortByUser: "All"
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      PrimaryCategory: "All",
      subCategory: "All",
      status: "All",
      sortParams: "default",
      sortByUser: "All"
  });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    var filter={
      PrimaryCategory: this.state.PrimaryCategory,
      subCategory: this.state.subCategory,
      status: this.state.status,
      sortParams: this.state.sortParams,
      sortByUser: this.state.sortByUser
    }
    this.props.filterItems(filter);

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
                <Input type="select" name="subCategory" onChange={this.onChange} value={this.state.subCategory}>
                  <option>All</option>
                  <option>Other</option>
                  <option>Room Cleaning</option>
                  <option>Electrical Appliance</option>
                </Input>
              </FormGroup>
            </Fragment>
    case 'Washroom': 
    return <Fragment>
            <FormGroup>
              <Label for="subCategory">Sub Category</Label>
              <Input type="select" name="subCategory" onChange={this.onChange} value={this.state.subCategory}>
                <option>All</option>
                <option>Other</option>
                <option>Hotwater</option>
                <option>No water</option>
                <option>Bathroom cleaning</option>
                <option>Broken faucet</option>
              </Input>
            </FormGroup>
          </Fragment>
    case 'Corridor amenities': 
    return <Fragment>
            <FormGroup>
              <Label for="subCategory">Sub Category</Label>
              <Input type="select" name="subCategory" onChange={this.onChange} value={this.state.subCategory}>
                <option>All</option>
                <option>Other</option>
                <option>Dustbins</option>
                <option>Corridor Cleaning</option>
                <option>Drinking Water</option>
              </Input>
            </FormGroup>
          </Fragment>
    case 'MPH': 
    return <Fragment>
            <FormGroup>
              <Label for="subCategory">Sub Category</Label>
              <Input type="select" name="subCategory" onChange={this.onChange} value={this.state.subCategory}>
                <option>All</option>
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
          <Button
            color='dark'
            style={{ marginBottom: '2rem' }}
            onClick={this.toggle}
          >
            Filter & Sort
          </Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Filter & Sort</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <FormGroup>
                  <Label for="itemCategory">Category</Label>
                  <Input type="select" name="PrimaryCategory" onChange={this.onChange} value={this.state.PrimaryCategory}>
                    <option>All</option>
                    <option>Other</option>
                    <option>Room</option>
                    <option>Washroom</option>
                    <option>Corridor amenities</option>
                    <option>MPH</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="itemCategory">Status</Label>
                  <Input type="select" name="status" onChange={this.onChange} value={this.state.status}>
                    <option>All</option>
                    <option>pending</option>
                    <option>inProgress</option>
                    <option>completed</option>
                  </Input>
                </FormGroup>
                { this.renderPrimarySwitch() }
                <FormGroup>
                <Label for="itemCategory">Sort Based on Condition</Label>
                  <Input type="select" name="sortParams" onChange={this.onChange} value={this.state.sortParams}>
                    <option>default</option>
                    <option>mostVotes</option>
                    <option>leastVotes</option>
                    <option>latestComplain</option>
                    <option>oldestComplain</option>
                  </Input>
                </FormGroup>
                {
                 (this.props.isAuthenticated) ? 
                  <FormGroup>
                    <Label for="itemCategory">Filter Based On User</Label>
                    <Input type="select" name="sortByUser" onChange={this.onChange} value={this.state.sortByUser}>
                      <option>All</option>
                      <option>MyComplains</option>
                    </Input>
                  </FormGroup>
                  :
                  ""
                  }
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Filter & Sort
                </Button>

              </FormGroup>
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
  { filterItems }
)(FilterModal);