import { useState } from 'react';
import './home.css';
import api from '../../api/api';
import { useEffect } from 'react';

const Home = () => {
  const [characters, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function showCharacters() {
      await api
        .get()
        .then((response) => {
          setCharacter(response.data.results.slice(0, 12));
          setLoading(false)
        })
        .catch((err) => {
          console.log('Erro ao mostrar personagem ' + err);
        });
    }
    showCharacters();
  }, []);

  if(loading){
    return (
      <h1 className='loading'>Carregando personagens...</h1>
    )
  }

  return (
    <main className="home_bg">
      <div className="container">
        <ul className="list_characters">
          {characters.map((char) => (
            <li key={char.id} className="character">
              <img src={char.image} alt={char.name} />

              <div className="description">
                <div>
                  <h2 className="name">{char.name}</h2>
                  {char.status === 'Alive' && (
                    <p className="alive_specie alive">
                      {char.status} - {char.species}
                    </p>
                  )}
                  {char.status !== 'Alive' && (
                    <p className="alive_specie dead">
                      {char.status} - {char.species}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="">Last Know location:</label>
                  <p className="last_know">{char.location.name}</p>
                </div>

                <div>
                  <label htmlFor="">Origin:</label>
                  {char.origin.name === 'unknown' && <p>Desconhecido</p>}
                  {char.origin.name !== 'unknown' && (
                    <p key={char.id} className="last_know">
                      {char.origin.name}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Home;
