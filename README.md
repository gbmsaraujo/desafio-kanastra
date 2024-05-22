# desafio-kanastra

O desafio proposto pela Kanastra consiste em tratar arquivos CSV em um projeto, utilizando as seguintes tecnologias:

    React: Para a parte frontend da aplicação.
    Flask: Para o desenvolvimento do backend.
    Celery: Para a execução de tarefas assíncronas.
    Redis: Utilizado como broker para o Celery.
    MongoDB: Banco de dados NoSQL utilizado para armazenar os dados processados.

# Executando o Projeto

Para executar este projeto, utilize os comandos Makefile fornecidos:

    make build: Constrói todos os serviços.
    make up: Inicia todos os serviços.
    make stop: Para todos os serviços.
    make restart: Reinicia todos os serviços.
    make logs: Visualiza os logs de todos os serviços.
    make down: Remove todos os serviços e volumes.

# Testes Locais

Antes de executar os testes, garanta que o Redis e o MongoDb estejam instalados em sua máquina local para a execução adequada:
Para executar os testes localmente:

    Frontend: Certifique-se de ter todas as dependências instaladas (Node.js 18) e execute:
      - npm install
      - npm test

Backend: Execute o seguinte comando para instalar as configurações:

`sh ./install_setups.sh`

Em seguida, execute os testes com:

`sh ./run_tests.sh`

URLs de Acesso

    Frontend: localhost:8080
    Backend: localhost:5000

