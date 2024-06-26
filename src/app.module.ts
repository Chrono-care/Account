import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fsStore from 'cache-manager-fs-hash';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({
      store: fsStore,
      path: 'cache',
      ttl: 3600 * 24, // seconds
      isGlobal: true,
    }),
    //TypeOrmModule.forRootAsync({
    //  imports: [ConfigModule],
    //  useFactory: (configService: ConfigService) => ({
    //    type: 'postgres',
    //    host: configService.get('POSTGRES_DB_HOST'),
    //    port: configService.get('POSTGRES_DB_PORT'),
    //    username: configService.get('POSTGRES_DB_USER'),
    //    password: configService.get('POSTGRES_DB_PASS'),
    //    database: configService.get('POSTGRES_DB_NAME'),
    //    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //    synchronize: true,
    //  }),
    //  inject: [ConfigService],
    //}),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
