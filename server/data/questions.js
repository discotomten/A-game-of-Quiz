const questions = {
  countries: [
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
  ],
};
export default questions;
