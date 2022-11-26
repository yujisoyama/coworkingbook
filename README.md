# <p align="center"> Coworking Book Platform </p>

<p align="center">Full Stack application and dockerized. Platform to simplify the booking for desks or meeting rooms in coworking spaces.</p>

https://user-images.githubusercontent.com/64661100/203874519-a0974abe-6df9-45e9-9340-e45fdf72f14c.mp4

## Live
   You can use the platform [Coworking Booking](http://15.228.128.96:5137/) deployed on Amazon EC2.

## ▶️ Rodando localmente
### Pré-requisitos:
   - Ter o Docker instalado na sua máquina, pois toda a aplicação será subida em containers no Docker.
   - Configurar o seu arquivo /coworkingbook/server/.env para criar as variáveis de ambiente utilizados pela aplicação server-side
   ![image](https://user-images.githubusercontent.com/64661100/204067987-d80d6e85-7c32-4a76-97b2-d606be2cb530.png)


### Passo a Passo:
   - Clone esse repositório:
   ```
   git clone https://github.com/yujisoyama/coworkingbook.git
   ```
   - Entre na pasta do projeto:
   ```
   cd coworkingbook
   ```
   - Vamos construir os containers da aplicação server-side e da aplicação client-side. Para isso, execute os dois comandos abaixo:
   ```
   docker compose build node
   ```
   ```
   docker compose build web
   ```
   - Finalizando a construção dos dois containers, execute o seguinte comando para rodar toda a aplicação:
   ```
   docker compose up
   ```
   - Para acessar a interface web após a subida dos containers, entre no endereço abaixo: 
   ```
   http://localhost:5137/
   ```

## 🛠 Stacks utilizadas

> Front-end: 

- <strong>React</strong>: utilizei o React, seus Hooks, Context API e algumas de suas bibliotecas para fazer toda a interface e manipulação de dados em seus componentes.
- <strong>TypeScript</strong>: utilizei para tipar a aplicação através de interfaces.
- <strong>TailwindCSS</strong>: utilizei o TailWind CSS na estilização. Acho o Tailwind com o React uma boa combinação, pois a componentização do React impede em estilizações muito longas junto com o código.
- <strong>Axios</strong>: utilizei para o consumo de API's.


> Back-end: 

- <strong>Node e Express</strong>: desenvolvimento server-side e a criação de suas rotas.
- <strong>TypeScript</strong>: utilizei para tipar a aplicação através de interfaces.
- <strong>TypeORM</strong>: integração da aplicação com o PostgreSQL através de classes entidades, consultas, e design da arquitetura do banco de dados.
- <strong>JWT</strong>: JsonWebToken para criação de token do usuário.
- <strong>Bcrypt</strong>: hashear a senha salva no banco.
- <strong>Nodemailer</strong>: para enviou de email de confirmação de conta e recuperaçãod e senha.
