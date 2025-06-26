import { useResponsive } from "@hooks/use-responsive";
import useToast from "@hooks/use-toast";
import { ActionIcon, Alert, Anchor, Drawer, Flex, Image, ScrollArea, Text } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { useSettingsStore } from "@store/settings";
import { IconCopy, IconDownload, IconExternalLink, IconInfoCircle } from "@tabler/icons-react";
import type { ISearXNGResultsImages } from "@ts/searxng.types";
import classes from "./styles.module.scss";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  viewImage: ISearXNGResultsImages["results"][0] | null;
}

const ImageView: React.FC<Props> = ({ isOpen, handleClose, viewImage }) => {
  const { copy } = useClipboard();
  const { toast } = useToast();

  const openInNewTab = useSettingsStore((state) => state.openInNewTab);

  const handleCopyToClipboard = () => {
    copy(viewImage?.url);
    toast.show({ message: "URL Copied" });
  };

  const isXs = useResponsive("max", "xs");
  const anchorTarget: React.HTMLAttributeAnchorTarget = isXs
    ? "_blank"
    : openInNewTab
    ? "_blank"
    : "_self";

  return (
    <Drawer
      offset={isXs ? 0 : 8}
      size="xl"
      radius={isXs ? 0 : "md"}
      opened={isOpen}
      onClose={handleClose}
      title={<Text size="xl">Image preview</Text>}
      position="right"
      closeButtonProps={{
        size: "lg",
      }}
      classNames={{
        header: classes.drawer_header,
        content: classes.drawer_root,
      }}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Text mt="md" size="lg" c="white">
        {viewImage?.title}
      </Text>

      {viewImage?.parsed_url && viewImage?.parsed_url.length > 2 ? (
        <Text size="xs" lineClamp={1} mt={30} className={classes.url_text}>
          {viewImage?.parsed_url[0]}://{viewImage?.parsed_url[1]}
        </Text>
      ) : null}

      <Image src={viewImage?.img_src} fit="contain" mt="lg" radius="md" />

      <Flex align="center" justify="flex-start" mt="xl" gap="xl">
        <Anchor href={viewImage?.url} target={anchorTarget} rel="noreferrer noopener">
          <Flex direction="column" align="center" justify="center">
            <ActionIcon variant="light" aria-label="Settings" size="xl">
              <IconExternalLink style={{ width: "60%", height: "60%" }} stroke={1.5} />
            </ActionIcon>

            <Text mt={5} size="sm" c="dimmed">
              Visit
            </Text>
          </Flex>
        </Anchor>

        <Anchor href={viewImage?.img_src} target="_blank" rel="noreferrer noopener">
          <Flex direction="column" align="center" justify="center">
            <ActionIcon variant="light" aria-label="Settings" size="xl">
              <IconDownload style={{ width: "60%", height: "60%" }} stroke={1.5} />
            </ActionIcon>

            <Text mt={5} size="sm" c="dimmed">
              Download
            </Text>
          </Flex>
        </Anchor>

        <Flex direction="column" align="center" justify="center">
          <ActionIcon
            variant="light"
            aria-label="Settings"
            size="xl"
            onClick={handleCopyToClipboard}
          >
            <IconCopy style={{ width: "60%", height: "60%" }} stroke={1.5} />
          </ActionIcon>

          <Text mt={5} size="sm" c="dimmed">
            Copy URL
          </Text>
        </Flex>
      </Flex>

      <Alert
        variant="light"
        color="gray"
        title="Images might be subject to copyright"
        my="xl"
        icon={<IconInfoCircle />}
      />
    </Drawer>
  );
};

export default ImageView;
