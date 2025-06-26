import { useFetch } from "@mantine/hooks";
import { IAWrapper } from "../../wrapper";
import { Flex, Text } from "@mantine/core";
import { useEffect } from "react";
import { useInstanceStore } from "@store/instance";
import type { IAPIResponse } from "@ts/global.types";

const IAIP = () => {
  const apiDomain = useInstanceStore((state) => state.apiDomain);
  const hydrated = useInstanceStore((state) => state.hydrated);

  const { data, loading, refetch } = useFetch<IAPIResponse<string>>(`${apiDomain}/ip`, {
    autoInvoke: false,
  });

  useEffect(() => {
    if (hydrated && !data) refetch();
  }, [hydrated]);

  return (
    <IAWrapper
      label={
        <Text size="sm" c="dimmed">
          What's my IP
        </Text>
      }
    >
      <Flex align="center" justify="space-between">
        <Text size="lg" fw={500}>
          {loading ? "Loading..." : data?.data}
        </Text>
      </Flex>
    </IAWrapper>
  );
};

export default IAIP;
