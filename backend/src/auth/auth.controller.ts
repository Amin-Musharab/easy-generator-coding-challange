import { Body, Controller, Post, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './signup.dto';
import { LoginDTO } from './login.dto';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name);

  @Post('signup')
  async signUp(@Body() SignUp: SignUpDto) {
    const user = await this.authService.create(SignUp);
    const payload = {
      email: user.email,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('signin')
  async signIn(@Body() LoginDTO: LoginDTO) {
    const user = await this.authService.findByLogin(LoginDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
