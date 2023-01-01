const axios = require('axios');

// function RangeException(message) {
//     this.message = message;
//     this.name = "RangeException";
// }

function InputException(message) {
    this.message = message;
    this.name = "InputException";
}

const pokemon = async () => {
    let { data } = await axios.get("https://pokeapi.co/api/v2/pokemon");
    return data;
 };

const pokemonById = async (id) => { 
    // edge cases: "001", "-1", "1.2", "   1", "@@1", "   1 2", "1 , 2"
    if (!id) throw new InputException('Not a valid id');
    if (typeof id !== 'string') throw new InputException('Id is not a string');
    id = id.trim();
    if (id.length === 0) throw new InputException('Id cannot be empty');
    if (!Number.isInteger(Number(id))) throw new InputException('Id is not an integer');
    //if (id.length != Number(id).toString().length) throw new InputException('Leading zero');
    if (id.indexOf('.') != -1) throw new InputException('Id contains dot(s).');
    if (Number(id) <= 0) throw new InputException('Id is negative');
   
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    // const pokemonCollection = await pokemon();
    // let total = pokemonCollection
    // if (result.data === null) throw new RangeException('Id not found');

    return result.data;
};

module.exports = {
    pokemon,
    pokemonById
};