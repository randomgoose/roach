import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

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
			{"title": "Daily Report", "content": "okay.."}
			
		]
		let documents = contentList.map((e) => <li key={contentList.indexOf(e)}>
			<a href='www.baidu.com'>
				{/* <FontAwesomeIcon icon={faFile} /> */}
				<div className='documentTitle'>{e.title}</div>
				<div className='documentExcerpt'>{e.content}</div>
			</a>
			</li>)

		return(
			<div id='sideBar' className={this.state.collapsed ? 'sideBar hidden' : 'sideBar shown'}>
				SideBar!
				<div id={'userStatus'} />
				<div id='documentContainer'>
					<ul>
						{documents}
					</ul>
				</div>
			</div>
		)
	}
}

export default SideBar;