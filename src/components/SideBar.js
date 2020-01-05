import React, { Component } from 'react';
import Library from './Library';
import Login from './Login';


class SideBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			collapsed: this.props.collapsed
		}
	}
	
	static getDerivedStateFromProps(props, state){
		return {
			collapsed: props.collapsed
		}
	}
	// componentWillReceiveProps({collapsed}) {
	// 	this.setState({
	// 		collapsed: this.props.collapsed
	// 	})
	//   }

	
	render(){
		console.log(this.state.collapsed);
		let contentList = [
			{"title": "Shopping List", "content": "yes!"},
			{"title": "Data Analysis", "content": "no!"},
			{"title": "Daily Report", "content": "okay.."},
			{"title": "Shopping List", "content": "yes!"},
			{"title": "Data Analysis", "content": "no!"},
			{"title": "Daily Report", "content": "okay.."},
			{"title": "Shopping List", "content": "yes!"},
			{"title": "Data Analysis", "content": "no!"},
			{"title": "Daily Report", "content": "okay.."},
			{"title": "Shopping List", "content": "yes!"},
			{"title": "Data Analysis", "content": "no!"},
			{"title": "Daily Report", "content": "okay.."}
		]
		let documents = contentList.map((e) => <li key={contentList.indexOf(e)}>
			<a href='#'>
				{/* <FontAwesomeIcon icon={faFile} /> */}
				<div className='documentTitle'>{e.title}</div>
				<div className='documentExcerpt'>{e.content}</div>
			</a>
			</li>)

		return(
			<div id='sideBar' className={this.state.collapsed ? 'sideBar hidden' : 'sideBar shown'}>
				{this.props.isLoggedIn ? <Library updateText={this.props.updateText} /> : <Login />}
			</div>
		)
	}
}

export default SideBar;