import { Button, Center } from "@mantine/core";
import { ICategories } from "@store/settings";
import React from "react";

interface Props {
  tab: ICategories;
  onClick: () => void;
}

const ButtonLoadMore: React.FC<Props> = ({ tab, onClick }) => {
  return ["images", "videos"].includes(tab) ? (
    <Center py="xl">
      <Button variant="filled" onClick={onClick} size="lg" color="dark.5">
        Load more
      </Button>
    </Center>
  ) : (
    <Button variant="filled" onClick={onClick} size="md" color="dark.5">
      Load more
    </Button>
  );
};

export default ButtonLoadMore;
