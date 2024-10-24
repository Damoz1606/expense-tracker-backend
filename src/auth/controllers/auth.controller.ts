import { Controller, Get, HttpCode, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import { plainToInstance } from 'class-transformer';
import { TokenRSDto } from '../dto/response/token.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginAuth } from '../dto/request/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @ApiBody({ type: LoginAuth })
  @Post('login')
  async login(
    @CurrentUser() user: number
  ): Promise<TokenRSDto> {
    const access = await this.authService.login(user);
    return plainToInstance(TokenRSDto, { access });
  }

  @Get('code/:key')
  async validateNewCredential(
    @Param('key') key: string
  ): Promise<any> {
    await this.authService.activate(key);
    return '';
  }
}
