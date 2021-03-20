# TESTE FRONTEND COMPASSO

Bem-vindo.

## Definição

A aplicação deverá constituir três componentes principais:

O campo de busca.
Visualização de resultados.
Dois botões para executar um determinado resultado.
Ao clicar nos botões de repos e starred, deverá mostrar uma lista simples de cada endpoint apresentado anteriormente.

Dado um determinado usuário, deverá ser possível navegar diretamente até a página de detalhe do usuário sem que seja necessário efetuar uma nova busca. Ex: http://localhost:3000/USER_GITHUB

- Gostariamos de pesquisar por usuario.
- Gostariamos de ao clicar no botão de repos, listar repositorios do usuario pesquisado.
- Gostariamos de ao clicar no botão de starred, listar os repositorios mais visitados por aquele usuario.

#### Endpoint

- User: https://api.github.com/users/USER_GITHUB
- Repos: https://api.github.com/users/USER_GITHUB/repos
- Starred: https://api.github.com/users/USER_GITHUB/starred{/owner}{/repo}

## Frameworks/ Ferramentas

- React JS
- React Router
- Axios
- Bootstrap
