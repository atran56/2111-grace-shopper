'use strict'

const { db, models: {User, Superhero, Order, ItemizedOrder} } = require("../server/db");
// const Superhero = require("../server/db")
// const User = require("../server/db")
// const Order = require("../server/db")
// const ItemizedOrder = require("../server/db")

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
 const seed = async () => {
  try {
    // console.log(Superhero)
    await db.sync({ force: true });
    const heroes = await Promise.all(createHeroes().map(superhero => {
      return Superhero.create(superhero);
    }));
    const users = await Promise.all(createUsers().map(user => {
      return User.create(user);
    }));
    const orders = await Promise.all(createOrders(users).map(order => {
      return Order.create(order);
    }));
    await Promise.all(createItemizedOrders(heroes, orders).map(itemizedOrder => {
      return ItemizedOrder.create(itemizedOrder);
    }));
    // MAGIC METHODS TO POPULATE DUMMY DATA - NOT WORKING!!!
    // await itemizedOrders[0].addSuperhero(superheroes[0])
    // await orders[0].addUser(users[0])
    //magic methods shouldnt be used because our thru table is carrying more information than
    //just orderID and superheroID, magic methods are used to populate when the thru table is simple.
    //when the thru table only contains the IDs to link, NOT when we have meaningful added attributes like days, subtotal, etc.
    //we should be MANUALLY entering in this data and not using magic methods to populate our table (bc how would magic methods know what to populate for days, subtotal, etc.)
  } catch (err) {
    console.log(err);
  }
};

  // Creating Users
