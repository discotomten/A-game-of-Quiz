const questions = {
  geography: [
    {
      id: 1,
      question: "Vilket stad är Sveriges huvudstad?",
      options: {
        1: "Göteborg",
        X: "Stockholm",
        2: "Malmö",
      },
      correct: "X",
    },
    {
      id: 2,
      question: "Vilket land har Paris som huvudstad",
      options: {
        1: "Tyskland",
        X: "Italien",
        2: "Frankrike",
      },
      correct: "2",
    },
    {
      id: 3,
      question: "Vilken av följande floder rinner INTE genom Tyskland?",
      options: {
        1: "Seine",
        X: "Elbe",
        2: "Rhen",
      },
      correct: "1",
    },
    {
      id: 4,
      question: "Vilken kontinent har flest länder?",
      options: {
        1: "Asien",
        X: "Europa",
        2: "Afrika",
      },
      correct: "2",
    },
    {
      id: 5,
      question: "Vilket av följande hav gränsar INTE till Europa?",
      options: {
        1: "Svarta havet",
        X: "Tyrrenska havet",
        2: "Arabiska havet",
      },
      correct: "2",
    },
    {
      id: 6,
      question: "Vilken är huvudstaden i Zimbabwe?",
      options: {
        1: "Lusaka",
        X: "Harare",
        2: "Rundu",
      },
      correct: "X",
    },
    {
      id: 7,
      question: "I vilket landskap hittar du vattenfallet Njupeskär?",
      options: {
        1: "Dalarna",
        X: "Värmland",
        2: "Lappland",
      },
      correct: "1",
    },
    {
      id: 8,
      question: "I vilken stad hittar man den berömda Via Dolorosa?",
      options: {
        1: "Israel",
        X: "Kairo",
        2: "Jerusalem",
      },
      correct: "2",
    },
    {
      id: 9,
      question:
        "Vilken miljonstad grundades år 1521 på ruinerna av den gamla aztekiska huvudstaden Tenochitlan?",
      options: {
        1: "Mexico City",
        X: "Dubai",
        2: "Colombia",
      },
      correct: "1",
    },
    {
      id: 10,
      question: "Vilken är Sveriges längsta flod?",
      options: {
        1: "Luleälven",
        X: "Göta älv",
        2: "Torneälven",
      },
      correct: "X",
    },
  ],

  animals: [
    {
      id: 1,
      question: "Hur många ben har en spindel?",
      options: {
        1: "6",
        X: "8",
        2: "10",
      },
      correct: "X",
    },
    {
      id: 2,
      question: "Vilket djur är störst?",
      options: { 1: "Elefant", X: "Blåval", 2: "Giraff" },
      correct: "X",
    },
    {
      id: 3,
      question: "Vilket djur har flest tänder?",
      options: {
        1: "Vithaj",
        X: "Krokodil",
        2: "Snigel",
      },
      correct: "2",
    },
    {
      id: 4,
      question: "Vilket djur har fyrkantig spillning?",
      options: {
        1: "Vombat",
        X: "Koala",
        2: "Räv",
      },
      correct: "1",
    },
    {
      id: 5,
      question: "Vilken färg har en koltrasthona?",
      options: {
        1: "Röd",
        X: "Gul",
        2: "Brun",
      },
      correct: "2",
    },
    {
      id: 6,
      question:
        "Vilket är det snabbaste landdjuret på jorden, med en hastighet på över 100km/h?",
      options: {
        1: "Gepard",
        X: "Gaffelantilop",
        2: "Prärievarg",
      },
      correct: "1",
    },
    {
      id: 7,
      question: "Vilken är den enda flygande däggdjursarten i världen?",
      options: {
        1: "Kungsörn",
        X: "Fladdermus",
        2: "Harpya",
      },
      correct: "X",
    },
    {
      id: 8,
      question: "Hur lång är dräktighetstiden för en giraff?",
      options: {
        1: "10 månader",
        X: "15 månader",
        2: "11 månader",
      },
      correct: "X",
    },
    {
      id: 9,
      question:
        "Vilket djur äter nästan enbart bambu och kan konsumera mellan 12 och 40kg per dag?",
      options: {
        1: "Pandan",
        X: "Gorillan",
        2: "Elefant",
      },
      correct: "1",
    },
    {
      id: 10,
      question: "Vilken är den största fjärilsarten i världen?",
      options: {
        1: "Apollofjäril",
        X: "Tistelfjäril",
        2: "Atlasfjäril",
      },
      correct: "2",
    },
  ],
  sport: [
    {
      id: 1,
      question:
        "Vad kallas det i simning när man simmar alla fyra simsätt i följd, fjäril, rygg, bröst och frisim?",
      options: {
        1: "Medley",
        X: "Padley",
        2: "Fidley",
      },
      correct: "1",
    },
    {
      id: 2,
      question:
        "I vilken sport används termen love för att beskriva noll poäng?",
      options: {
        1: "Badminton",
        X: "Tennis",
        2: "Cricket",
      },
      correct: "X",
    },
    {
      id: 3,
      question:
        "Vilka två svenska skidåkare är de enda som har vunnit nio OS medaljer vardera?",
      options: {
        1: "Sixten Jernberg och Charlotte Kalla",
        X: "Alvar Myhlback och Edvin Anger",
        2: "Gunde Svan och Water Wallberg",
      },
      correct: "1",
    },
    {
      id: 4,
      question: "Vilket land vann fotbolls-VM för herrar 2018?",
      options: {
        1: "Spanien",
        X: "Frankrike",
        2: "Belgien",
      },
      correct: "X",
    },
    {
      id: 5,
      question: "Hur många guldmedaljer vann Michael Phelps is OS 2008?",
      options: {
        1: "6",
        X: "9",
        2: "8",
      },
      correct: "2",
    },
    {
      id: 6,
      question: "I vilken sport kan man vinna trofén 'Stanley Cup'?",
      options: {
        1: "Ishockey",
        X: "Fotboll",
        2: "Basket",
      },
      correct: "1",
    },
    {
      id: 7,
      question: "Vilket år hölls de första olympiska spelen i modern tid?",
      options: {
        1: "1896",
        X: "1905",
        2: "1879",
      },
      correct: "1",
    },
    {
      id: 8,
      question:
        "Vilken tysk formel 1-förare har vunnit sju världsmästartitlar?",
      options: {
        1: "Lewis Hamilton",
        X: "Max Verstappen",
        2: "Michael Schumacher",
      },
      correct: "2",
    },
    {
      id: 9,
      question: "Vilken legendarisk fotbollsspelare fick smeknamnet Pelusa?",
      options: {
        1: "Lionel Messi",
        X: "Diego Maradona",
        2: "Christiano Ronaldo",
      },
      correct: "X",
    },
    {
      id: 10,
      question:
        "Vilken svenska friidrottare vann OS-guld i tresteg 2004 i Aten?",
      options: {
        1: "Christian Olsson",
        X: "Tord Henriksson",
        2: "Maja Åskag",
      },
      correct: "1",
    },
  ],
  music: [
    {
      id: 1,
      question:
        "Ozzy Osbourne slog igenom som sångare i ett av de mest inflytelserika hårdrocksbanden i historien. Vad heter bandet?",
      options: {
        1: "Black Sabbath",
        X: "Mötley Crüe",
        2: "Scorpions",
      },
      correct: "1",
    },
    {
      id: 2,
      question:
        "Spice Girls blev väldigt populära på 90-talet, men en av medlemmarna var inte med från starten. Vem?",
      options: {
        1: "Mel B - Scary Spice",
        X: "Melanie C - Sporty Spice",
        2: "Emma Burton - Baby Spice ",
      },
      correct: "2",
    },
    {
      id: 3,
      question: "Vilken ikon mördades den 8 december 1980 i New York?",
      options: {
        1: "Tupac",
        X: "John Lennon",
        2: "Ian Curtis",
      },
      correct: "X",
    },
    {
      id: 4,
      question:
        "Vilken popsångerska slog igenom globalt med låten 'Genie in a Bottle' år 1999?",
      options: {
        1: "Madonna",
        X: "Britney Spears",
        2: " Christina Aguilera",
      },
      correct: 2,
    },
    {
      id: 5,
      question: "Vilken artist har vunnit flest Grammy Awards genom tiderna?",
      options: {
        1: "Beyoncé",
        X: "Mariah Carey",
        2: "Michael Jackson",
      },
      correct: "1",
    },
    {
      id: 6,
      question:
        "Vilken svensk grupp är känd för hits som 'The Sign' och 'All That She Wants'?",
      options: {
        1: "Ace of base",
        X: "Ghost",
        2: "Roxette",
      },
      correct: "1",
    },
    {
      id: 7,
      question:
        "Vilken brittisk artist samarbetade med Elton John på låten 'Cold Heart' år 2021?",
      options: {
        1: "Ariana Grande",
        X: "Selena Gomez",
        2: "Dua lipa",
      },
      correct: "2",
    },
    {
      id: 8,
      question: "Vilken artist gjorde 'I Love It' tillsammans med Icona Pop?",
      options: {
        1: "Billie Eilish",
        X: "Charlie XCX",
        2: "Camila Cabello",
      },
      correct: "X",
    },
    {
      id: 9,
      question: "Vem sjunger låten 'Stairway to Heaven'? ",
      options: {
        1: "Prince",
        X: "Led Zeppelin",
        2: "Aerosmith",
      },
      correct: "X",
    },
    {
      id: 10,
      question:
        "Vilken artist är känd för låtar som 'Rocket Man' och 'Your Song'? ",
      options: {
        1: "Elton John",
        X: "Queen",
        2: "David Bowie",
      },
      correct: "1",
    },
  ],
};
export default questions;
