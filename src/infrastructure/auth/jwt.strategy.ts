import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberEntity } from '../../entity/member/member.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(MemberEntity)
    private memberRepository: Repository<MemberEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'JWT_SECRET',
    });
  }

  async validate(payload: any) {
    const member = await this.memberRepository.findOne({ where: { email: payload.email } });

    if (!member) {
      return { id: payload.sub, email: payload.email };
    }

    return { id: member.id, name: member.name, email: member.email, role: member.role };
  }
}

