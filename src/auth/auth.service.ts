import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // más adelante inyectarás UsersService y JwtService en el constructor

  async signup(email: string, password: string) {
    // 1) verificar si ya existe el email (UsersService)
    // 2) si no existe, crear usuario (UsersService.create hasheando password)
    // 3) retornar datos sin password
    return { ok: true }; // placeholder para compilar
  }

  async login(email: string, password: string) {
    // 1) buscar usuario por email (UsersService)
    // 2) comparar password (bcrypt.compare)
    // 3) si coincide, firmar token (JwtService.signAsync)
    // 4) retornar { access_token }
    return { access_token: '' }; // placeholder para compilar
  }
}
