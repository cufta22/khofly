import { IAWrapper } from '../../wrapper';
import { ActionIcon, Flex, NumberInput, Select, Text } from '@mantine/core';
import { useState } from 'react';
import { IconReload } from '@tabler/icons-react';
import { generateLoremIpsumParagraph } from './utils';

const IALoremIpsum = () => {
  const [pCount, setPCount] = useState(1);
  const [startWithLorem, setStartWithLorem] = useState(true);

  const [loremIpsum, setLoremIpsum] = useState<string[]>([]);

  const handleGenerate = (count: number, start: boolean) => {
    const loremArray: string[] = [];

    const filledArray = Array.from({ length: count }, () => 'lorem_ipsum');

    filledArray.forEach((_a, i) => {
      const lorem = generateLoremIpsumParagraph(4, 6, start && i === 0);
      loremArray.push(lorem);
    });

    setLoremIpsum(loremArray);
  };

  return (
    <IAWrapper
      label={
        <Text size='sm' c='dimmed'>
          Lorem Ipsum generator
        </Text>
      }
    >
      <Flex direction='column' gap='md'>
        <Flex align='flex-end' mb='md' gap='md'>
          <NumberInput
            size='xs'
            label='No. of paragraphs'
            value={pCount}
            onChange={(e) => {
              const newVal = typeof e === 'number' ? e : parseInt(e, 10);

              setPCount(newVal);
              handleGenerate(newVal, startWithLorem);
            }}
            min={1}
            max={4}
          />

          <Select
            size='xs'
            label="Start with 'Lorem ...'"
            value={startWithLorem ? 'Yes' : 'No'}
            onChange={(val) => {
              const newVal = val === 'Yes';

              setStartWithLorem(newVal);
              handleGenerate(pCount, newVal);
            }}
            allowDeselect={false}
            data={[
              {
                label: 'Yes',
                value: 'Yes',
              },
              {
                label: 'No',
                value: 'No',
              },
            ]}
          />

          <ActionIcon
            size='lg'
            variant='subtle'
            onClick={() => handleGenerate(pCount, startWithLorem)}
          >
            <IconReload />
          </ActionIcon>
        </Flex>

        {loremIpsum.map((val, i) => (
          <Text size='md' key={i}>
            {val}
          </Text>
        ))}

        {/* <ActionIcon size="lg" variant="subtle" onClick={updatePassword}>
          <IconReload />
        </ActionIcon> */}
      </Flex>
    </IAWrapper>
  );
};

export default IALoremIpsum;
