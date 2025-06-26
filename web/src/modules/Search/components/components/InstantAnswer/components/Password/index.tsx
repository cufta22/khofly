import { useMounted } from "@mantine/hooks";
import { IAWrapper } from "../../wrapper";
import { ActionIcon, Flex, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { IconReload } from "@tabler/icons-react";

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
  const [password, setPassword] = useState("");

  const updatePassword = () => {
    setPassword(generatePassword());
  };

  useEffect(() => {
    updatePassword();
  }, []);

  return (
    <IAWrapper
      label={
        <Text size="sm" c="dimmed">
          Random strong password
        </Text>
      }
    >
      <Flex align="center" justify="space-between">
        <Text size="lg" fw={500}>
          {password}
        </Text>

        <ActionIcon size="lg" variant="subtle" onClick={updatePassword}>
          <IconReload />
        </ActionIcon>
      </Flex>
    </IAWrapper>
  );
};

export default IAPassword;
