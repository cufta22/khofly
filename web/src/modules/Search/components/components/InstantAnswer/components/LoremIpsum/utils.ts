const RANDOM_WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "in",
  "reprehenderit",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum",
  "at",
  "vero",
  "eos",
  "accusamus",
  "accusantium",
  "doloremque",
  "laudantium",
  "totam",
  "rem",
  "aperiam",
  "eaque",
  "ipsa",
  "quae",
  "ab",
  "illo",
  "inventore",
  "veritatis",
  "architecto",
  "beatae",
  "vitae",
  "dicta",
  "explicabo",
  "nemo",
  "ipsam",
  "voluptatem",
  "quia",
  "voluptas",
  "aspernatur",
  "odit",
  "aut",
  "fugit",
  "consequuntur",
  "magni",
  "dolores",
  "ratione",
  "sequi",
  "nesciunt",
  "neque",
  "porro",
  "quisquam",
  "dolorem",
  "adipisci",
  "numquam",
  "eius",
  "modi",
  "tempora",
  "incidunt",
  "magnam",
  "quaerat",
  "voluptatibus",
  "minus",
];

const getRandomWord = () => {
  return RANDOM_WORDS[Math.floor(Math.random() * RANDOM_WORDS.length)];
};

const capitalizeFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const generateWords = (count: number, startWithLorem: boolean) => {
  let c = count;
  const words = [];

  if (startWithLorem && count >= 2) {
    words.push("Lorem", "ipsum");
    c -= 2;
  }

  for (let i = 0; i < c; i++) {
    words.push(getRandomWord());
  }

  return words.join(" ");
};

const generateSentence = (minWords = 4, maxWords = 15, startWithLorem = false) => {
  const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  const sentence = generateWords(wordCount, startWithLorem);
  return capitalizeFirst(sentence) + ".";
};

export const generateLoremIpsumParagraph = (
  minSentences = 4,
  maxSentences = 6,
  startWithLorem = false
) => {
  const sentenceCount =
    Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
  const sentences = [];

  for (let i = 0; i < sentenceCount; i++) {
    const isFirstSentence = i === 0;
    sentences.push(generateSentence(4, 15, startWithLorem && isFirstSentence));
  }

  return sentences.join(" ");
};
