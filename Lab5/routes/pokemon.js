const express = require('express');
const router = express.Router();
const data = require('../data');
const pokemonData = data.pokemon;

router
  .route('/')
  .get(async (req, res) => {
    try {
      const pokemonList = await pokemonData.pokemon();
      res.json(pokemonList);
    } catch (e) {
      res.status(500).send();
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try{
      const selectedPokemon = await pokemonData.pokemonById(req.params.id);
      res.json(selectedPokemon);
    } catch (e) {
      if (e.name === 'InputException') {
        res.status(400).json({message: "Invalid URL Parameter"});
      } else {
        res.status(404).json({message: "Pokémon Not Found!"});
      }
    };
      
  })
//Request Method

module.exports = router;