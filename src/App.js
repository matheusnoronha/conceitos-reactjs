import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    async function getData() {
      const response = await api.get('/repositories');
      setRepositories(response.data)
    }

    getData()
  }, [])


  async function handleAddRepository() {
    const title = `Repositorio numero ${Date.now()}`
    const response = await api.post('/repositories', {
      title,
      url: "url.com.br",
      techs: ["Js", "python"]
    });

    const repository = response.data;
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const reponse = await api.delete(`/repositories/${id}`);
    const newRepositories = repositories.filter(repository => repository.id !== id)
    setRepositories(newRepositories)

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id} >
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
