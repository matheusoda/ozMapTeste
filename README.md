# Projeto Full Stack com Node.js e MongoDB

## Índice
- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Licença](#licença)

---

## Sobre o Projeto

Este projeto é um sistema full-stack desenvolvido com **Node.js** no back-end, **TypeScript** para tipagem, **MongoDB** como banco de dados, e **Docker** para utilização de contêineres. Ele utiliza para identação e padronização de código **ESLint** e **Prettier**.


## Tecnologias Utilizadas

- Node.js: v20+
- TypeScript
- Mongoose / Typegoose para modelagem de banco de dados
- MongoDB: v7+
- Docker e Docker Compose
- ESLint + Prettier

## Pré-requisitos

- **Node.js** instalado (versão 20 ou superior).
- **Docker** e **Docker Compose** instalados.
- Editor de código como VSCode com extensões para **ESLint** e **Prettier**.

## Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/matheusoda/ozMapTeste
cd ozMapTeste
```

### 2. Configurando e instalando dependências de back-end 

Criar arquivo .env na pasta backend, e nela colocar as seguintes variáveis com os dados correspondentes.

```bash
MONGO_URI=mongodb://usuario:senha@localhost:27017/oz-tech-test?authSource=admin
GOOGLE_KEY=sua chave google
PORT=3003 (aqui você pode colocar a porta que vai rodar o back end)
```


Acesse a pasta backend e execute o comando:
```bash
npm install
docker-compose up -d
npm run dev
```

### 3. Instale dependências de front-end 

acesse a pasta frontend
```bash
npm install
npm run dev
```


## Uso
Você pode acessar:

Front-end: http://localhost:5173
Back-end: http://localhost:3003


## Estrutura do projeto
```bash
.
├── backend
│   ├── src
│   │   ├── models
│   │   ├── controllers
│   │   ├── routes
│   │   ├── services
│   │   └── utils
│   ├── package.json
│   ├── tsconfig.json
|   ├── docker-compose.yml
│   └── .env
├── frontend
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   └── services
│   ├── package.json
│   └── .env
```

## Licença

MIT License

Copyright (c) [2024] [Matheus Yuji Oda Kagohara]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
