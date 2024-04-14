import { ActionIcon, Affix, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons-react";
import { getIconStyle } from "@utils/functions/iconStyle";

const ScrollToTop = () => {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" mounted={scroll.y > 10}>
        {(transitionStyles) => (
          <ActionIcon
            size="xl"
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
          >
            <IconArrowUp style={getIconStyle(26)} />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
};

export default ScrollToTop;
