import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHome(): string {
    const linha1 = "<h3>Bem vindo ao teste do cep!<h3><br><br>";
		const linha2 = "<h4>Digite o '/cep/{numeroCep} e retornaremos o endereço<h4>";
		const linha3 = "<h4>Digite o '/ceps?ibge=4412&uf=UF' e retornaremos todos os ceps da cidade (uf é opcional)<h4><br>";
		const linha4 = "<h5>Feito por: Patrick Brison Januario<h5>";
    return linha1+linha2+linha3+linha4;
  }
}