function createUsers() {
  return [{
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
  ];
}

function createItemizedOrders(heroes, orders){
  return [{
      days: 5,
      subtotal: 500,
      superheroId: heroes[0].id,
      orderId: orders[0].id
    }, {
      days: 5,
      subtotal: 500,
      superheroId: heroes[1].id,
      orderId: orders[1].id
    }, {
      days: 8,
      subtotal: 800,
      superheroId: heroes[3].id,
      orderId: orders[2].id
    }
  ];
}

function createOrders(users) {
  return [{
    userId: users[0].id,
    totalDays: 5,
    checkOut: false,
    totalCost: 300,
  }, {
    userId: users[0].id,
    totalDays: 3,
    checkOut: false,
    totalCost: 500,
  }, {
    userId: users[1].id,
    totalDays: 8,
    checkOut: false,
    totalCost: 800,
  }];
}

function createHeroes() {
  return [{
    name: "Captain Planet",
    bio: "Captain Planet was the main hero of the cartoon series of the same name, he was an environmental-themed hero who was born as part of Mother Earth's quest to stop humanity from destroying itself and the environment",
    universe: "Marvel Comics",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/1285.jpg",
    strengths: "Power, Strength",
    availability: [],
    cost: 400
  }, {
    name: "Harry Potter",
    bio: "Harry Potter is the Boy Who Lived, the Chosen One, the hero of the Wizarding world. He grew up with Muggles, and then came to Hogwarts where he faced dangers and terrors beyond his years.",
    universe: "J. K. Rowling",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10878.jpg",
    strengths: "Power, Intelligence",
    availability: [],
    cost: 300
  }, {
    name: "Indiana Jones",
    bio: "Indiana Jones was an intrepid, fist-fighting archaeologist who wore a fedora and carried a bullwhip while racing the Nazis to unearth the lost Ark of the Covenant.",
    universe: "George Lucas",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10560.jpg",
    strengths: "Intelligence, Combat",
    availability: [],
    cost: 100
  }, {
    name: "Katniss Everdeen",
    bio: "Katniss Everdeen is a teenage girl who lives in District 12, an impoverished coal-mining region in the country of Panem. She's a volunteer tribute in Panem's annual Hunger Games, having taken the place of her younger sister in an act of heroic self-sacrifice.",
    universe: "N/A",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10484.jpg",
    strengths: "Intelligence, Combat",
    availability: [],
    cost: 100
  }, {
    name: "Naruto Uzumaki",
    bio: "Naruto Uzumaki is a shinobi of Konohagakure's Uzumaki clan. He became the jinchūriki of the Nine-Tails on the day of his birth — a fate that caused him to be shunned by most of Konoha throughout his childhood.",
    universe: "Shueisha",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/1540.jpg",
    strengths: "Power, Combat",
    availability: [],
    cost: 300
  }, {
    name: "Donatello",
    bio: "Donatello is the Turtle that is commonly accepted as the smartest of the group, specifically in matters related to scientific pursuits and technology. He is an accomplished inventor who is able to develop multiple advanced devices with minimal resources.",
    universe: "IDW Publishing",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10330.jpg",
    strengths: "Intelligence, Combat",
    availability: [],
    cost: 200
  }, {
    name: "Leonardo",
    bio: "Leonardo is the most senior of the Turtles and typically presented as their leader due to his commanding personality and his serious nature. Among his brothers, he is the most ordered and disciplined.",
    universe: "IDW Publishing",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10327.jpg",
    strengths: "Combat, Intelligence",
    availability: [],
    cost: 200
  }, {
    name: "Michelangelo",
    bio: "Michelangelo is the most lighthearted and the most happy-go-lucky of the four Ninja Turtles, with a more childlike outlook than the rest of his brothers. His main weapon is a pair of nunchaku.",
    universe: "IDW Publishing",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10329.jpg",
    strengths: "Combat, Durability",
    availability: [],
    cost: 200
  }, {
    name: "Raphael",
    bio: "Raphael is the Turtle who is best known for his sarcastic mouth and hair-trigger temper, which are present in almost all incarnations of the character. He is characterized by a red headband.",
    universe: "IDW Publishing",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10328.jpg",
    strengths: "Combat, Durability",
    availability: [],
    cost: 200
  }, {
    name: "Yoda",
    bio: "Yoda was a legendary Jedi Master and stronger than most in his connection with the Force. Small in size but wise and powerful, he trained Jedi for over 800 years, playing integral roles in the Clone Wars, the instruction of Luke Skywalker, and unlocking the path to immortality.",
    universe: "George Lucas",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10454.jpg",
    strengths: "Power, Combat",
    availability: [],
    cost: 400
  }, {
    name: "Buffy",
    bio: "Buffy is a Slayer, one in a long line of young women chosen for a specific mission: to seek out and destroy vampires, demons and other forces of darkness.",
    universe: "Dark Horse Comics",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10430.jpg",
    strengths: "Durability, Intelligence",
    availability: [],
    cost: 200
  }, {
    name: "Luke Skywalker",
    bio: "Luke Skywalker was a Tatooine farmboy who rose from humble beginnings to become one of the greatest Jedi the galaxy has ever known. Along with his friends Princess Leia and Han Solo, Luke battled the evil Empire.",
    universe: "George Lucas",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10447.jpg",
    strengths: "Power, Combat",
    availability: [],
    cost: 200
  }, {
    name: "Ethan Hunt",
    bio: "Ethan Hunt is a veteran IMF agent with extensive experience in covert operations, both intelligence and assault. He is quite gifted at planning secret intrusions.",
    universe: "N/A",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10476.jpg",
    strengths: "Combat, Intelligence",
    availability: [],
    cost: 100
  }, {
    name: "Godzilla",
    bio: "Godzilla is an enormous, destructive, prehistoric sea monster awakened and empowered by nuclear radiation.",
    universe: "N/A",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10590.jpg",
    strengths: "Strength, Durability",
    availability: [],
    cost: 500
  }, {
    name: "Han Solo",
    bio: "Han Solo rose from an impoverished childhood on the mean streets of Corellia to become one of the heroes of the Rebel Alliance. As captain of the Millennium Falcon, Han and his co-pilot Chewbacca came to believe in the cause of galactic freedom.",
    universe: "George Lucas",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10456.jpg",
    strengths: "Combat, Intelligence",
    availability: [],
    cost: 100
  }, {
    name: "Hercules",
    bio: "Hercules was inherently born a half-Olympian god from his biological father, Zeus, king of the Olympian gods and half-human from his biological mother, Alcmena.",
    universe: "Marvel Comics",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/78.jpg",
    strengths: "Strength, Combat",
    availability: [],
    cost: 200
  }, {
    name: "Hellboy",
    bio: "A demon, raised from infancy after being conjured by and rescued from the Nazis, grows up to become a defender against the forces of darkness.",
    universe: "Dark Horse Comics",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/813.jpg",
    strengths: "Durability, Combat",
    availability: [],
    cost: 300
  }, {
    name: "Kylo Ren",
    bio: "The son of Han Solo and Leia Organa, Ben Solo was seduced by the dark side of the Force and renamed himself Kylo Ren: leader of the Knights of Ren.",
    universe: "George Lucas",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10559.jpg",
    strengths: "Power, Combat",
    availability: [],
    cost: 200
  }, {
    name: "Darth Vader",
    bio: "Once a heroic Jedi Knight, Darth Vader was seduced by the dark side of the Force, became a Sith Lord, and led the Empire's eradication of the Jedi Order. He remained in service of the Emperor, the evil Darth Sidious, for decades.",
    universe: "George Lucas",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10444.jpg",
    strengths: "Power, Combat",
    availability: [],
    cost: 300
  }, {
    name: "Chuck Norris",
    bio: "Chuck Norris started studying martial arts in Korea in the 1950s. He was serving in the U.S. Air Force at the time. When he returned home, Norris soon opened his karate studio.",
    universe: "N/A",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/954.jpg",
    strengths: "Combat, Strength",
    availability: [],
    cost: 100
  }, {
    name: "Spawn",
    bio: "A highly trained assassin, murdered by his employer and former friend Chapel. Albert ''Al'' Francis Simmons sold his soul to Malebolgia, one of the many rulers of the Hell, in order to see his wife Wanda Blake again.",
    universe: "Image Comics",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/842.jpg",
    strengths: "Power, Combat",
    availability: [],
    cost: 300
  },
  {
    name: "Black Panther",
    bio: "Black Panther is the title held by T'Challa, a member of the royal family of the fictional African country of Wakanda. After the death of his father, T'Challa claimed the throne and the role of Black Panther.",
    universe: "Marvel",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/247.jpg",
    strengths: "Intelligence, Combat",
    availability: [],
    cost: 500
  },
  {
    name: "Wolverine",
    bio: "A mutant with an unstoppable healing power, adamantium metal claws and no-nonsense attitude makes the man called Logan, one of the most ferocious heroes in the universe.",
    universe: "Marvel",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/161.jpg",
    strengths: "Durability, Combat",
    availability: [],
    cost: 400
  },
  {
    name: "Thor",
    bio: "Thor was born to the King of the Asgardian Gods, Odin Borson, and the Earth Goddess Gaea. He grew up in Asgard under Odin's tutelage and trained in his footsteps to one day lead Asgard.",
    universe: "Marvel",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/140.jpg",
    strengths: "Durability, Strength",
    availability: [],
    cost: 300
  },
  {
    name: "Hulk",
    bio: "A green-skinned, hulking and muscular humanoid possessing a vast degree of physical strength, and his alter ego Dr. Robert Bruce Banner, a physically weak, socially withdrawn, and emotionally reserved physicist. The two exist as independent dissociative personalities, and resent each other.",
    universe: "Marvel",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/125.jpg",
    strengths: "Durability, Strength",
    availability: [],
    cost: 200
  },
  {
    name: "Captain America",
    bio: "Recipient of the Super Soldier serum, World War II hero Steve Rogers fights for American ideals as one of the worlds mightiest heroes and the leader of the Avengers.",
    universe: "Marvel",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/274.jpg",
    strengths: "Durability, Strength",
    availability: [],
    cost: 100
  },
  {
    name: "Daredevil",
    bio: "Daredevil was a morally righteous individual with a strong sense of law and justice. This also influenced him to become a lawyer. Daredevil objected to total violence and preferred to keep his enemies alive and thus defeated them rather than killed them.",
    universe: "Marvel",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/52.jpg",
    strengths: "Intelligence, Combat",
    availability: [],
    cost: 500
  },
  {
    name: "Punisher",
    bio: "a former Force Recon Marine-turned-vigilante. While serving in Afghanistan alongside with Billy Russo, where the duo became friends, Castle and Russo joined the black-ops team, Cerberus Squad under the command of CIA Officer William Rawlins aimed at capturing, interrogating, and executing high-value targets.",
    universe: "Marvel",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/112.jpg",
    strengths: "Intelligence, Combat",
    availability: [],
    cost: 400
  },
  {
    name: "Storm",
    bio: "Ororo Monroe Storm is a mutant. One of the primary sources of her powers on Earth is the electromagnetic field. She was previously stated to be a potential Omega Level Mutant,[1][2] and to be an Alpha-Level Mutant.",
    universe: "Marvel",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/170.jpg",
    strengths: "Power, Speed",
    availability: [],
    cost: 200
  },
  {
    name: "Jean Grey",
    bio: "Jean is a member of a subspecies of humans known as mutants, who are born with superhuman abilities. She was born with telepathic and telekinetic powers. Her powers first manifested when she saw her childhood friend being hit by a car.",
    universe: "Marvel",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/814.jpg",
    strengths: "Intelligence, Power",
    availability: [],
    cost: 100
  },
  {
    name: "Elektra",
    bio: "Elektra Natchios is an assassin who was trained under Stick to join the Chaste. She fell in love with Matt Murdock during a mission for Stick to bring Murdock into the organization.",
    universe: "Marvel",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/625.jpg",
    strengths: "Intelligence, Combat",
    availability: [],
    cost: 500
  },
  {
    name: "Emma Frost",
    bio: "Emma Frost is a powerful mutant telepath born to a rich Boston mercantile family. As a survivor of the Genoshan genocide due to her new ability to transform her body into nigh-indestructible diamond, she has become a valuable member of the X-Men.",
    universe: "Marvel",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/325.jpg",
    strengths: "Durability, Power",
    availability: [],
    cost: 100
  },
  {
    name: "Man-Thing",
    bio: "The Man-Thing is a large, slow-moving, empathic, humanoid swamp monster living in the Florida Everglades near a Seminole reservation and the fictitious town of Citrusville in Cypress County, Florida.",
    universe: "Marvel",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/382.jpg",
    strengths: "Durability, Power",
    availability: [],
    cost: 300
  },
  {
    name: "She-Hulk",
    bio: "Jennifer Walters is a talented lawyer and the cousin of Bruce Banner, the Hulk. After being shot by a mobster and seriously injured, she was saved by a blood transfusion from Bruce, and his gamma-irradiated blood mutated Jennifer into the She-Hulk.",
    universe: "Marvel",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/125.jpg",
    strengths: "Durability, Strength",
    availability: [],
    cost: 400
  },
  {
    name: "Invisible Woman",
    bio: "The Invisible Woman (Susan Storm Richards) is a fictional superhero appearing in The Fantastic Four. Sue Storm received her powers by being exposed to a cosmic storm",
    universe: "Marvel",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/620.jpg",
    strengths: "Durability, Intelligence",
    availability: [],
    cost: 500
  },
  {
    name: "Namor",
    bio: "The story of Namor began when his human father, explorer Leonard McKenzie, used explosive charges in the process of discovery that inadvertently caused damage to Atlantis. Namor's name means 'Avenging Son' in Atlantean.",
    universe: "Marvel",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/137.jpg",
    strengths: "Combat, Strength",
    availability: [],
    cost: 100
  },
  {
    name: "Luke Cage",
    bio: "Luke Cage is a man with super strength and unbreakable skin caused by a sabotaged experiment. He tries to rebuild a quiet life in Harlem, New York until he is pulled out of the shadows and forced into a battle for his city.",
    universe: "Marvel",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/269.jpg",
    strengths: "Combat, Durability",
    availability: [],
    cost: 200
  },
  {
    name: "Iron Fist",
    bio: "Iron Fist is an incredibly powerful fighter, who studied for a decade under the tutelage of the Thunderer in K'un-Lun. He is a master of all of K'un-Lun's martial arts.",
    universe: "Marvel",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/1120.jpg",
    strengths: "Combat, Power",
    availability: [],
    cost: 300
  },
  {
    name: "Moon Knight",
    bio: "Struggling with multiple personalities and amoral inclinations, Marc Spector fights on against all odds as the cloaked avenger Moon Knight.",
    universe: "Marvel",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/415.jpg",
    strengths: "Combat, Intelligence",
    availability: [],
    cost: 500
  },
  {
    name: "Angel",
    bio: "Angel is a mutant, an evolved species of humans who are born with superhuman abilities. The character originally possesses a pair of large feathered wings extending from his back, enabling him to fly.",
    universe: "Marvel",
    image: "https://www.superherodb.com/pictures2/portraits/10/100/10431.jpg",
    strengths: "Power, Intelligence",
    availability: [],
    cost: 500
  },];
}

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