const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const movies = data.movies;
const reviews = data.reviews;

async function main() {
    const db = await dbConnection.dbConnection();
    await db.dropDatabase();
    try {
        const nope = await movies.createMovie("Nope", "OJ's dad was killed by a nickel from the sky. Yet it seems something is hidden up in cloud.",
                                                ["Mystery", "Horror", "Fiction"], "R", "Monkeypaw Productions", "Jordan Peele", 
                                                ["Daniel Kaluuya", "Keke Palmer", "Steven Yeun", "Michael Wincott", "Brandon Perea"], 
                                                "07/18/2022", "2h 10min");

        const hackers = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.",
                ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley",
                ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"],
                "09/15/1995", "1h 45min");

        const incantation = await movies.createMovie("Incantation", "Six years ago, Li Ronan is cursed after breaking a religious taboo; now, she must protect her daughter from the consequences of her actions. ",
                    ["Mystery", "Horror"], "R", "Qianhouzi Production Company", "Kevin Koo",
                    ["Hsuanyen Tsai", "Sinting Huang", "Yinghsuan Kao", "Sean Lin"],
                    "03/18/2022", "1h 51min");

        const pinkFlamingos = await movies.createMovie("Pink Flamingos", "The notorious criminal Divine lives under the pseudonym 'Babs Johnson' with her mentally-ill mother Edie, delinquent son Crackers, and traveling companion Cotton.",
                    ["Comedy", "Crime"], "NC-17", "Dreamland", "John Waters",
                    ["Harris Milstead", "David Lochary", "Mink Stole", "Mary Pearce"],
                    "03/17/1972", "1h 32min");

        await movies.createMovie(
            "The Breakfast Club",
            "Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.",
            ["Comedy", "Drama"],"R","Universal Pictures","John Hughes",
            ["Judd Nelson", "Molly Ringwald", "Ally Sheedy", "Anthony Hall", "Emilio Estevez"],
            "02/07/1985","1h 37min"
        )

        const nopeR1 = await reviews.createReview(nope['_id'], "The best", "Joe Haas", " the best movie in 2022", 4.8);
        const nopeR2 = await reviews.createReview(nope['_id'], "The worst", "Zackary Ricky", " the worst movie in 2022", 3.2);
        const nopeR3 = await reviews.createReview(nope['_id'], "Meh....", "Ken Park", " the average movie in 2022", 3.5);
        
        await reviews.createReview(hackers['_id'], "Can't tell", "Sallie Houston", "Don't really understand this movie", 3);
        await reviews.createReview(hackers['_id'], "Cool!!", "Joe Houston", "Really cool concept! love it!", 4.2);
        await reviews.createReview(hackers['_id'], "Not too bad", "James Randy", "Above average. ", 3.8);

        await reviews.createReview(incantation['_id'], "Scary!!!!", "Nick Evens", "Great movie! No jump score but creepy!!", 4.5);
        await reviews.createReview(incantation['_id'], "OMG!!", "Hollie Zhang", "Scare the sh#t outta me....", 4.6);
        await reviews.createReview(incantation['_id'], "COuld be better?", "Shaozhong Pan", "Wish there will be a series on this film. ", 4);
        
        await reviews.createReview(pinkFlamingos['_id'], "Epic", "James Evens", "What can I say. A true epic", 5);
        await reviews.createReview(pinkFlamingos['_id'], "DISGUSTING", "Nicole Foote", "AWFUL MOVIE. THIS SHOULD BE BANNED. IT'S BAD FOR CHILDREN.", 1);
        await reviews.createReview(pinkFlamingos['_id'], "Classic", "Daniel Saito", "Defintely worth to watch. The final scene is crazy.", 4.7);
        
        // console.log("-------------------------------------------");
        // console.log(await movies.updateMovie(   
        //             pinkFlamingos._id,
        //             "Inception",
        //             "Dreams within dreams within dreams and stuff",
        //             ["Action", "Adventure"],
        //             "PG-13",
        //             "Warner Bros",
        //             "Christopher Nolan",
        //             ["Leonardo DiCaprio","Tom hardy"],
        //             "07/16/2010",
        //             "2h 28min"));

    } catch (e) {
        console.log(e);
    };

    // try {
    //     const allMovies = await movies.getMovieById('63631fbca1bd93519363f62f');
    //     console.log(allMovies);
    // } catch (e) {
    //     console.log(e);
    // }


             
    await dbConnection.closeConnection();
    console.log("Done!");
}

main();