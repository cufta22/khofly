// import { Select, Switch } from "@mantine/core";
// import { type IWidgetPosition, useHomepageStore } from "@store/homepage";

// interface Props {
//   type: "todos" | "weather" | "clock" | "notes";
// }

// const PositionSelect: React.FC<Props> = ({ type }) => {
//   const todosPosition = useHomepageStore((state) => state.todosPosition);
//   const setTodosPosition = useHomepageStore((state) => state.setTodosPosition);
//   const notesPosition = useHomepageStore((state) => state.notesPosition);
//   const setNotesPosition = useHomepageStore((state) => state.setNotesPosition);
//   const weatherPosition = useHomepageStore((state) => state.weatherPosition);
//   const setWeatherPosition = useHomepageStore((state) => state.setWeatherPosition);
//   const clockPosition = useHomepageStore((state) => state.clockPosition);
//   const setClockPosition = useHomepageStore((state) => state.setClockPosition);

//   const value =
//     type === "todos" ? todosPosition : type === "weather" ? weatherPosition : clockPosition;

//   const handleChange = (value: IWidgetPosition) => {
//     switch (type) {
//       case "todos":
//         setTodosPosition(value);
//         break;
//       case "weather":
//         setWeatherPosition(value);
//         break;
//       case "clock":
//         setClockPosition(value);
//         break;
//       case "notes":
//         setNotesPosition(value);
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <Select
//       value={value}
//       onChange={(val) => handleChange(val as IWidgetPosition)}
//       data={[
//         { label: "Top Left", value: "top-left" },
//         { label: "Top Right", value: "top-right" },
//       ]}
//       w={150}
//     />
//   );
// };

// export default PositionSelect;
