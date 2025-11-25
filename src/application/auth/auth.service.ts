import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from "typeorm";
import { UserEntity } from "../../entity/user/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { LogindDto } from "./dto/LogindDto";
import { LoginResponse } from "./response/LoginResponse";
import { MemberEntity } from "../../entity/member/member.entity";

@Injectable()
export class AuthServiceImplemantation  {

  constructor(
    @InjectRepository(UserEntity) private userRepository : Repository<UserEntity>,
    @InjectRepository(MemberEntity) private memberRepository : Repository<MemberEntity>,
    private jwtService: JwtService,
  ) {}

  async login(login: LogindDto): Promise<LoginResponse & { user: any }> {
    const user = await this.userRepository.findOne({ where: { email: login.email }});

    if (!user) {
      throw new UnauthorizedException('O email ou senha estão incorretos');
    }

    const senhaInserida = login.password;
    const senhaHash = user.password;

    const usuarioAutenticado = await bcrypt.compare(senhaInserida, senhaHash);

    if (!usuarioAutenticado) {
      throw new UnauthorizedException('O email ou senha estão incorretos');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    // Busca MemberEntity por email (Opção A)
    const member = await this.memberRepository.findOne({ where: { email: user.email } });

    const userInfo = member
      ? { id: member.id, name: member.name, email: member.email, role: member.role }
      : { id: user.id, email: user.email };

    return {
      accessToken: token,
      user: userInfo,
    };
  }
}

