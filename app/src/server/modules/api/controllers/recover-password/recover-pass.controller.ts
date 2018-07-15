import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Res} from '@nestjs/common';
import {RecoverPassService} from './recover-pass.service';

@Controller('api/forgot')
export class RecoverPassController {

  constructor(private readonly recPassService: RecoverPassService) {}

  @Post()
  async recoverPass(@Body() body, @Res() res) {
    try {
      const {email} = body;
      const result = await this.recPassService.recoverPassByEmail(email);

      res.status(HttpStatus.OK).send(result);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send(error);
    }
  }

  @Get(':token')
  async checkTokenStatus(@Param() params, @Res() res) {
    try {
      const result = await this.recPassService.validate(params.token);

      res.status(HttpStatus.OK).send(result);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Post(':token')
  async changeUserPassword(@Body() body, @Param() params, @Res() res) {
    try {
      const { password } = body;
      const result = await this.recPassService.updateUserPassword(params.token, password);
      const message = result ? {message: 'Password successfully changed'} :
        {error: 'Something went wrong, password no changed'};

      res.status(HttpStatus.OK).send(message);
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).send(error);
    }
  }
}
