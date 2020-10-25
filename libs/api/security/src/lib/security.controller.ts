import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrors } from '@post-rest-api/common';
import {
  LoginParamsDto,
  RegisterParamsDto,
  TokenResultDto,
} from '@post-rest-api/dtos';
import { SecurityService } from './security.service';

@ApiTags('Security')
@ApiErrors()
@Controller('securities')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post('register')
  @ApiCreatedResponse()
  async register(@Body() dto: RegisterParamsDto): Promise<void> {
    return await this.securityService.register(dto);
  }

  @Post('login')
  @ApiCreatedResponse({ type: TokenResultDto })
  async login(@Body() dto: LoginParamsDto): Promise<TokenResultDto> {
    return await this.securityService.login(dto);
  }
}
