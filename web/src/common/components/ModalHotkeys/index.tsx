import { Kbd, Modal, Table, Text } from "@mantine/core";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ModalHotkeys: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={<Text size="lg">How to navigate Khofly with hotkeys</Text>}
      withCloseButton={false}
      size="lg"
      centered
    >
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Key</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          <Table.Tr>
            <Table.Th>
              <Kbd size="md">h</Kbd>
            </Table.Th>
            <Table.Th>Global</Table.Th>
            <Table.Th>Open help modal</Table.Th>
          </Table.Tr>

          <Table.Tr>
            <Table.Th>
              <Kbd size="md">◄</Kbd>
            </Table.Th>
            <Table.Th>Search</Table.Th>
            <Table.Th>Previous category</Table.Th>
          </Table.Tr>

          <Table.Tr>
            <Table.Th>
              <Kbd size="md">►</Kbd>
            </Table.Th>
            <Table.Th>Search</Table.Th>
            <Table.Th>Next category</Table.Th>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Modal>
  );
};

export default ModalHotkeys;
