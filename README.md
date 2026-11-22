# Catálogo de Livros com React (Consumo da API Flask)

## Objetivo da Aplicação
Desenvolver uma interface frontend utilizando React e Vite para consultar a API de livros construída em Python com Flask (`GET /livros`) e exibir dinamicamente os três livros cadastrados na tela somente após o usuário clicar no botão **"Buscar Livros"**.

## Integração e Rotas Utilizadas
- **Frontend (`frontend-livros` — React + Vite):** disponível localmente em `http://localhost:5173/`.
- **Backend (`app.py` — Python + Flask):** disponível localmente em `http://127.0.0.1:5000/livros`, retornando uma lista JSON contendo os três registros (`id`, `titulo`, `autor` e `ano`).
- **Proxy de Desenvolvimento (`vite.config.js`):** encaminha as chamadas feitas para `/api/livros` no React para `http://127.0.0.1:5000/livros` no servidor Flask, evitando bloqueios por política de origem (CORS).

## Estrutura do Projeto
```text
Projeto Web/
├── app.py                 # API Backend em Python com Flask (porta 5000)
└── frontend-livros/       # Aplicação Frontend em React + Vite (porta 5173)
    ├── public/
    ├── src/
    │   ├── App.jsx        # Componente principal, estados, fetch() e renderização
    │   ├── App.css        # Estilização da página, cards e mensagens
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js     # Configuração do proxy (/api -> http://127.0.0.1:5000)
```

## Como instalar as dependências

1. **Backend (Flask):** na pasta raiz (`Projeto Web`), instale o Flask:
   ```bash
   pip install flask
   ```

2. **Frontend (React):** acesse a pasta `frontend-livros` e instale os pacotes do Node.js:
   ```bash
   cd frontend-livros
   npm install
   ```

## Como executar a aplicação

Para utilizar a aplicação, é necessário manter **dois terminais em execução** ao mesmo tempo:

1. **Terminal 1 — Iniciar a API Flask (porta 5000):**
   ```bash
   python app.py
   ```

2. **Terminal 2 — Iniciar o servidor React/Vite (porta 5173):**
   ```bash
   cd frontend-livros
   npm run dev
   ```

Em seguida, acesse `http://localhost:5173/` no navegador e clique no botão **Buscar Livros**.

## Como realizar os testes obrigatórios

1. **Estado inicial:** ao abrir `http://localhost:5173/`, confirme que apenas o título **Catálogo de Livros** e o botão **Buscar Livros** estão visíveis, sem que nenhuma requisição tenha sido feita automaticamente.
2. **Consulta com sucesso:** com o servidor Flask ativo na porta `5000`, clique em **Buscar Livros** e verifique se os três livros (ID, título, autor e ano) são exibidos na tela.
3. **Tratamento de erro:** interrompa o servidor Flask (`Ctrl + C` no terminal do Python), clique novamente em **Buscar Livros** e verifique se a interface apresenta uma mensagem de erro adequada em vez de falhar silenciosamente.

---

## Respostas às questões para revisão

1. **Qual é a finalidade de um componente React?**  
   Dividir a interface do usuário em partes independentes, isoladas e reutilizáveis, onde cada parte gerencia sua própria estrutura (JSX), lógica e estado, facilitando a organização e a manutenção do código.

2. **Qual é a função da propriedade `onClick` em um botão?**  
   Associar uma função manipuladora de evento ao botão para que ela seja executada no momento em que o usuário clicar nele.

3. **Por que a requisição `fetch()` deve ser executada dentro da função associada ao clique?**  
   Porque a consulta à API deve ocorrer apenas sob demanda — ou seja, somente quando o usuário clicar no botão **"Buscar Livros"** — e não automaticamente ao abrir ou carregar a página.

4. **Qual é a finalidade de `response.json()`?**  
   Ler o corpo da resposta HTTP recebida do servidor e converter os dados do formato textual JSON para objetos ou arrays JavaScript que podem ser manipulados pela aplicação.

5. **Por que os dados recebidos da API devem ser armazenados no estado do componente?**  
   Porque o React monitora alterações no estado (`useState`) para saber quando precisa renderizar novamente o componente. Se os dados fossem guardados apenas em uma variável comum, a interface na tela não seria atualizada após a resposta da API.

6. **Qual é a função de `map()` na apresentação dos livros?**  
   Percorrer o array de livros armazenado no estado e transformar cada registro em um bloco de elementos JSX correspondente para ser exibido dinamicamente na página.

7. **Por que cada item renderizado a partir de uma lista deve possuir uma propriedade `key`?**  
   Para que o React consiga identificar de forma única cada elemento da lista durante as atualizações do DOM, sabendo exatamente quais itens foram adicionados, modificados ou removidos sem precisar reconstruir toda a lista.

8. **O que a interface deverá fazer se a API Flask estiver indisponível?**  
   Capturar a falha na requisição e apresentar uma mensagem de erro clara ao usuário informando que não foi possível buscar os livros, em vez de falhar silenciosamente.