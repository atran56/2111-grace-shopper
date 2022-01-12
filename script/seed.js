'use strict'

const { db } = require("../server/db");
const Superhero = require('../server/db/models/superhero');
const User = require('../server/db/models/User')
const Cart = require('../server/db/models/Cart')
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
 const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(superheroes.map(superhero => {
      return Superhero.create(superhero);
    }));
    await Promise.all(users.map(user => {
      return User.create(user);
    }));
    await Promise.all(carts.map(cart => {
      return Cart.create(cart);
    }));
  } catch (err) {
    console.log(err);
  }
};

  // Creating Users

  const users = [{
    username: "test_user",
    password: "password",
    email: "test_user@email.com",
    administator: false
  }, {
    username: "admin_user",
    password: "password",
    email: "admin_user@email.com",
    administator: true
  }
]

const carts = [{
  days: 5,
  checkOut: false,
  total: 300,
  userId: 1
}, {
  days: 3,
  checkOut: false,
  total: 500,
  userId: 2
}]

  const superheroes = [{
    name: "Captain Planet",
    bio: "",
    universe: "Marvel Comics",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/1285.jpg",
    strengths: "Power, Strength",
    availability: [],
    cost: 400
}, {
    name: "Harry Potter",
    bio: "",
    universe: "J. K. Rowling",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10878.jpg",
    strengths: "Power, Intelligence",
    availability: [],
    cost: 300
}, {
    name: "Indiana Jones",
    bio: "",
    universe: "George Lucas",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10560.jpg",
    strengths: "Intelligence, Combat",
    availability: [],
    cost: 100
}, {
    name: "Katniss Everdeen",
    bio: "",
    universe: "N/A",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10484.jpg",
    strengths: "Intelligence, Combat",
    availability: [],
    cost: 100
}, {
    name: "Naruto Uzumaki",
    bio: "",
    universe: "Shueisha",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/1540.jpg",
    strengths: "Power, Combat",
    availability: [],
    cost: 300
}, {
    name: "Donatello",
    bio: "",
    universe: "IDW Publishing",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10330.jpg",
    strengths: "Intelligence, Combat",
    availability: [],
    cost: 200
}, {
    name: "Leonardo",
    bio: "",
    universe: "IDW Publishing",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10327.jpg",
    strengths: "Combat, Intelligence",
    availability: [],
    cost: 200
}, {
    name: "Michelangelo",
    bio: "",
    universe: "IDW Publishing",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10329.jpg",
    strengths: "Combat, Durability",
    availability: [],
    cost: 200
}, {
    name: "Raphael",
    bio: "",
    universe: "IDW Publishing",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10328.jpg",
    strengths: "Combat, Durability",
    availability: [],
    cost: 200
}, {
    name: "Yoda",
    bio: "",
    universe: "George Lucas",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10454.jpg",
    strengths: "Power, Combat",
    availability: [],
    cost: 400
}, {
    name: "Buffy",
    bio: "",
    universe: "Dark Horse Comics",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10430.jpg",
    strengths: "Durability, Intelligence",
    availability: [],
    cost: 200
}, {
    name: "Luke Skywalker",
    bio: "",
    universe: "George Lucas",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10447.jpg",
    strengths: "Power, Combat",
    availability: [],
    cost: 200
}, {
    name: "Ethan Hunt",
    bio: "",
    universe: "N/A",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10476.jpg",
    strengths: "Combat, Intelligence",
    availability: [],
    cost: 100
}, {
    name: "Godzilla",
    bio: "",
    universe: "N/A",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10590.jpg",
    strengths: "Strength, Durability",
    availability: [],
    cost: 500
}, {
    name: "Han Solo",
    bio: "",
    universe: "George Lucas",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10456.jpg",
    strengths: "Combat, Intelligence",
    availability: [],
    cost: 100
}, {
    name: "Hercules",
    bio: "",
    universe: "Marvel Comics",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/78.jpg",
    strengths: "Strength, Combat",
    availability: [],
    cost: 200
}, {
    name: "Hellboy",
    bio: "",
    universe: "Dark Horse Comics",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/813.jpg",
    strengths: "Durability, Combat",
    availability: [],
    cost: 300
}, {
    name: "Kylo Ren",
    bio: "",
    universe: "George Lucas",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10559.jpg",
    strengths: "Power, Combat",
    availability: [],
    cost: 200
}, {
    name: "Darth Vader",
    bio: "",
    universe: "George Lucas",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10444.jpg",
    strengths: "Power, Combat",
    availability: [],
    cost: 300
}, {
    name: "Chuck Norris",
    bio: "",
    universe: "N/A",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/954.jpg",
    strengths: "Combat, Strength",
    availability: [],
    cost: 100
}, {
    name: "Spawn",
    bio: "",
    universe: "Image Comics",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/842.jpg",
    strengths: "Power, Combat",
    availability: [],
    cost: 300
},
{
  name: "Black Panther",
  bio: "",
  universe: "Marvel",
  image: "https://www.superherodb.com/pictures2/portraits/10/100/247.jpg",
  strengths: "Intelligence, Combat",
  availability: [],
  cost: 500
},
{
  name: "Wolverine",
  bio: "",
  universe: "Marvel",
  image: "https://www.superherodb.com/pictures2/portraits/10/100/161.jpg",
  strengths: "Durability, Combat",
  availability: [],
  cost: 400
},
{
  name: "Thor",
  bio: "",
  universe: "Marvel",
  image: "https://www.superherodb.com/pictures2/portraits/10/100/140.jpg",
  strengths: "Durability, Strength",
  availability: [],
  cost: 300
},
{
  name: "Hulk",
  bio: "",
  universe: "Marvel",
  image: "https://www.superherodb.com/pictures2/portraits/10/100/125.jpg",
  strengths: "Durability, Strength",
  availability: [],
  cost: 200
},
{
  name: "Captain America",
  bio: "",
  universe: "Marvel",
  image: "https://www.superherodb.com/pictures2/portraits/10/100/274.jpg",
  strengths: "Durability, Strength",
  availability: [],
  cost: 100
},
{
  name: "Daredevil",
  bio: "",
  universe: "Marvel",
  image: "https://www.superherodb.com/pictures2/portraits/10/100/52.jpg",
  strengths: "Intelligence, Combat",
  availability: [],
  cost: 500
},
{
  name: "Punisher",
  bio: "",
  universe: "Marvel",
  image: "https://www.superherodb.com/pictures2/portraits/10/100/112.jpg",
  strengths: "Intelligence, Combat",
  availability: [],
  cost: 400
},
{
  name: "Storm",
  bio: "",
  universe: "Marvel",
  image: "https://www.superherodb.com/pictures2/portraits/10/100/170.jpg",
  strengths: "Power, Speed",
  availability: [],
  cost: 200
},
{
  name: "Jean Grey",
  bio: "",
  universe: "Marvel",
  image: "https://www.superherodb.com/pictures2/portraits/10/100/814.jpg",
  strengths: "Intelligence, Power",
  availability: [],
  cost: 100
},
{
  name: "Elektra",
  bio: "",
  universe: "Marvel",
  image: "https://www.superherodb.com/pictures2/portraits/10/100/625.jpg",
  strengths: "Intelligence, Combat",
  availability: [],
  cost: 500
},
{
  name: "Emma Frost",
  bio: "",
  universe: "Marvel",
  image: "https://www.superherodb.com/pictures2/portraits/10/100/325.jpg",
  strengths: "Durability, Power",
  availability: [],
  cost: 100
},
{
  name: "Man-Thing",
  bio: "",
  universe: "Marvel",
  image: "https://www.superherodb.com/pictures2/portraits/10/100/382.jpg",
  strengths: "Durability, Power",
  availability: [],
  cost: 300
},
{
  name: "She-Hulk",
  bio: "",
  universe: "Marvel",
  image: "https://www.superherodb.com/pictures2/portraits/10/100/125.jpg",
  strengths: "Durability, Strength",
  availability: [],
  cost: 400
},
{
  name: "Invisible Woman",
  bio: "",
  universe: "Marvel",
  image: "https://www.superherodb.com/pictures2/portraits/10/100/620.jpg",
  strengths: "Durability, Intelligence",
  availability: [],
  cost: 500
},
{
  name: "Namor",
  bio: "",
  universe: "Marvel",
  image: "https://www.superherodb.com/pictures2/portraits/10/100/137.jpg",
  strengths: "Combat, Strength",
  availability: [],
  cost: 100
},
{
  name: "Luke Cage",
  bio: "",
  universe: "Marvel",
  image: "https://www.superherodb.com/pictures2/portraits/10/100/269.jpg",
  strengths: "Combat, Durability",
  availability: [],
  cost: 200
},
{
  name: "Iron Fist",
  bio: "",
  universe: "Marvel",
  image: "https://www.superherodb.com/pictures2/portraits/10/100/1120.jpg",
  strengths: "Combat, Power",
  availability: [],
  cost: 300
},
{
  name: "Moon Knight",
  bio: "",
  universe: "Marvel",
  image: "https://www.superherodb.com/pictures2/portraits/10/100/415.jpg",
  strengths: "Combat, Intelligence",
  availability: [],
  cost: 500
},
{
  name: "Angel",
  bio: "",
  universe: "Marvel",
  image: "https://www.superherodb.com/pictures2/portraits/10/100/10431.jpg",
  strengths: "Power, Intelligence",
  availability: [],
  cost: 500
},];

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
