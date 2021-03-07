# APP: Lista de Livros 

## Objetivo:
- Listagem de livros para aluguéis com filtros e pesquisa.
- CRUD de inserção, edição e exclusão de livros
- Login necessário para navegação na aplicação.

## Ferramentas Necessárias:
- Nodejs
- MongoDB user

## Como utilizar:
- Baixe todos módulos com o comando
~~~javascript
  npm install
  ~~~
- Inicie o servidor com o comando
~~~javascript
  npm dev
~~~
- Para executar testes unitários
~~~javascript
  npm test
~~~
## Navegação de pastas
  ```
  softdesign-booklist
  │ README.md -> Documentação
  │ .env.test -> variáveis de ambientes
  | server.js -> servidor
  │ package.json
  | package-lock.json
  | .eslintrc.json -> arquivo val. eslint standart
  |
  └─── database
  │     │   MongoDB.js -> Conector com o BD
  │     │
  └─── middleware
  |     |   BookInsertion.middleware.js -> CRUD dos livros
  |     |   Dashboard.middleware.js -> Inicio
  |     |   ListOfBooks.middleware.js -> Listagem de livros com filtros etc.
  |     |   Login.middleware.js -> Regras de login 
  │     |
  └─── models
  |     |   Book.model.js -> Modelagem do DB dos livros
  |     |   Login.model.js -> Modelagem do DB de Login e Cadastro
  │     |
  └─── tests
  |     |   server.test.js -> Testes unitários
  |     |
  └─── utils
  |     |   DataBaseFunctions.js -> Funções de conexão com o banco de dados para utilização futura em outras parte do código
  ```

## Módulos usados
- bcryptjs: criptação e descriptação de senhas
- body-parser: utilização do json
- dotenv: utilização das variáveis de ambiente
- express: servidor
- mongodb: conexão com o banco de dados
- mongoose: utilização do banco de dados
- nodemon: para uso local do servidor
- passport: validações e autenticação dos usuários
- passport-local: para utilização do usuário local
- jest: Testes Unitários
- supertes: Para teste de middlewares

## License
- MIT