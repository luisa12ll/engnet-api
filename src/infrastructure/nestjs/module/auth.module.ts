import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthController} from "../../../controllers/auth.controllers";
import {AuthServiceImplemantation} from "../../../application/auth/auth.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../../../entity/user/user.entity";
import {JwtStrategy} from "../../../infrastructure/auth/jwt.strategy";
import {MemberEntity} from "../../../entity/member/member.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, MemberEntity]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET') || 'JWT_SECRET',
            signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '3600s' },
        }),
    }),
    ],
    controllers: [AuthController],
    providers: [AuthServiceImplemantation, JwtStrategy],
    exports: [AuthServiceImplemantation],
})
export class AuthModule {}
