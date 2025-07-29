import { Container, Title, useMantineTheme } from "@mantine/core";
import classes from "./styles.module.scss";
import CryptoInput from "./components/CryptoInput";
import {
  IconCurrencyBitcoin,
  IconCurrencyMonero,
  IconCurrencyEthereum,
  IconCurrencyLitecoin,
  IconCurrencySolana,
} from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

const PageSupport = () => {
  const theme = useMantineTheme();

  // Money stuff

  // Crypto stuff
  const btcAddress = process.env.ADDRESS_BITCOIN;
  const bchAddress = process.env.ADDRESS_BITCOIN_CASH;
  const ethAddress = process.env.ADDRESS_ETHEREUM;
  const xmrAddress = process.env.ADDRESS_MONERO;
  const ltcAddress = process.env.ADDRESS_LITECOIN;
  const solAddress = process.env.ADDRESS_SOLANA;

  const hasCrypto =
    btcAddress || bchAddress || ethAddress || xmrAddress || ltcAddress || solAddress;

  return (
    <Container className={classes.support_page} size="lg" pt={40} pb={80}>
      {hasCrypto && <Title mb="md">Crypto</Title>}

      {!!btcAddress && (
        <CryptoInput
          label="Bitcoin"
          icon={
            <IconCurrencyBitcoin
              className={classes.curr_btc}
              color={theme.colors.yellow[6]}
              style={getIconStyle(28)}
            />
          }
          address={btcAddress}
        />
      )}

      {!!bchAddress && (
        <CryptoInput
          label="Bitcoin Cash"
          icon={
            <IconCurrencyBitcoin
              className={classes.curr_bch}
              color={theme.colors.green[6]}
              style={getIconStyle(28)}
            />
          }
          address={bchAddress}
        />
      )}

      {!!ethAddress && (
        <CryptoInput
          label="Ethereum"
          icon={<IconCurrencyEthereum style={getIconStyle(28)} />}
          address={ethAddress}
        />
      )}

      {!!xmrAddress && (
        <CryptoInput
          label="Monero"
          icon={<IconCurrencyMonero color={theme.colors.orange[7]} style={getIconStyle(28)} />}
          address={xmrAddress}
        />
      )}

      {!!ltcAddress && (
        <CryptoInput
          label="Litecoin"
          icon={<IconCurrencyLitecoin style={getIconStyle(28)} />}
          address={ltcAddress}
        />
      )}

      {!!solAddress && (
        <CryptoInput
          label="Solana"
          icon={<IconCurrencySolana color={theme.colors.blue[6]} style={getIconStyle(28)} />}
          address={solAddress}
        />
      )}
    </Container>
  );
};

export default PageSupport;
