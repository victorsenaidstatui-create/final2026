# Sistema de Controle de Entrada na Cozinha

## Sobre o projeto

Este projeto consiste no desenvolvimento de um sistema para controlar e registrar a entrada de alunos na cozinha da escola durante o horário de almoço.

Atualmente, os registros são realizados manualmente em uma folha de papel. Esse processo pode permitir que alguns alunos entrem sem preencher as informações necessárias. O sistema busca tornar esse controle mais organizado, prático e seguro.

## Objetivo

Desenvolver uma aplicação que permita registrar as entradas dos alunos, armazenar os dados em um banco de dados e consultar o histórico de movimentações. A proposta também prevê a integração com dispositivos eletrônicos para identificar entradas sem registro e acionar um alerta.

## Como funciona

1. O aluno realiza seu registro no sistema.
2. Informa nome, turma, horário e atividade ou motivo da entrada.
3. O sistema valida as informações e salva o registro no banco de dados.
4. Os registros podem ser consultados posteriormente no histórico.
5. Na etapa de integração com os dispositivos, uma entrada sem registro poderá gerar um alerta.

## Funcionalidades

- Cadastro e identificação de alunos.
- Registro de entrada na cozinha.
- Armazenamento dos registros em banco de dados.
- Consulta ao histórico de entradas.
- Integração prevista com dispositivos eletrônicos e RFID.
- Possibilidade de emitir alertas para entradas sem registro.

## Tecnologias

- **Laravel / PHP:** desenvolvimento do backend e das rotas da aplicação.
- **HTML e CSS:** estrutura e estilização das páginas.
- **JavaScript e jQuery:** interações e requisições assíncronas (AJAX).
- **MySQL:** armazenamento dos dados.
- **RFID e dispositivos eletrônicos:** previstos para a identificação e automação do controle de entrada.

## Requisitos

- PHP e Composer instalados.
- Banco de dados MySQL.
- Node.js e npm, caso sejam necessárias dependências de frontend.

## Instalação e execução

1. Clone o repositório na branch do projeto:

```bash
git clone -b feature/victor https://github.com/victorsenaidstatui-create/final2026.git
cd final2026
```

2. Instale as dependências PHP:

```bash
composer install
```

3. Crie o arquivo de ambiente:

```bash
cp .env.example .env
```

No Windows, se o comando acima não funcionar, copie manualmente o arquivo `.env.example` e renomeie a cópia para `.env`.

4. Configure no arquivo `.env` os dados de conexão com o banco de dados.

5. Gere a chave da aplicação:

```bash
php artisan key:generate
```

6. Execute as migrações, se o banco estiver configurado:

```bash
php artisan migrate
```

7. Inicie o servidor local:

```bash
php artisan serve
```

A aplicação ficará disponível em:

```
http://127.0.0.1:8000
```

## Finalidade acadêmica

Projeto desenvolvido com finalidade educacional, aplicando conhecimentos de desenvolvimento web, banco de dados, integração de sistemas e automação.
