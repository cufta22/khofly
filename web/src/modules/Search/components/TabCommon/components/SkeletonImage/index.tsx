import { Flex, Skeleton } from "@mantine/core";

import classes from "./styles.module.scss";

const SkeletonImage = () => {
  return (
    <Flex className={classes.skeleton_image_container} direction="column" px={6}>
      <Skeleton className={classes.main} h={220} radius={8} />

      <Skeleton w="70%" h={10} radius={3} my={12} />
      <Skeleton w="40%" h={7} radius={3} />
    </Flex>
  );
};

export default SkeletonImage;
