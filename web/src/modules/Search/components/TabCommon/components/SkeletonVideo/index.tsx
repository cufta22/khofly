import { Flex, Skeleton } from "@mantine/core";

import classes from "./styles.module.scss";

const SkeletonVideo = () => {
  return (
    <Flex className={classes.skeleton_video_container} direction="column" px={6}>
      <Skeleton h={220} radius={8} />

      <Skeleton w="70%" h={10} radius={3} my={12} />
      <Skeleton w="40%" h={7} radius={3} />
    </Flex>
  );
};

export default SkeletonVideo;
