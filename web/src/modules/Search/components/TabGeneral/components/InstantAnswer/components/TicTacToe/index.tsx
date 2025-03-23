import { useState } from "react";
import { IAWrapper } from "../../wrapper";
import { ActionIcon, Center, Flex, Overlay, Paper, SimpleGrid } from "@mantine/core";
import classes from "./styles.module.scss";
import { IconCircle, IconReload, IconX } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

interface Props {
  withIAWrapper: boolean;
}

type Player = "X" | "O";
type BoardState = (Player | null)[];

const IATicTacToe: React.FC<Props> = ({ withIAWrapper }) => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [winner, setWinner] = useState<Player | "Draw" | null>(null);
  const [nextMove, setNextMove] = useState<Player | null>("X");

  const PLAYER_1: Player = "X";
  const PLAYER_2: Player = "O";

  const checkWinner = (squares: BoardState): Player | "Draw" | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a] as Player;
      }
    }

    if (squares.every((square) => square !== null)) {
      return "Draw";
    }

    return null;
  };

  const findWinningMove = (squares: BoardState, player: Player): number | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      const lineSquares = [squares[a], squares[b], squares[c]];
      if (
        lineSquares.filter((square) => square === player).length === 2 &&
        lineSquares.includes(null)
      ) {
        if (squares[a] === null) return a;
        if (squares[b] === null) return b;
        if (squares[c] === null) return c;
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = nextMove;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setNextMove(nextMove === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setNextMove("X");
    setWinner(null);
  };

  const getStatus = () => {
    if (winner === "Draw") return "It's a draw!";
    if (winner) return `${winner} wins!`;
    return `Your turn ${nextMove}`;
  };

  const tttComponent = (
    <Center>
      <SimpleGrid cols={3} className={classes.ttt_wrapper}>
        {board.map((value, index) => (
          <Paper
            key={index}
            onClick={() => handleClick(index)}
            className={classes.field}
            radius="md"
            withBorder
            // disabled={!!value || !!winner || !isHumanTurn}
          >
            {value === "X" ? (
              <IconX style={getIconStyle(40)} />
            ) : value === "O" ? (
              <IconCircle style={getIconStyle(40)} />
            ) : (
              ""
            )}
          </Paper>
        ))}
        {winner ? (
          <Overlay radius="md">
            <Center h="100%">
              <Flex direction="column" align="center">
                <ActionIcon size="xl" onClick={resetGame}>
                  <IconReload />
                </ActionIcon>
              </Flex>
            </Center>
          </Overlay>
        ) : null}
      </SimpleGrid>
    </Center>
  );

  if (withIAWrapper) return <IAWrapper>{tttComponent}</IAWrapper>;

  return tttComponent;
};

export default IATicTacToe;
