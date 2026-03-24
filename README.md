# 🚀 API Dio Node - CRUD de Usuários (Versão 2026)
Este projeto é uma API REST desenvolvida em __Node.js__ com __TypeScript__, utilizando __TypeORM__ para persistência de dados. Originalmente parte da Formação QA da DIO, esta versão foi completamente modernizada para suportar as tecnologias e padrões de desenvolvimento mais recentes.

## 🛠️ Inovações e Modernizações (vs. Versão 2023)
Diferente da estrutura original de 2023, esta implementação introduz melhorias críticas em performance, arquitetura e resiliência:

* __Node.js 25+ & ESM Native__: Migração total de CommonJS para __ES Modules__ (_import/export_), utilizando a flag _--experimental-vm-modules_ para execução de testes.
* __Injeção de Dependência__: Implementada no construtor de todos os Controllers e Services, facilitando a testabilidade e o desacoplamento.
* __TypeScript Moderno__: Configurações rigorosas no _tsconfig.json_ utilizando o módulo _nodenext_ para garantir tipagem estática e segurança em tempo de desenvolvimento.
* __Ambiente de Teste Isolado__: Utilização de banco de dados __SQLite in-memory__ (_:memory:_) durante os testes para garantir velocidade e independência de estado entre execuções.
* __Clean Code & SOLID__: Aplicação dos princípios de responsabilidade única e inversão de dependência.

## 🧪 Estratégia de Testes (Quality Assurance)
O coração desta versão é a sua suíte de testes, garantindo que cada alteração no código seja validada automaticamente.

### Cobertura de Testes
A aplicação utiliza __Jest__ e __ts-jest__ para cobrir as duas camadas principais:

1. __Testes de Unidade (Services)__:
    * Validação de regras de negócio.
    * Persistência real no banco de dados SQLite em memória.
    * Cenários de erro (ex: Usuário não encontrado, IDs inválidos).

2. __Testes de Unidade com Mocks (Controllers)__:
    * Simulação completa das requisições e respostas do Express.
    * Uso de __Mocks customizados__ para _Request_ e _Response_ (incluindo métodos como _.status()_, _.json()_ e _.send()_).
    * Garantia de que os códigos de status HTTP (200, 201, 204, 400, 404) são disparados corretamente.

### Como rodar os testes
```Bash
npm run test
```
__Nota técnica__: O script de teste foi ajustado para ser compatível com o __PowerShell__ __(Windows)__ e shells Unix, resolvendo conflitos comuns com caminhos de binários do npm.

## 📦 Tecnologias Utilizadas
* __Runtime__: Node.js v25.6.0
* __Linguagem__: TypeScript
* __Framework Web__: Express
* __ORM__: TypeORM 0.3.x
* __Banco de Dados__: SQLite
* __Testes__: Jest & ts-jest
* __Segurança de Ambiente__: cross-env

## 🚀 Como Executar o Projeto
1. __Instale as dependências__:
```Bash
npm install
```

2. __Execute as migrações do banco de dados__:

```Bash
npm run migration:run
```

3. __Inicie o servidor de desenvolvimento__:

```Bash
npm run dev
```

O servidor estará disponível em http://localhost:5000.

## 📖 Bibliografia
* __Autor Original__: Instrutores da DIO (Digital Innovation One) - Formação QA.
* __Documentação Jest__: jestjs.io
* __Documentação TypeORM__: typeorm.io
* __Adaptações Técnicas__: Giliano G. Novais (Foco em Modernização de Ambiente e QA).