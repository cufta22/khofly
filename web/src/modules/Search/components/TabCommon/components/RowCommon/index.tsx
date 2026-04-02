import { Flex, Image, Space, Spoiler, Text, useMantineTheme } from '@mantine/core';
import classes from './styles.module.scss';
import type { ISearXNGResultsShared } from '@ts/searxng.types';
import clsx from 'clsx';
import type { ICategories} from '@store/settings';
import { useSettingsStore } from '@store/settings';
import { useSearchStore } from '@store/search';
import SearchAnchor from '@module/Search/components/components/SearchAnchor';
import { IconLabelImportant } from '@tabler/icons-react';
import { getIconStyle } from '@utils/functions/iconStyle';
import { removeSubdomain } from '@module/Search/components/components/Organize/components/utils';
import { useFaviconAPI } from 'src/api/favicon';
import ResultMenu from './ResultMenu';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import MusicIframe from './ExtrasMusic/MusicIframe';
import MusicIframeData from './ExtrasMusic/MusicIframeData';
import NewsPubDate from './ExtrasNews/NewsPubDate';
import MusicImage from './ExtrasMusic/MusicImage';
import ITDetails from './ExtrasIT/ITDetails';
import ScienceDetails from './ExtrasScience/ScienceDetails';
import FilesImage from './ExtrasFiles/FilesImage';
import FilesDetails from './ExtrasFiles/FilesDetails';

dayjs.extend(relativeTime);

interface Props {
  tab: ICategories;
  rowData: ISearXNGResultsShared['results'][0];
}

