import { Model } from 'mongoose';
import { Injectable, NotFoundException, HttpCode } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Cep } from './cep.model';

@Injectable()
export class CepService {

  constructor(
    @InjectModel('Cep') private readonly cepModel: Model<Cep>,){}

  async getAll(): Promise<Cep[]> {
      const todos = await this.cepModel.find();
      return todos.map(c => ({
        cep: c.cep,
        logradouro: c.logradouro,
        complemento: c.complemento,
        bairro: c.bairro,
        cidade: { 
                ibge: c.cidade.ibge,
                uf: c.cidade.uf,
                localidade: c.cidade.localidade,
            }
      }));
  }

  @HttpCode(204)
  async getCep(site: string, cep :string) : Promise<Cep>{
    const cepPure = cep.replace('-','');
    let cepSearch = await this.buscarCepBanco(cepPure);
    if(cepSearch === null){
        cepSearch = await this.buscarCepSite(cep, site+cepPure+'/json');
    }
    return this.ConvertToModel(cepSearch);
  }

  async ConvertToModel(cep: Cep) :Promise<Cep> {
    return {
        cep: cep.cep,
        logradouro: cep.logradouro,
        complemento: cep.complemento,
        bairro: cep.bairro,
        cidade: { 
                ibge: cep.cidade.ibge,
                uf: cep.cidade.uf,
                localidade: cep.cidade.localidade,
            }
    };
  }

  async buscarCepBanco(cep: string) :Promise<Cep> {
    let cepObj = null;
    try {
        cepObj = await this.cepModel.findOne({cep: cep});
    }
    catch(error)
    {
        cepObj = null;
    }
    return cepObj;
}

  @HttpCode(201)
  async buscarCepSite(cepString:string, caminho: string) :Promise<Cep> {
    try {
        const cep = (await axios.get(caminho)).data;
        const cepObj = new this.cepModel({
            cep: cepString,
            logradouro: cep.logradouro,
            complemento: cep.complemento,
            bairro: cep.bairro,
            cidade: { 
                    ibge: cep.ibge,
                    uf: cep.uf,
                    localidade: cep.localidade,
                }
        });

        cepObj.save();
        return cepObj;
      } catch(error) {
            throw new NotFoundException('Cep not fond');
      }
  }

  async getCeps(ibge: string, uf: string): Promise<string[]> {
      let result = [];
      if(!uf || 0 === uf.length)
        result = await this.cepModel.find({ "cidade.ibge": ibge });
      else
        result = await this.cepModel.find({ "cidade.ibge": ibge, "cidade.uf": uf.toUpperCase() });
    return await result.map(c => (c.cep));
  }
}
