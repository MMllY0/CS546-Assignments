const connection = require("./config/mongoConnection");
const movies = require("./data/movies");

async function main() {
    const db = await connection.dbConnection();
    await db.dropDatabase();

    console.log("1. Create a Movie of your choice.");
    try {
        nope = await movies.createMovie(
                                        "Hackers",
                                        "Hackers are blamed for making a virus that will capsize five oil tankers.",
                                        [],
                                        "PG-13",
                                        "United Artists",
                                        "Iain Softley",
                                        ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"],
                                        "09/15/1995",
                                        "1h 45min")
        console.log(nope);
    } catch (e) {
        console.log(e);
    }

    // console.log("1. Create a Movie of your choice.");
    // try {
    //     nope = await movies.createMovie("Nope   ", "OJ's dad was killed by a nickel from the sky. Yet it seems something is hidden up in cloud.",
    //                                     ["Mystery", "Horror", "Fiction"], "R", "Monkeypaw Productions", "Jordan Peele", 
    //                                     ["Daniel Kaluuya", "Keke Palmer", "Steven Yeun", "Michael Wincott", "Brandon Perea"], 
    //                                     "07/18/2022", "2h 10min");
    //     console.log(nope);
    // } catch (e) {
    //     console.log(e);
    // }

    // console.log("2. Log the newly created Movie. ");
    // try {
    //     const movieInserted = await movies.getMovieById(nope['_id'].toString());
    //     console.log(movieInserted);
    // } catch (e) {
    //     console.log(e);
    // }

    // console.log("3. Create another movie of your choice.");
    // try {
    //     incantation = await movies.createMovie("Incantation", "Six years ago, Li Ronan is cursed after breaking a religious taboo; now, she must protect her daughter from the consequences of her actions. ",
    //                                            ["Mystery", "Horror"], "R", "Qianhouzi Production Company", "Kevin Koo",
    //                                            ["Hsuanyen Tsai", "Sinting Huang", "Yinghsuan Kao", "Sean Lin"],
    //                                            "03/18/2022", "1h 51min");
    //     console.log(incantation);                                 
    // } catch (e) {
    //     console.log(e);
    // }

    // console.log("4. Query all movies, and log them all");
    // try {
    //     const allMovies = await movies.getAllMovies();
    //     console.log(allMovies);
    // } catch (e) {
    //     console.log(e);
    // }

    // console.log("5. Create the 3rd movie of your choice");
    // try {
    //     pinkFlamingos = await movies.createMovie("Pink Flamingos", "The notorious criminal Divine lives under the pseudonym 'Babs Johnson' with her mentally-ill mother Edie, delinquent son Crackers, and traveling companion Cotton.",
    //                                            ["Comedy", "Crime"], "NC-17", "Dreamland", "John Waters",
    //                                            ["Harris Milstead", "David Lochary", "Mink Stole", "Mary Pearce"],
    //                                            "03/17/1972", "1h 32min");
    //     console.log(pinkFlamingos);                                 
    // } catch (e) {
    //     console.log(e);
    // }

    // console.log("6. Log the newly created 3rd movie. (Just that movie, not all movies)")
    // try {
    //     const thirdMovie = await movies.getMovieById(pinkFlamingos['_id'].toString());
    //     console.log(thirdMovie);
    // } catch (e) {
    //     console.log(e);
    // }

    // console.log("7. Rename the first movie");
    // try {
    //     const firstRenamed = await movies.renameMovie(nope['_id'].toString(), "   NOPE");
    //     console.log(firstRenamed);
    // } catch (e) {
    //     console.log(e);
    // }

    // console.log("8. Log the first movie with the updated name. ");
    // try {
    //    const firstMovie = await movies.getMovieById(nope['_id'].toString());
    //     console.log(firstMovie);
    // } catch (e) {
    //     console.log(e);
    // }

    // console.log("9. Remove the second movie you created.");
    // try {
    //     const deleteSec = await movies.removeMovie(incantation['_id'].toString());
    //     console.log(deleteSec);
    // } catch (e) {
    //     console.log(e);
    // }

    // console.log("10. Query all movies, and log them all");
    // try {
    //     const allMovies = await movies.getAllMovies();
    //     console.log(allMovies);
    // } catch (e) {
    //     console.log(e);
    // }

    // console.log("11. Try to create a movie with bad input parameters to make sure it throws errors.");
    // try {
    //     const hackers = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", 
    //                                             ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", 
    //                                             ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], 
    //                                             "09/15/2025", "1h 45min")
    //     console.log(hackers);                           
    // } catch (e) {
    //     console.log(e);
    // }

    // console.log("12. Try to remove a movie that does not exist to make sure it throws errors.");
    // try {
    //     const deleteNonExist = await movies.removeMovie("118s4df8s4g6afd");
    //     console.log(deleteNonExist);
    // } catch (e) {
    //     console.log(e);
    // }
    
    // console.log("13. Try to rename a movie that does not exist to make sure it throws errors.");
    // try {
    //     const renameNonExist = await movies.renameMovie("118s4df8s4g6afd", "Smile");
    //     console.log(renameNonExist);
    // } catch (e) {
    //     console.log(e);
    // }

    // console.log("14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.");
    // try {
    //     const renameWrongName = await movies.renameMovie(pinkFlamingos['_id'].toString(), "Pink's Flamingos");
    //     console.log(renameWrongName);
    // } catch (e) {
    //     console.log(e);
    // }

    // console.log("15. Try getting a movie by ID that does not exist to make sure it throws errors.");
    // try {
    //     const getNonExist = await movies.getMovieById("118s4df8s4g6afd");
    //     console.log(getNonExist);
    // } catch (e) {
    //     console.log(e);
    // }

    await connection.closeConnection();
    console.log("Done!");
}

main();
