import React from 'react';
import {Route, Switch} from 'react-router-dom';
import FirstPage from './containers/FirstPage';
import RoleModal from './components/RoleModal';

const UrlRouter = () => (
	<div>
		<Switch>
			<Route exact path='/' component={FirstPage} />
			<Route exact path='/createRole/' component={RoleModal} />
		</Switch>
	</div>
)

export default (UrlRouter);
