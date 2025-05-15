import logo from "./logo.png";
import "./App.css";
// importing react and useState, useEffect
import React, { useState, useEffect } from "react";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  // pikachu is well known so the defualt will be pikachu
  const [search, setSearch] = useState("pikachu");
  const [error, setError] = useState(null);

  useEffect(() => {
    //fetch(`https://pokeapi.co/api/v2/pokemon-species/${search.toLowerCase()}`)
    fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
      //error handeling for search bar
      .then((res) => {
        if (!res.ok) {
          throw new Error("pokemon not found!!");
        }
        return res.json();
      })

      .then((data) => {
        setPokemon(data);
        setError(null);
      })
      //error handeling for data
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setPokemon(null);
      })
      .finally(() => {
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
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h1>Pokédex</h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch} style={{ marginTop: "1rem" }}>
            <input
              type="text"
              name="pokemonName"
              placeholder="Search Pokémon"
            />
            <button
              type="submit"
              style={{ marginLeft: "10px", padding: "8px 12px" }}
            >
              Search
            </button>
          </form>
          {/* if loading is true show loading*/}
          {loading && <p style={{ marginTop: "1rem" }}>Loading...</p>}

          {error && <p style={{ color: "red" }}>{error}</p>}

          {pokemon && !loading && !error && (
            <>
              <h2>{pokemon.name.toUpperCase()}</h2>
              <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
