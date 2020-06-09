import { Module } from '@nestjs/common';
import { CepController } from './cep.controller';
import { CepService } from './cep.service';
import { MongooseModule } from '@nestjs/mongoose';
import { cepSchema } from './cep.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Cep', schema: cepSchema}])],
  controllers: [CepController],
  providers: [CepService],
})
export class CepModule {}