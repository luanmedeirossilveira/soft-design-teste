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
## Chamadas de API
 JSON payloads and is based on body-parser.
- Dashboard:
  - Rota: '/' -> Redireciona a rota '/login'
- Login
  - Rotas:
    - '/login' [post] -> recebe login do usuário {username, password}
    - '/login' [get] -> verificação de login do usuário se query é fail ou não
    - '/login/register' [post] -> cadastro do usuário {username, password}
- List of Book
  - Rotas
    - '/list/search/:search' [get] -> Lista de todos os livros com filtro se necessário. Por Query. {nomeDoFiltro: valorDoFiltro}
    - '/list/filter/:filter' [get] -> Descrição de um livro com filtro do nome do livro. Por Query. {"name": nomeDoLivro}
    - '/list/rented/:filter' [post] -> Aluguel do livro se estiver disponível. Por Query. {"filter": nomeDoLivro, "user": nomeDoUsuario}
- Book Insertion
  - Rotas 
    - '/insert' [post] -> Inserção de um livro. {"name": nomeDoLivro, "year": ano, "author": autor, "company": editora, "rented": seAlugado[boolean], "user": usuario}
    - '/insert' [put] -> Edição de um livro. { "filter": {nomeDoFiltro: valorDoFiltro}, "update": {nomeDoUpdate: valorDoUpdate} }
    - '/insert' [delete] -> Exclusão de um livro. { "filter": {nomeDoFiltro: valorDoFiltro} }
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
