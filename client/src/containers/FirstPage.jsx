import React, {Component} from 'react';
import AppNavbar from '../components/AppNavbar';
import ComplaintList from '../components/ComplaintList';
import ItemModal from '../components/ItemModal';
import FilterModal from '../components/FilterModal';
import { Container } from 'reactstrap';

class FirstPage extends Component {

  render() {
    return (
      <div>
      	<Container>
            <AppNavbar />
            <FilterModal/>
            <ItemModal />
            <ComplaintList/>
          </Container>
      </div>
    );
  }
}
export default FirstPage;