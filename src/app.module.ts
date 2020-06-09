import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CepModule } from './cep/cep.module';

@Module({
  imports: [CepModule, MongooseModule.forRoot(
    'mongodb+srv://rw-user:eNTNEdlOhiCJHsv4@cluster0-cxem2.mongodb.net/dbcep?retryWrites=true&w=majority'
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
