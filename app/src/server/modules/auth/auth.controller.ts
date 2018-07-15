import {Body, Controller, HttpCode, HttpStatus, Post, Request, Response} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth')
  public async sign(@Body() body, @Response() res) {
    if (!body) {
      throw new Error('Missing Information');
    }

    const token = await this.authService.sign(body);
    res.status(HttpStatus.OK).json({ idToken : token });
  }
}
