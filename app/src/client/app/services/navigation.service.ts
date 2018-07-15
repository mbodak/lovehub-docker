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
    {
      name: 'Search',
      link: 'search',
    },
    {
      name: 'Profile',
      link: 'profile',
    },
    {
      name: 'Matching',
      link: 'user-match'
    },
    {
      name: 'Login/Register',
      link: 'register-full'
    },
  ];

  profileMenu = [
    {
      name: 'My profile',
      link: '/profile',
      icon: 'account_circle',
    },
    {
      name: 'Search people',
      link: '/search',
      icon: 'search',
    },
    {
      name: 'Matching',
      link: '/user-match',
      icon: 'star_half',
    },
    {
      name: 'Mutual likes',
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
