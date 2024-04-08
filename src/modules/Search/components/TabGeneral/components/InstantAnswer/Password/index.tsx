import { useEffect, useState } from "react";
import { IAWrapper } from "../wrapper";
import { Text } from "@mantine/core";

const generatePassword = () => {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{};':\"\\|,.<>/?";

  let password = "";
  const charSets = [lowercaseChars, uppercaseChars, numbers, symbols];

  // Guarantee at least one character from each set
  for (const charSet of charSets) {
    password += charSet.charAt(Math.floor(Math.random() * charSet.length));
  }

  // Fill remaining characters randomly from all sets
  for (let i = password.length; i < 16; i++) {
    const randomSet = charSets[Math.floor(Math.random() * charSets.length)];
    password += randomSet.charAt(Math.floor(Math.random() * randomSet.length));
  }

  // Shuffle the characters for better randomness (optional)
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return password;
};

const IAPassword = () => {
  return (
    <IAWrapper
      label={
        <Text size="sm" c="dimmed">
          Random password: 16 characters, great strength
        </Text>
      }
    >
      <Text size="lg" fw={500}>
        {generatePassword()}
      </Text>
    </IAWrapper>
  );
};

export default IAPassword;
