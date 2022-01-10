// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonDataView,
  PokemonForm,
  PokemonInfoFallback,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null)

  React.useEffect(() => {
    if (pokemonName) {
      setPokemon(null)
      fetchPokemon(pokemonName).then(data => setPokemon(data))
    }
  }, [pokemonName])

  return pokemonName ? (
    pokemon ? (
      <PokemonDataView pokemon={pokemon} />
    ) : (
      <PokemonInfoFallback name={pokemonName} />
    )
  ) : (
    'Submit a pokemon'
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
