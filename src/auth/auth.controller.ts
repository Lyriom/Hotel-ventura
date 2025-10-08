import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    // crea usuario nuevo (email único + password hasheado)
    const user = await this.auth.signup(dto.email, dto.password);
    return { message: 'Usuario creado', user };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    // valida credenciales y devuelve token
    return this.auth.login(dto.email, dto.password);
  }
}
