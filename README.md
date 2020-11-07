![GoStack Bootcamp][logo]

### Level 04 - Desafio: Database relations

[📑 Instruções do desafio][challenge]

---

### 📝 Instruções

1. Criar um *container* **Docker** com a imagem do **PostgreSQL**:

    ```bash
    docker run --name gostack_desafio09_tests -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
    ```

2. Criar o database ```gostack_desafio09``` no **PostgreSQL** para o ambiente de produção.

3. Criar o database ```gostack_desafio09_tests``` no **PostgreSQL** para o ambiente de testes.

4. Verificar se a extensão `uuid-ossp` está ativa para ambos os databases.

---

### ⚙ Testes

- [x] - `should be able to create a new customer`: Para que esse teste passe, sua aplicação deve permitir que um cliente seja criado, e retorne um json com o cliente criado.

- [x] - `should not be able to create a customer with one e-mail thats already registered`: Para que esse teste passe, sua aplicação deve retornar um erro quando você tentar cadastrar um cliente com um e-mail que já esteja cadastrado no banco de dados.

- [x] - `should be able to create a new product`: Para que esse teste passe, sua aplicação deve permitir que um produto seja criado, e retorne um json com o produto criado.

- [x] - `should not be able to create a duplicated product`: Para que esse teste passe, sua aplicação deve retornar um erro quando você tentar cadastrar um produto com um nome que já esteja cadastrado no banco de dados.

- [x] - `should be able to create a new order`: Para que esse teste passe, sua aplicação deve permitir que um pedido seja criado, e retorne um json com o todos os dados do pedido criado.

- [x] - `should not be able to create an order with a invalid customer`: Para que esse teste passe, sua aplicação não deve permitir a criação de um novo pedido com um cliente que não existe no banco de dados, retornando um erro.

- [x] - `should not be able to create an order with invalid products`: Para que esse teste passe, sua aplicação não deve permitir a criação de um novo pedido com um produtos que não existem no banco de dados, retornando um erro caso um ou mais dos produtos enviados não exista no banco de dados.

- [x] - `should not be able to create an order with products with insufficient quantities`: Para que esse teste passe, sua aplicação não deve permitir a criação de um novo pedido com um produtos que não possuem quantidade disponível, retornando um erro caso um ou mais dos produtos enviados não possua a quantidade necessária.

- [x] - `should be able to subtract an product total quantity when it is ordered`: Para que esse teste passe, sua aplicação deve permitir que, quando um novo pedido for criado, seja alterada a quantidade total dos produtos baseado na quantidade pedida.

- [x] - `should be able to list one specific order`: Para que esse teste passe, você deve permitir que a rota orders/:id retorne um pedido, contendo todas as informações do pedido com o relacionamento de customer e order_products.

[logo]: https://github.com/leonardosposina/gostack13-lv01-d01/blob/master/docs/gostack-bootcamp.png?raw=true
[challenge]: https://github.com/rocketseat-education/bootcamp-gostack-desafios/tree/master/desafio-database-relations
