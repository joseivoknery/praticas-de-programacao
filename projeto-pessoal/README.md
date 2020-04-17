
# Faculdade de Ciências Socias Aplicadas - Unifacisa
# Sistemas de Informação 
## Práticas de Programação - Professor Bruno Catão
### Atividade de Integração entre Backend e Frontend (Projeto Pessoal) - 3 pontos
### José Ivo Koerich Nery - 182.308.00-07

# Frontend

## Para iniciar o projeto siga as instruções seguintes.

### Pré-requisitos

* [NodeJs](https://nodejs.org/pt-br)
* [Yarn](https://classic.yarnpkg.com/)

### Instalação
Após instalar todos os pré-requisitos necessários, execute os próximos passos para conseguir disponibilizar a aplicação no seu ambiente local de desenvolvimento.
```sh
# Clone o repositório do projeto
$ git clone https://github.com/joseivoknery/praticas-de-programacao.git
# Navegue até a pasta root do projeto frontend
$ cd praticas-de-programacao/projeto-pessoal/loja-frontend
# Instale todas as dependências
$ yarn install
```
## Executando a Aplicação
Importe o projeto em uma IDE de suas preferência.
> **importante:** Para o desenvolvimento do projeto base utilizei o VSCode.
Agora "suba" a aplicação-cliente na sua IDE.
```sh
$  yarn start
```

# Backend

## Para iniciar o projeto siga as instruções seguintes.

### Pré-requisitos

* [NodeJs](https://nodejs.org/pt-br)
* [Npm](https://www.npmjs.com/)
* [MongoDb](https://www.mongodb.com/)
* Se tiver o docker instalado (imagem do mongodb): 
```bash
docker run -it --rm -p 27017:27017 -p 28017:28017 -e AUTH=no mongo
```


### Instalação
Após instalar todos os pré-requisitos necessários, execute os próximos passos para conseguir disponibilizar a aplicação no seu ambiente local de desenvolvimento.
```sh
# Clone o repositório do projeto
$ git clone https://github.com/joseivoknery/praticas-de-programacao.git
# Navegue até a pasta root do projeto backend
$ cd praticas-de-programacao/projeto-pessoal/loja-backend
# Instale todas as dependências
$ npm install
```
## Executando a Aplicação
Importe o projeto em uma IDE de suas preferência.
> **importante:** Para o desenvolvimento do projeto base utilizei o VSCode.
Agora "suba" a aplicação-cliente na sua IDE.
```sh
$ npm start
```
## Environments
### Disponibilização do frontend
* [http://localhost:3000](http://localhost:3000)

### Disponibilização do backend | endpoints
* [http://localhost:5000](http://localhost:5000)
