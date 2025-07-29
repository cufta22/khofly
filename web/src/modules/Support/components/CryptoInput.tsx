import useToast from "@hooks/use-toast";
import { ActionIcon, CopyButton, TextInput } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconCheck, IconCopy, IconCopyCheck } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";
import React from "react";

interface Props {
  icon: React.ReactNode;
  address: string;
  label: string;
}

const CryptoInput: React.FC<Props> = ({ icon, address, label }) => {
  const { toast } = useToast();
  const clipboard = useClipboard({ timeout: 2000 });

  const handleCopy = () => {
    if (clipboard.copied) return;

    clipboard.copy(address);

    toast.show({ message: "Address copied!", color: "green" });
  };

  return (
    <TextInput
      size="md"
      mb="md"
      label={label}
      defaultValue={address}
      leftSection={icon}
      rightSection={
        <ActionIcon color={clipboard.copied ? "teal" : "blue"} variant="light" onClick={handleCopy}>
          {clipboard.copied ? (
            <IconCheck style={getIconStyle(18)} />
          ) : (
            <IconCopy style={getIconStyle(18)} />
          )}
        </ActionIcon>
      }
      readOnly
    />
  );
};

export default CryptoInput;
