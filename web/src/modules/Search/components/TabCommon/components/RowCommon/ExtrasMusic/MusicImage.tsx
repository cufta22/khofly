import { Center, Image, Paper } from "@mantine/core";
import { IconVinyl } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import React from "react";

interface Props {
  img_src: string | undefined;
  thumbnail: string | undefined;
  className: string;
}

const MusicImage: React.FC<Props> = ({ className, img_src, thumbnail }) => {
  return img_src || thumbnail ? (
    <Image className={className} src={img_src || thumbnail} radius="md" />
  ) : (
    <Paper className={className}>
      <Center h="100%">
        <IconVinyl style={getIconStyle(26)} />
      </Center>
    </Paper>
  );
};

export default MusicImage;
