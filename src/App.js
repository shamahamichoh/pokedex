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

  const typeColorMap = {
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    psychic: "#F85888",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    fairy: "#EE99AC",
    normal: "#A8A878",
    flying: "#A890F0",
    ground: "#E0C068",
    rock: "#B8A038",
    bug: "#A8B820",
    ghost: "#705898",
    steel: "#B8B8D0",
    fighting: "#C03028",
    poison: "#A040A0",
  };

  const mainType = pokemon && pokemon.types[0].type.name;
  const bgColor = typeColorMap[mainType] || "#444";
  const heightStat = {
    statName: "height",
    formater: (heightValue) => {
      return heightValue / 10 + " m";
    },
  };
  const weightStat = {
    statName: "weight",
    formater: (weightValue) => {
      return weightValue / 10 + " kg";
    },
  };
  const abilities = {
    statName: "abilities",
    formater: (abilityValues) => {
      return abilityValues.map((a) => a.ability.name).join(", ");
    },
  };
  const typeStat = {
    statName: "types",
    formater: (typeValue) => {
      return typeValue.map((t) => t.type.name).join(", ");
    },
  };
  const pokeStats = [heightStat, weightStat, typeStat, abilities];
  // const pokeStats = ["height", "weight", "base_experience"];

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
              <div style={{ backgroundColor: bgColor }} className="type-card">
                <div className="pokemon-summary">
                  <h2>{pokemon.name.toUpperCase()}</h2>
                  <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
                  <img src={pokemon.sprites.front_default} alt="Front" />
                  <img src={pokemon.sprites.back_default} alt="Back" />
                  {/* Summary Card */}
                  <div className="summary-box">
                    {pokeStats.map((stat) => {
                      // console.log(stat);
                      // console.log(pokemon[stat]);
                      return (
                        <p>
                          <strong key={stat.statName}>{stat.statName}:</strong>
                          <span
                            style={{
                              padding: "5px",
                            }}
                          >
                            {stat.formater(pokemon[stat.statName])}
                          </span>
                        </p>
                      );
                    })}
                    <p>
                      <strong>Height:</strong> {pokemon.height / 10} m
                    </p>
                    <p>
                      <strong>Weight:</strong> {pokemon.weight / 10} kg
                    </p>
                    <p>
                      <strong>Base Experience:</strong>{" "}
                      {pokemon.base_experience}
                    </p>
                    <p>
                      <strong>Type:</strong>{" "}
                      {pokemon.types.map((t) => t.type.name).join(", ")}
                    </p>
                    <p>
                      <strong>Abilities:</strong>{" "}
                      {pokemon.abilities.map((a) => a.ability.name).join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
