import { Transition } from '@mantine/core';
import React from 'react';

interface Props {
  iframeOpen: boolean;
  iframe_src: string;
  title: string;
}

const MusicIframe: React.FC<Props> = ({ iframeOpen, iframe_src, title }) => {
  return (
    <Transition
      mounted={iframeOpen}
      transition={'scale-y'}
      duration={200}
      timingFunction='ease'
      keepMounted={false}
    >
      {(transitionStyle) => (
        <iframe
          style={{ ...transitionStyle, zIndex: 1 }}
          width='100%'
          src={iframe_src}
          title={title}
          sandbox='' // TODO: Add something
        />
      )}
    </Transition>
  );
};

export default MusicIframe;
