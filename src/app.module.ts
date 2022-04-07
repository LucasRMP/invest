import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './resources/products/products.module';
import { PosgresDatabaseProviderModule } from './providers/database/postgres/provider.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PosgresDatabaseProviderModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
