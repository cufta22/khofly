import { Divider, Flex, Stack, Text, Transition } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSelector } from "@tabler/icons-react";
import { IFC } from "@ts/global.types";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useLocation } from "react-router";

interface Props extends IFC {
  label?: React.ReactElement;
  className?: string;
}

export const IAWrapper: React.FC<Props> = ({ children, label, className }) => {
  const { pathname } = useLocation();
  const isDocs = pathname.includes("docs");

  const [visible, { toggle }] = useDisclosure(isDocs ? false : true);

  return (
    <Stack gap={0} className={className && className}>
      <Transition
        transition="scale-y"
        duration={300}
        mounted={visible}
        keepMounted={false}
      >
        {(transitionStyles) => <div style={transitionStyles}>{children}</div>}
      </Transition>

      <Flex mt="lg" align="center" justify="space-between">
        {label || (
          <Text c="dimmed" size="sm">
            This is an instant answer
          </Text>
        )}

        <Flex
          align="center"
          onClick={() => toggle()}
          style={{ cursor: "pointer" }}
        >
          <IconSelector style={getIconStyle(20)} stroke={1.5} />

          <Text c="dimmed" size="sm" ml={4}>
            Toggle
          </Text>
        </Flex>
      </Flex>

      <Divider mt="xs" />
    </Stack>
  );
};
