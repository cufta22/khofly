import type { IKeyboard } from ".";

export const KEYBOARD_EN_US: IKeyboard = {
  row_1_normal: ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "delete"],
  row_1_shift: ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "delete"],
  row_2_normal: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
  row_2_shift: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}"],
  row_3_normal: ["caps-lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\"],
  row_3_shift: ["caps-lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"', "|"],
  row_4_normal: ["shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "shift"],
  row_4_shift: ["shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "shift"],
  row_5_normal: ["ctrl-alt", "fn", "space", "ctrl-alt"],
};
