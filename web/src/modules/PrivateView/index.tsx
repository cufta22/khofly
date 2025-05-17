import { ActionIcon, Anchor, Center, Flex, Loader, Text } from "@mantine/core";
import { IconChevronLeft, IconExternalLink } from "@tabler/icons-react";
import classes from "./styles.module.scss";
import { getIconStyle } from "@utils/functions/iconStyle";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
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

  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const url = searchParams.get("url");

  const apiDomain = useInstanceStore((state) => state.apiDomain);

  useEffect(() => {
    const fetchContent = async () => {
      if (!url || !apiDomain) return;

      try {
        const response = await fetch(`${apiDomain}/proxy/view?url=${encodeURIComponent(url)}`);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");

        if (contentType?.includes("text/html")) {
          const html = await response.text();
          setContent(html);
        } else {
          // For non-HTML content, create a redirect
          window.location.href = `${apiDomain}/proxy/view?url=${encodeURIComponent(url)}`;
        }
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [url, apiDomain]);

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

      {/* Page content */}
      {isLoading ? (
        <Center className={classes.loading_state}>
          <Loader size="xl" />
        </Center>
      ) : error ? (
        ""
      ) : (
        <iframe
          srcDoc={content}
          // src={`${apiDomain}/proxy/view?url=${encodeURIComponent(url || "")}`}
          title="Anonymous Content"
          // sandbox={SANDBOX_CONFIG.join(" ")}
          className={classes.private_iframe}
        />
      )}
    </>
  );
};

export default PagePrivateView;
