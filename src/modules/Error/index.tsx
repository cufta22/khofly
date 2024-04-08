import React from "react";
import {
  Title,
  Text,
  Button,
  Container,
  Center,
  Accordion,
} from "@mantine/core";
import classes from "./styles.module.scss";
import { Link } from "@remix-run/react";

interface Props {
  code: number;
  title: string;
  message: string;
  stack?: string;
}

const ErrorPage: React.FC<Props> = ({ code, title, message, stack }) => {
  return (
    <Container className={classes.root} size="xl">
      <div className={classes.label}>{code}</div>

      <Title className={classes.title}>{title}</Title>

      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        {message}
      </Text>

      {stack && (
        <Accordion variant="separated" defaultValue="stack" mb="lg">
          <Accordion.Item value="stack">
            <Accordion.Control>Error stack</Accordion.Control>
            <Accordion.Panel>
              <Text
                c="dimmed"
                size="sm"
                style={{ whiteSpace: "pre", overflowX: "scroll" }}
              >
                {stack}
              </Text>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      )}

      <Center>
        <Link to="/">
          <Button variant="subtle" size="md">
            Take me back to home page
          </Button>
        </Link>
      </Center>
    </Container>
  );
};

export default ErrorPage;
