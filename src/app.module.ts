import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products/products.controllers';
import { ProductsModule } from './products/products.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import 'dotenv/config'


@Module({
  imports: [MongooseModule.forRoot(process.env.URL_MONGODB),
    ServeStaticModule.forRoot({
      serveRoot: '/upload',
      rootPath: join(__dirname, '..', 'upload')
    }),
     ProductsModule],
 
})
export class AppModule {}
