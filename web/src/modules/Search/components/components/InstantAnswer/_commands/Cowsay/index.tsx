import { Text } from "@mantine/core";
import { IAWrapper } from "../../wrapper";
import classes from "./styles.module.scss";

// ASCII art cow
const COW_ART = `
^__^
(oo)\\_______
(__)\\       )\\/\\
    ||----w |
    ||     ||
`;

interface Props {
  message: string;
}

const IACowsay: React.FC<Props> = ({ message }) => {
  // Function to wrap text
  const wrapText = (text: string, maxWidth = 40) => {
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine: string[] = [];

    for (const word of words) {
      if (`${currentLine.join(" ")} ${word}`.length > maxWidth) {
        lines.push(currentLine.join(" "));
        currentLine = [word];
      } else {
        currentLine.push(word);
      }
    }

    if (currentLine.length > 0) {
      lines.push(currentLine.join(" "));
    }

    return lines;
  };

  // Generate speech bubble
  const generateSpeechBubble = (lines: string[]) => {
    const maxWidth = Math.max(...lines.map((line) => line.length));

    const top = ` ${`_`.repeat(maxWidth + 2)}`;
    const bottom = ` ${`-`.repeat(maxWidth + 2)}`;

    const textLines = lines.map((line) => `| ${line}${" ".repeat(maxWidth - line.length)} |`);

    return [top, ...textLines, bottom].join("\n");
  };

  const wrappedLines = wrapText(message);
  const speechBubble = generateSpeechBubble(wrappedLines);

  return (
    <IAWrapper
      label={
        <Text c="dimmed" size="sm">
          This is a command like instant answer
        </Text>
      }
    >
      <div>
        <pre className={classes.pre}>{speechBubble}</pre>
        <pre className={classes.pre}>{COW_ART}</pre>
      </div>
    </IAWrapper>
  );
};

export default IACowsay;
