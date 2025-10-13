import { Button, Dialog, Flex, Group, Modal, Paper, Stack, Text, TextInput } from "@mantine/core";
import SettingsTitle from "../../common/SettingsTitle";
import classes from "../../../styles.module.scss";
import useForm from "@hooks/use-form";
import { useDisclosure } from "@mantine/hooks";
import useNominatimSWR from "src/api/nominatim/use-nominatim-query";
import { useEffect, useState } from "react";
import useToast from "@hooks/use-toast";
import { useGeneralStore } from "@store/general";

const SettingsGeolocation = () => {
  // Nomitanim stuff for geolocation
  const [openNominatim, { toggle: toggleNominatim, close: closeNominatim }] = useDisclosure(false);
  const { trigger, isMutating } = useNominatimSWR();
  const [nominatimVal, setNominatimVal] = useState("");

  const { toast } = useToast();

  const geolocation = useGeneralStore((state) => state.geolocation);
  const setGeolocation = useGeneralStore((state) => state.setGeolocation);

  const form = useForm({
    initialValues: {
      lat: "",
      lon: "",
    },
    validate: {
      lat: (value) => (/^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$/.test(value) ? null : "Invalid value"),
      lon: (value) => (/^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$/.test(value) ? null : "Invalid value"),
    },
  });

  const handleSubmitNominatim = async () => {
    const data = await trigger(nominatimVal);

    if (!data.length) {
      toast.show({ title: "Nominatim error", message: "Location not found", color: "yellow" });
      return;
    }

    form.setFieldValue("lat", data[0].lat);
    form.setFieldValue("lon", data[0].lon);

    setGeolocation({ lat: data[0].lat, lon: data[0].lon });

    toast.show({ message: "Location updated", color: "green" });

    closeNominatim();
  };

  const handleSubmit = (values: typeof form.values) => {
    setGeolocation({ lat: values.lat, lon: values.lon });
    toast.show({ message: "Location updated", color: "green" });
  };

  useEffect(() => {
    if (!geolocation?.lat || !geolocation?.lon) return;

    form.setFieldValue("lat", geolocation.lat);
    form.setFieldValue("lon", geolocation.lon);
  }, [geolocation]);

  return (
    <>
      <Paper radius="md" withBorder>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <SettingsTitle
            // icon={<IconSettings2 color={theme.colors.blue["5"]} />}
            title="pages.settings.geolocation.title"
          />

          {/* Settings content */}
          <Stack w="100%" align="start" px="lg" mb="xl">
            <Flex align="flex-end" gap="md">
              <TextInput label="Latitude" placeholder="00.0000000" {...form.getInputProps("lat")} />

              <TextInput
                label="Longitude"
                placeholder="00.0000000"
                {...form.getInputProps("lon")}
              />

              {!form.values.lat && !form.values.lon && (
                <Button onClick={toggleNominatim}>Use Nominatim</Button>
              )}
            </Flex>

            <Text size="sm" c="dimmed">
              If you don't want to use your browsers default Geolocation API ( probably uses Google
              ), you can manually input your lat & lon or use Nominatim to find it for you.
            </Text>
          </Stack>

          <Flex
            align="center"
            justify="space-between"
            py="sm"
            px="lg"
            className={classes.settings_footer}
          >
            <Text size="sm" c="dimmed">
              This will get cached in local storage so you only need to set this up once.
            </Text>

            <Button type="submit">Save</Button>
          </Flex>
        </form>
      </Paper>

      {/* Nomitanim modal */}
      <Modal
        title="Nominatim API"
        opened={openNominatim}
        withCloseButton
        onClose={toggleNominatim}
        size="lg"
        radius="md"
        centered
      >
        <Group align="flex-end">
          <TextInput
            label="Your location"
            placeholder="City, Country"
            className="flex_1"
            value={nominatimVal}
            onChange={(e) => setNominatimVal(e.currentTarget.value)}
          />
          <Button onClick={handleSubmitNominatim} loading={isMutating} disabled={isMutating}>
            Search
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default SettingsGeolocation;
