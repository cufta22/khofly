// Basic list of vulgar words (add more as needed)
const filterWords = [
  "fuck",
  "shit",
  "cunt",
  "asshole",
  "bitch",
  "piss",
  "cock",
  "dick",
  "pussy",
  "fucker",
  "motherfucker",
  "slut",
  "whore",
  "nigger",
  "nigga",
  "niga",
  "niger",
  "niggers",
  "niggas",
];

export const profanityFilter = (text: string) => {
  // Create a regular expression to match any of the vulgar words (case-insensitive)
  const regex = new RegExp(filterWords.join("|"), "gi");

  // Replace all occurrences of vulgar words with the censored word
  return text.replace(regex, "****");
};
