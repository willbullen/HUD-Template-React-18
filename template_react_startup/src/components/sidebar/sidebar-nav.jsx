import React, { useEffect } from 'react';
import { useResolvedPath, useMatch, NavLink, useLocation, matchPath } from 'react-router-dom';
import menus from './../../config/app-menu.jsx';
import { slideUp } from './../../composables/slideUp.js';
import { slideToggle } from './../../composables/slideToggle.js';

function NavItem({ menu, ...props }: LinkProps) {
	let path = (menu.path) ? menu.path : '';
	let resolved = useResolvedPath(path);
  let match = useMatch({ path: resolved.pathname });
	let location = useLocation();
	
	useEffect(() => {
		const handleClick = function (e) {
			e.preventDefault();
			const target = this.nextElementSibling;
			
			// Only close siblings at the same level
			const parentMenu = this.closest('.menu-submenu') || this.closest('.menu');
			const siblingMenus = parentMenu ? Array.from(parentMenu.children) : [];
	
			siblingMenus.forEach((menu) => {
				const otherTarget = menu.querySelector('.menu-submenu');
				if (otherTarget && otherTarget !== target) {
					slideUp(otherTarget, expandTime);
					
					const otherTargetMenuItem = otherTarget.closest('.menu-item');
					if (otherTargetMenuItem && otherTargetMenuItem.classList) {
						otherTargetMenuItem.classList.remove('expand');
						otherTargetMenuItem.classList.add('closed');
					}
				}
			});
	
			const targetItemElm = target?.closest('.menu-item');
			if (targetItemElm && targetItemElm.classList) {
				if (
					targetItemElm.classList.contains('expand') ||
					(targetItemElm.classList.contains('active') && !target.style.display)
				) {
					targetItemElm.classList.remove('expand');
					targetItemElm.classList.add('closed');
					slideToggle(target, expandTime);
				} else {
					targetItemElm.classList.add('expand');
					targetItemElm.classList.remove('closed');
					slideToggle(target, expandTime);
				}
			}
		};
	
		const handleSidebarMenuToggle = (menus, expandTime) => {
			menus.forEach((menu) => {
				menu.removeEventListener('click', handleClick); // Ensure old listeners are removed
				menu.addEventListener('click', handleClick);
			});
		};
	
		// Get sidebar expand time
		const expandTime = 0;
	
		const menuBaseSelector = '.app-sidebar .menu > .menu-item.has-sub';
		const submenuBaseSelector = ' > .menu-submenu > .menu-item.has-sub';
		
		// Select menu items
		const menus = Array.from(document.querySelectorAll(menuBaseSelector + ' > .menu-link'));
		const submenusLvl1 = Array.from(document.querySelectorAll(menuBaseSelector + submenuBaseSelector + ' > .menu-link'));
		const submenusLvl2 = Array.from(
			document.querySelectorAll(menuBaseSelector + submenuBaseSelector + submenuBaseSelector + ' > .menu-link')
		);
	
		handleSidebarMenuToggle([...menus, ...submenusLvl1, ...submenusLvl2], expandTime);
	
		return () => {
			[...menus, ...submenusLvl1, ...submenusLvl2].forEach((menu) => {
				menu.removeEventListener('click', handleClick);
			});
		};
	}, []);
	
	if (menu.is_header) {
		return (
			<div className="menu-header">{ menu.title }</div>
		);
	}
	
	if (menu.is_divider) {
		return (
			<div className="menu-divider"></div>
		);
	}
  
	let match2 = matchPath({path: path, end: false, },location.pathname);

	let icon = menu.icon && <div className="menu-icon"><i className={menu.icon}></i></div>;
	let img = menu.img && <div className="menu-icon-img"><img src={menu.img} alt="" /></div>;
	let caret = (menu.children && !menu.badge) && <div className="menu-caret"><b className="caret"></b></div>;
	let label = menu.label && <span className="menu-label ms-5px">{menu.label}</span>;
	let badge = menu.badge && <div className="menu-badge">{menu.badge}</div>;
	let highlight = menu.highlight && <i className="fa fa-paper-plane text-theme"></i>;
	let title = menu.title && <div className="menu-text">{menu.title} {label} {highlight}</div>;
	
	return (
		<div className={'menu-item' + ((match || match2) ? ' active' : '') + (menu.children ? ' has-sub' : '')}>
			<NavLink className="menu-link" to={menu.path} {...props}>
				{ img } { icon } { title }{ caret } { badge }
			</NavLink>
		
			{menu.children && (
				<div className="menu-submenu">
					{menu.children.map((submenu, i) => (
						<NavItem key={i} menu={submenu} />
					))}
				</div>
			)}
		</div>
	);
}

function SidebarNav() {
	return (
		<div className="menu">
			{menus.map((menu, i) => (
				<NavItem key={i} menu={menu} />
			))}
		</div>
	);
}

export default SidebarNav;