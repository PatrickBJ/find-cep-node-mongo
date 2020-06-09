import { Controller, Get, Param, Query, BadRequestException, HttpCode, Res } from '@nestjs/common';
import { CepService } from './cep.service';
import { Cep } from './cep.model';
const config = require('../../config');

@Controller()
export class CepController {
  constructor(private readonly appService: CepService) {
  }

  @Get("cep/all")
  getAll(): Promise<Cep[]> {
    return this.appService.getAll();
  }

  @Get("cep/:cep")
  getCep(@Param() params): Promise<Cep> {
    return this.appService.getCep(config.site_buca, params.cep);
  }

  @Get("ceps")
  getCeps(@Query('ibge') ibge, @Query('uf') uf): Promise<string[]> {
      if(ibge == null)
        throw new BadRequestException('ibge inválido');
      return this.appService.getCeps(ibge, uf);
  }
}