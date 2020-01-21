import React, { Component } from 'react';
import Library from './Library';
import Login from './Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Draggable from 'react-draggable';
import { UserContextConsumer } from './Context/UserContext';
import './SideBar.css';
// import { withToggle } from ;


class SideBar extends Component {

		constructor(props) {
			super(props);
			this.state = {
				collapsed: this.props.collapsed,
				fileList: []
			}

			this.updateFileList = (fileList) => {
				this.setState({
					fileList
				})
			}
		}

		static getDerivedStateFromProps(props, state) {
			return {
				collapsed: props.collapsed
			}
		}


		// componentWillReceiveProps({collapsed}) {
		// 	this.setState({
		// 		collapsed: this.props.collapsed
		// 	})
		//   }


		render() {
			return (
				<UserContextConsumer>
					{context => (
						<div id='sideBar' className={this.state.collapsed ? 'sideBar hidden' : 'sideBar shown'}>
						<Draggable>
							<div><button className='btn' id='signout' onClick={context.logout}><FontAwesomeIcon icon={faSignOutAlt} /></button></div>
						</Draggable>
						<div>{context.id}</div>
						{context.isLoggedIn ? <Library updateText={this.props.updateText} fileList={context.documents} /> : <Login updateFileList={this.updateFileList} />}
					</div>
					)}
				</UserContextConsumer>
			)
		}
	}

export default SideBar;