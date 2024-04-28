import { Flex, Skeleton } from "@mantine/core";
import classes from "./styles.module.scss";

const MusicSkeleton = () => {
  return (
    <Flex className={classes.music_row} direction="column">
      {/* Website url */}
      <Flex align="center" gap="xs" mb={8}>
        <Skeleton height={18} width={16} radius="sm" />

        <Skeleton height={14} width="40%" radius="md" />
      </Flex>

      <Flex w="100%" gap="sm">
        <Flex>
          <Skeleton height={100} mb={12} width={100} radius="md" />
        </Flex>

        <Flex direction="column" w="100%">
          {/* Website title */}
          <Skeleton height={18} mb={12} width="30%" radius="md" />

          {/* Website description */}
          <Skeleton height={8} mb={6} radius="md" />
          <Skeleton height={8} width="70%" radius="md" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MusicSkeleton;
