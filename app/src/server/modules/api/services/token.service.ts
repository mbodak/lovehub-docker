import { Component } from '@nestjs/common';
import * as crypto from 'crypto';
import {RecoverPassEntity} from '../controllers/recover-password/recover-pass.entity';
import { Inject } from '@nestjs/common';

@Component()
export class TokenService {

  constructor(@Inject('RecoverPassRepository') private readonly recoverPassRepository: typeof RecoverPassEntity) {}

  async generateToken() {
    try {
      const buf = await crypto.randomBytes(20);
      const token = buf.toString('hex');

      return token;
    } catch (error) {
      console.log(error);
    }
  }

  async create(userId: number, token: string) {
    const recPassEntity = new RecoverPassEntity();
    recPassEntity.token = token;
    recPassEntity.date = Date.now() + '';
    recPassEntity.userId = userId;
    recPassEntity.used = false;

    return await recPassEntity.save();
  }

  async findTokenByValue(value: string): Promise<RecoverPassEntity> {
    return await this.recoverPassRepository.findOne({where: {token: value}});
  }

  async updateTokenStatus(value: string) {
    return await this.recoverPassRepository.update({used: true}, {where: {token: value}});
  }

  async isTokenUsed(value: string): Promise<boolean> {
    const token = await this.findTokenByValue(value);
    const isUsed = token.used;

    return isUsed;
  }

  async isTokenValid(value: string): Promise<boolean> {
    const token = await this.findTokenByValue(value);
    const currDate = Date.now();
    if (currDate - (+token.date) > 300000) {
      return false;
    }

    return true;
  }
}
