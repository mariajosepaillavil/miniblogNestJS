import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config'; //Directamente desde el paquete Nest, recién instalado
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { PostsModule } from './modules/posts/posts.module';
import { DatabaseModule } from './core/database/database.module';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    CoreModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    UsersModule,
    AuthModule,
    PostsModule,
    DatabaseModule,
  ],
})
export class AppModule {
  constructor() {
    console.log('Application module initialized');
  }

}

