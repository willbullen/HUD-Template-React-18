import React, { useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SidebarNav from './sidebar-nav.jsx';

function Sidebar() {
	useEffect(() => {
		document.querySelector('body').classList.add('app-init');
	}, []);
	
	const toggleAppSidebarMobile = () => {
		var elm = document.querySelector('.app');
		elm.classList.toggle('app-sidebar-mobile-toggled');
	}
		
	return (
		<React.Fragment>
			<div id="sidebar" className="app-sidebar">
				<PerfectScrollbar className="app-sidebar-content" options={{suppressScrollX: true}}>
					<SidebarNav />
					<div className="p-3 px-4 mt-auto">
						<a href="https://seantheme.com/hud-react/documentation/index.html" rel="noreferrer" target="_blank" className="btn d-block btn-outline-theme">
							<i className="fa fa-code-branch me-2 ms-n2 opacity-5"></i> Documentation
						</a>
					</div>
				</PerfectScrollbar>
			</div>
			<button className="app-sidebar-mobile-backdrop" onClick={toggleAppSidebarMobile}></button>
		</React.Fragment>
	)
}

export default Sidebar;
