import RemixLink from "@components/RemixLink";
import { Card, Flex, Text } from "@mantine/core";

export interface DocsCardProps {
  href: string;
  title: string;
  description: string;
  icon?: any;
}

const DocsCard: React.FC<DocsCardProps> = ({
  description,
  href,
  title,
  icon,
}) => {
  return (
    <RemixLink to={href}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text size="xs" c="dimmed">
          {href}
        </Text>

        <Flex align="center" justify="flex-start" gap="xs" mt={4} mb="md">
          {icon && icon}
          <Text size="xl" fw={500}>
            {title}
          </Text>
        </Flex>

        <Text size="sm" c="dimmed">
          {description}
        </Text>
      </Card>
    </RemixLink>
  );
};

export default DocsCard;
