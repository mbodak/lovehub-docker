import { Component } from '@nestjs/common';
import { User } from './User';

@Component()
export class UsersServiceComponent {
  private readonly users: User[] = [];

  create(user: User) {
    this.users.push(user);
  }

  findAll(): User[] {
    return this.users;
  }
}
