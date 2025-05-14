import logo from './logo.svg';
import './App.css';
// importing react and useState, useEffect
import React, { useState, useEffect } from 'react';

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  // pikachu is well known so the defualt will be pikachu
  const [search, setSearch] = useState('pikachu'); 
  const [error, setError] = useState(null); 

  
  useEffect(() => {
    //fetch(`https://pokeapi.co/api/v2/pokemon-species/${search.toLowerCase()}`)
    fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)

      //error handeling for search bar
      .then(res => {
        if (!res.ok) {
          throw new Error('Pokémon not found');
        }
        return res.json();
      })
      
      .then(data => {
        setPokemon(data);
        setLoading(false);
        setError(null);
      })
            //error handeling for data
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [search]); 



  // handle search fucntion for when search bar is clicked
  const handleSearch = (e) => {
    e.preventDefault(); //stops the page from reloading on click
    const input = e.target.elements.pokemonName.value; //grabs name from user input in html code
    console.log("got input data");
    console.log(input);
    if (input) {
      setSearch(input); // updates const search with users search input
      setLoading(true); // in case the api takes a long time loading will show
    }
  };


  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Pokédex</h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            name="pokemonName" 
            placeholder="Search Pokémon" 
          />
          <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* ✅ Only show name */}
      {pokemon && !loading && !error && (
      <h2>{pokemon.name.toUpperCase()}</h2>
      )}

      </div>

      
      </header>
    </div>
  );
}

export default App;
