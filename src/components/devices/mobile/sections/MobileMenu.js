import {
  ChartBarIcon as Chart,
  ClipboardListIcon as Clipboard,
  HomeIcon as Home,
} from '@heroicons/react/outline';
import {
  ChartBarIcon as ChartSolid,
  ClipboardListIcon as ClipboardSolid,
  HomeIcon as HomeSolid,
} from '@heroicons/react/solid';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { NavLink, useRouteMatch } from 'react-router-dom';

export default function MobileMenu() {
  let { path } = useRouteMatch();

  const menus = [
    {
      link: '/',
      name: 'Home',
      icon: Home,
      iconActive: HomeSolid,
    },
    {
      link: '/approval',
      name: 'Pengajuan',
      icon: Clipboard,
      iconActive: ClipboardSolid,
    },
    {
      link: '/dashboard',
      name: 'Dashboard',
      icon: Chart,
      iconActive: ChartSolid,
    },
  ];

  return (
    isMobile && (
      <div className="fixed z-30 bottom-0 inset-x-0 ">
        <div className="bg-white shadow-2xl flex justify-evenly items-center lg:mx-4 px-6 mb-0 py-1 border-t-2 border-gray-200 border-opacity-50">
          {menus.map((menu) => (
            <NavLink
              key={Math.random()}
              to={menu.link}
              exact={true}
              className={[
                'rounded-md p-2 text-gray-300 transition-all duration-300 ease-in-out',
                path === menu.link
                  ? 'text-apps-primary font-medium'
                  : 'text-gray-300 font-light',
              ].join(' ')}>
              {path === menu.link ? (
                <menu.iconActive className="h-5 w-5 mx-auto" />
              ) : (
                <menu.icon className="h-5 w-5 mx-auto" />
              )}
              <p className="text-xs mt-1">{menu.name}</p>
            </NavLink>
          ))}
        </div>
      </div>
    )
  );
}
