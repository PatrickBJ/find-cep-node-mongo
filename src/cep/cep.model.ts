import * as mongoose from 'mongoose';

const cidadeSchema = new mongoose.Schema({
    ibge: { type: String, required: true, maxlength: 20 },
    uf: { type: String, required: true, minlength:2, maxlength: 2 },
    localidade: { type: String, required: true, maxlength: 100 },
});

export const cepSchema = new mongoose.Schema({
    cep: { type: String, required: true, minlength: 8, maxlength: 10 },
    logradouro: { type: String, required: true, maxlength: 255 },
    complemento: { type: String, maxlength: 255 },
    bairro: { type: String, maxlength: 50 },
    cidade: { type: cidadeSchema, required: true },
}, {timestamps: {}});

export interface Cep{
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    cidade: { 
        ibge: string;
        uf: string;
        localidade: string;
    };
}