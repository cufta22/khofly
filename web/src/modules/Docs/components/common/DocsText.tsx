import { Text } from '@mantine/core';
import type { IFC } from '@ts/global.types';
import React from 'react';

const DocsText: React.FC<IFC> = ({ children }) => {
  return <Text mt='md'>{children}</Text>;
};

export default DocsText;
