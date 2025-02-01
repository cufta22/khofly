import { Accordion, Center, Container, Loader, Title } from "@mantine/core";
import { formatChangelog } from "./formatChangelog";
import React, { useEffect, useState } from "react";
import { useTranslate } from "@hooks/translate/use-translate";
import { ILoaderData_Changelog } from "app/routes/changelog";

interface Props {
  loaderData: ILoaderData_Changelog;
}

const PageChangelog: React.FC<Props> = ({ loaderData }) => {
  const t = useTranslate();

  if (!loaderData.data)
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
        {formatChangelog(loaderData.data).map((obj, i) => {
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
