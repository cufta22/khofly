import { Accordion, Center, Container, Loader, Title } from "@mantine/core";
import { formatChangelog } from "./formatChangelog";
import { useEffect, useState } from "react";
import { useTranslate } from "@hooks/translate/use-translate";

const getChangelogData = async (nodeEnv: string) => {
  const envUrl =
    nodeEnv === "production"
      ? "https://raw.githubusercontent.com/cufta22/khofly/master/CHANGELOG.md"
      : "https://raw.githubusercontent.com/cufta22/khofly/staging/CHANGELOG.md";

  const data = await fetch(envUrl);

  const changelog = await data.text();

  return changelog;
};

const PageChangelog = () => {
  const t = useTranslate();

  const [data, setData] = useState("");

  useEffect(() => {
    getChangelogData(process.env.NODE_ENV || "development").then((res) => setData(res));
  }, []);

  if (!data)
    return (
      <Center mt={100}>
        <Loader size="xl" />
      </Center>
    );

  return (
    <Container size="lg" py="xl" mt={40} mb={40}>
      <Title ta="center" mt="md" mb="xl">
        {t("pages.changelog.title")}
      </Title>

      <Accordion variant="separated" defaultValue="customization">
        {formatChangelog(data).map((obj, i) => {
          return (
            <Accordion.Item key={i} value={obj.title}>
              <Accordion.Control>{obj.title}</Accordion.Control>
              <Accordion.Panel style={{ whiteSpace: "pre" }} mt={12}>
                {obj.content.replace(/^\s+/g, "")}
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Container>
  );
};

export default PageChangelog;