const RowCommon: React.FC<Props> = ({ tab, rowData }) => {
  const {
    // Common stuff
    title,
    url,
    parsed_url,
    content,
    engines,

    // News, Music, IT
    publishedDate,

    // Music
    img_src,
    thumbnail,
    iframe_src,

    // IT
    homepage,
    license_name,
    license_url,
    maintainer,
    package_name,
    popularity,
    source_code_url,
    tags,
    version,

    // Science
    authors,
    pdf_url,
    doi,
    publisher,
    journal,
    type,
    isbn,
    issn,

    // Files
    magnetlink,
    seed,
    leech,
    filesize,
  } = rowData;

  const { displayFavicon, getFaviconUrl } = useFaviconAPI();

  const [iframeOpen, setIframeOpen] = useState(false);

  const theme = useMantineTheme();

  const visitedLinks = useSearchStore((state) => state.visitedLinks);
  const domainsPriority = useSearchStore((state) => state.domainsPriority);

  const privatePlayer = useSettingsStore((state) => state.privatePlayer);
  const setPrivatePlayer = useSettingsStore((state) => state.setPrivatePlayer);
  const showEngines = useSettingsStore((state) => state.showEngines);

  const isPriority = domainsPriority.find((item) => item === removeSubdomain(parsed_url?.[1]));

  // Additional on click for music/videos private player
  const additionalOnClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (tab === 'music' && privatePlayer.enabled && iframe_src && url.includes('youtube.com')) {
      e.preventDefault();
      setPrivatePlayer({
        musicData: {
          img_src: img_src || '',
          thumbnail: thumbnail || '',
          title,
          url,
        },
      });
    }
  };

  return (
    <Flex
      className={clsx(classes.row_common, {
        [classes.music_row_playing]: iframeOpen,
      })}
      direction='column'
    >
      {/* ------------------------------------------ */}
      {/* TOP SIDE - website url */}
      {/* ------------------------------------------ */}
      <Flex align='center' gap='xs'>
        <SearchAnchor url={url} additionalOnClick={additionalOnClick}>
          {/* Website url */}
          <Flex align='center' gap='xs' style={{ minWidth: 0 }}>
            {displayFavicon && (
              <Image
                w={16}
                h={16}
                src={getFaviconUrl(parsed_url[1])}
                fallbackSrc='/assets/placeholder.svg'
                alt=''
              />
            )}
            <Text size='xs' truncate='end'>
              {parsed_url[0]}://{parsed_url[1]}
              {parsed_url[2]}
            </Text>
          </Flex>
        </SearchAnchor>

        <div style={{ flex: 1 }} />

        {tab === 'general' && isPriority && (
          <IconLabelImportant style={getIconStyle(24)} color={theme.colors.green['6']} />
        )}

        {['general', 'news', 'science', 'social_media'].includes(tab) && (
          <ResultMenu url={url} domain={parsed_url[1]} tab={tab} />
        )}
      </Flex>

      {/* ------------------------------------------ */}
      {/* CENTER - Title, content, other data */}
      {/* ------------------------------------------ */}
      <Flex mt={['music', 'files'].includes(tab) ? 'sm' : 0} gap='md'>
        {/* Music/File img */}
        {tab === 'music' && (
          <SearchAnchor url={url} additionalOnClick={additionalOnClick} updateVisited={false}>
            <MusicImage className={classes.row_img} img_src={img_src} thumbnail={thumbnail} />
          </SearchAnchor>
        )}
        {tab === 'files' && (
          <SearchAnchor url={url} additionalOnClick={additionalOnClick} updateVisited={false}>
            <FilesImage className={classes.row_img} img_src={img_src} thumbnail={thumbnail} />
          </SearchAnchor>
        )}

        {/* Content */}
        <Flex className={classes.row_data} direction='column'>
          {/* Website title */}
          <SearchAnchor url={url} additionalOnClick={additionalOnClick}>
            <Text
              className={clsx(
                classes.text_title,
                {
                  [classes.text_title_visited]: visitedLinks.includes(url),
                },
                {
                  [classes.title_music]: tab === 'music',
                },
              )}
              mb={4}
              truncate='end'
            >
              {title}
            </Text>
          </SearchAnchor>

          {/* News - Published Date */}
          {tab === 'news' && publishedDate && <NewsPubDate publishedDate={publishedDate} />}

          {/* Website description */}
          {tab !== 'science' && (
            <Text size='sm' c='dimmed'>
              {content}
            </Text>
          )}
          {tab === 'science' && (
            <Spoiler maxHeight={80} showLabel='Show more' hideLabel='Hide'>
              <Text size='sm' c='dimmed'>
                {content}
              </Text>
            </Spoiler>
          )}

          {/* Files - details */}
          {tab === 'files' && (
            <FilesDetails
              filesize={filesize}
              leech={leech}
              magnetlink={magnetlink}
              publishedDate={publishedDate}
              seed={seed}
            />
          )}

          {/* Science - details table */}
          {tab === 'science' && (
            <ScienceDetails
              authors={authors}
              doi={doi}
              isbn={isbn}
              issn={issn}
              journal={journal}
              pdf_url={pdf_url}
              publishedDate={publishedDate}
              publisher={publisher}
              tags={tags}
              type={type}
            />
          )}

          {/* IT - details table */}
          {tab === 'it' && (
            <ITDetails
              homepage={homepage}
              license_name={license_name}
              license_url={license_url}
              maintainer={maintainer}
              package_name={package_name}
              popularity={popularity}
              publishedDate={publishedDate}
              source_code_url={source_code_url}
              tags={tags}
              version={version}
            />
          )}

          {/* Music - data + iframe button */}
          {tab === 'music' && (
            <MusicIframeData
              iframeOpen={iframeOpen}
              publishedDate={publishedDate}
              setIframeOpen={setIframeOpen}
            />
          )}
        </Flex>
      </Flex>

      {showEngines ? (
        <Text size='xs' c='dimmed' mt='xs' ta='right'>
          {showEngines ? engines.join(', ') : ''}
        </Text>
      ) : (
        <Space h={26.8} />
      )}

      {/* Music - Iframe */}
      {tab === 'music' && iframe_src && (
        <MusicIframe iframeOpen={iframeOpen} iframe_src={iframe_src} title={title} />
      )}
    </Flex>
  );
};

export default RowCommon;
