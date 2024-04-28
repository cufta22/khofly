import { Center, Drawer } from "@mantine/core";
import React, { useEffect, useRef } from "react";
import classes from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  iframeSrc: string;
}

const MusicPlayer: React.FC<Props> = ({ isOpen, handleClose, iframeSrc }) => {
  const ref = useRef<HTMLIFrameElement>();

  // const play = () => {
  //     ref.current?.onplay((e) => {})
  // }

  useEffect(() => {
    if (ref.current) {
      // ref.current.pause
    }
  }, [ref.current]);
  return (
    <Drawer
      opened={isOpen}
      onClose={handleClose}
      //   title="Music iframe"
      position="bottom"
      size={180}
      withOverlay={false}
      withCloseButton={false}
      removeScrollProps={{ enabled: false }}
      onClick={handleClose}
    >
      <Center>
        {/* <iframe className={classes.music_iframe} src={iframeSrc} /> */}
        <iframe width="100%" src={iframeSrc} />
      </Center>
    </Drawer>
  );
};

export default MusicPlayer;
