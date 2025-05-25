import { ActionIcon, Anchor, Center, Flex, Loader, LoadingOverlay, Text } from "@mantine/core";
import { IconChevronLeft, IconExternalLink } from "@tabler/icons-react";
import classes from "./styles.module.scss";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useNavigate, useSearchParams } from "react-router";
import { useState } from "react";
import { useInstanceStore } from "@store/instance";

const SANDBOX_CONFIG = [
  // This allows access to the parent's cookies and storage.
  "allow-same-origin",
  // Re-enables form submission
  "allow-forms",
  // Allows JS
  "allow-scripts",
  // Allows top-level navigation, but only if initiated by a user action
  "allow-top-navigation-by-user-activation",
  // Allows top-level navigation
  //   "allow-top-navigation",
];

const PagePrivateView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const url = searchParams.get("url");

  const pvDomain = useInstanceStore((state) => state.pvDomain);

  return (
    <>
      {/* Header */}
      <Flex
        className={classes.private_view_header}
        align="center"
        justify="space-between"
        px="sm"
        py={4}
      >
        <Flex align="center">
          <ActionIcon size="md" color="white" variant="light" onClick={() => navigate(-1)}>
            <IconChevronLeft />
          </ActionIcon>

          <Text size="lg" ml="sm" c="grape.4">
            Private View
          </Text>
        </Flex>

        <Anchor>
          <Flex align="center">
            <IconExternalLink style={getIconStyle(20)} color="white" />

            <Text ml="sm" c="white">
              Visit original website
            </Text>
          </Flex>
        </Anchor>
      </Flex>

      {/* Iframe container */}
      <Flex className={classes.iframe_container}>
        {/* Loading indicator */}
        <LoadingOverlay
          visible={loading}
          loaderProps={{
            size: "xl",
          }}
        />

        {/* Iframe content */}
        {pvDomain && (
          <iframe
            src={`${pvDomain}/proxy/page?url=${encodeURIComponent(url || "")}`}
            title="Anonymous Content"
            // sandbox={SANDBOX_CONFIG.join(" ")}
            className={classes.private_iframe}
            onLoad={(e) => {
              setLoading(false);
            }}
          />
        )}
      </Flex>
    </>
  );
};

export default PagePrivateView;
