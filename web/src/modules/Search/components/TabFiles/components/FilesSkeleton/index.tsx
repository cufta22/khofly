import { Flex, Skeleton } from "@mantine/core";
import classes from "./styles.module.scss";

const FilesSkeleton = () => {
  return (
    <Flex className={classes.files_row_skeleton} direction="column">
      {/* Website url */}
      <Flex align="center" gap="xs" mb={8}>
        <Skeleton height={18} width={16} radius="sm" />

        <Skeleton height={14} width="40%" radius="md" />
      </Flex>

      {/* Website title */}
      <Skeleton height={18} mb={12} width="30%" radius="md" />

      {/* Website description */}
      <Skeleton height={8} mb={6} radius="md" />
      <Skeleton height={8} mb={6} radius="md" />
      <Skeleton height={8} mb={6} radius="md" />
      <Skeleton height={8} width="70%" radius="md" />
    </Flex>
  );
};

export default FilesSkeleton;
