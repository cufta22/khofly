import { Dispatch } from "react";
import { calculate } from "./utils";

interface Args {
  btn: string;
  equation: string;
  result: string;
  setHistory: Dispatch<{ equation: string; result: string }[]>;
  setEquation: Dispatch<string>;
  setResult: Dispatch<string>;
  setVariant: Dispatch<"basic" | "scientific">;

  variant: "basic" | "scientific";
  history: { equation: string; result: string }[];
}

const countDecimals = (value: number) => {
  if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
};

const calculateResult = (equation: string): string | number => {
  // Calculate the result of the equation
  const { success, result } = calculate(equation);

  if (Number.isNaN(result)) {
    return result;
  } else if (success && typeof result === "number") {
    const resDecimals = Math.min(countDecimals(result), 10);

    // Calculated result
    return result.toFixed(resDecimals);
  } else {
    // Error message
    return result;
  }
};

export const handlePress = ({
  btn,
  equation,
  setEquation,
  setHistory,
  setResult,
  result,
  setVariant,
  history,
  variant,
}: Args) => {
  // Remove initial state of 0 when start typing
  const initialEq =
    // Don't allow ^ to be set to nothing
    equation === "0" && ["to_the_power", "1/x"].includes(btn)
      ? "0"
      : equation === "0"
      ? ""
      : equation;

  // Calculate equation
  if (btn === "equals") {
    // Check if equation exists
    if (!equation.length) return;

    const calculatedResult = calculateResult(equation);

    setHistory([
      ...history.slice(-4),
      { equation, result: `${calculatedResult}` },
    ]);
    setResult(`${calculatedResult}`);
  }

  // Switch basic/scientific
  if (btn === "switch") {
    setVariant(variant === "basic" ? "scientific" : "basic");
  }

  // Clear all
  if (btn === "clear") {
    setEquation("0");
    setResult("");
  }

  // Clear last
  if (btn === "backspace") {
    // Continue equation if result exists
    if (result.length) return setResult("");

    // Handle 3 letter operations
    if (["sin(", "cos(", "tan(", "log("].includes(equation.slice(-4)))
      return setEquation(`${initialEq.substring(0, equation.length - 4)}`);

    // Handle 2 letter operations
    if (["ln("].includes(equation.slice(-3)))
      return setEquation(`${initialEq.substring(0, equation.length - 3)}`);

    if (equation.length <= 1) return setEquation("0");

    return setEquation(`${initialEq.substring(0, equation.length - 1)}`);
  }

  // Set numbers
  if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(btn)) {
    // Continue equation if result exists
    if (result.length) setResult("");

    if (equation.slice(-1) === ")") return setEquation(`${initialEq}*${btn}`);

    return setEquation(`${initialEq}${btn}`);
  }

  // Set operation
  if (["+", "-", "*", "/", "%"].includes(btn)) {
    // Continue equation if result exists
    if (result.length) setResult("");

    // Only one operation
    if (
      ["+", "-", "*", "/", "%"].includes(equation.slice(-1)) &&
      ["+", "*", "/", "%"].includes(btn)
    )
      return setEquation(
        `${initialEq.substring(0, equation.length - 1)}${btn}`
      );

    // Handle negative numbers, part 2
    if (!["+", "*", "/", "%"].includes(equation.slice(-1)) && btn === "-")
      return setEquation(`${initialEq}-`);

    // Handle negative numbers, part 2
    if (["+", "*", "/", "%"].includes(equation.slice(-1)) && btn === "-")
      return setEquation(`${initialEq}(-`);

    return setEquation(`${initialEq}${btn}`);
  }

  // Set .
  if (btn === ".") {
    // Check only one dot
    if (equation.slice(-1) === ".") return;

    // Continue equation if result exists
    if (result.length) setResult("");

    return setEquation(`${initialEq}.`);
  }

  // Set parentheses
  if (["(", ")"].includes(btn)) {
    // Continue equation if result exists
    if (result.length) setResult("");

    return setEquation(`${initialEq}${btn}`);
  }

  // Set functions
  if (["sin", "cos", "tan", "log", "ln"].includes(btn)) {
    // Continue equation if result exists
    if (result.length) setResult("");

    // Add * if number was previously selected
    if (
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
        equation.slice(-1)
      ) &&
      equation.length > 1
    )
      return setEquation(`${initialEq}*${btn}(`);

    return setEquation(`${initialEq}${btn}(`);
  }

  // Set 1/x
  if (btn === "1/x") {
    // Continue equation if result exists
    if (result.length) setResult("");

    // Don't allow to be set at the beginning
    if (!equation.length) return;

    return setEquation(`${initialEq}^(-1)`);
  }

  // Set square root
  if (btn === "square_root") {
    // Continue equation if result exists
    if (result.length) setResult("");

    // Add * if number was previously selected
    if (
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
        equation.slice(-1)
      ) &&
      equation.length > 1
    )
      return setEquation(`${initialEq}*√(`);

    return setEquation(`${initialEq}√(`);
  }

  // Set to the power
  if (btn === "to_the_power") {
    // Only 1 ^ at a time
    if (equation.slice(-1) === "^") return;

    // Continue equation if result exists
    if (result.length) setResult("");

    return setEquation(`${initialEq}^`);
  }
};
