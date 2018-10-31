import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {
  menu = [
    {
      name: 'Home',
      link: 'home'
    },
    {
      name: 'Contact',
      link: 'contact',
    },
  ];

  profileMenu = [
    {
      name: 'Search People',
      link: '/search',
      icon: 'search',
    },
    {
      name: 'Matches',
      link: '/user-match',
      icon: 'star_half',
    },
    {
      name: 'Connections',
      link: '/likes',
      icon: 'favorite',
    },
    {
      name: 'Chats',
      link: '/chat',
      icon: 'chat',
    },
  ];


  constructor() { }

  getMenuItems(): object[] {
    return this.menu;
  }

  getProfileMenuItems(): object[] {
    return this.profileMenu;
  }
}
