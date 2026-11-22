import { useState } from 'react';
import './App.css';

function App() {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  async function buscarLivros() {
    setCarregando(true);
    setErro('');

    try {
      const response = await fetch('/api/livros');

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const dados = await response.json();
      setLivros(dados.livros);
    } catch (err) {
      setErro('Não foi possível buscar os livros. Verifique se a API Flask está rodando.');
      setLivros([]);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="container">
      <h1>Catálogo de Livros</h1>

      <button onClick={buscarLivros} disabled={carregando}>
        Buscar Livros
      </button>

      {carregando && <p className="mensagem">Carregando livros...</p>}

      {erro && <p className="erro">{erro}</p>}

      <div className="lista-livros">
        {livros.map((livro) => (
          <div key={livro.id} className="card-livro">
            <p><strong>ID:</strong> {livro.id}</p>
            <p><strong>Título:</strong> {livro.titulo}</p>
            <p><strong>Autor:</strong> {livro.autor}</p>
            <p><strong>Ano:</strong> {livro.ano ?? livro.ano_publicacao}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;