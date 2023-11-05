import axios from 'axios';

const apiCharacter = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/character',
});

export default apiCharacter;


