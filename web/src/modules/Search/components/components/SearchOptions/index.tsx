import { Collapse, Flex, Select } from '@mantine/core';
import type { IDateRange, ISearchLang} from '@store/search';
import { useSearchStore } from '@store/search';
import React from 'react';

interface Props {
  className?: string;
}

const SearchOptions: React.FC<Props> = ({ className }) => {
  const isSearchOptionsOpen = useSearchStore((state) => state.isSearchOptionsOpen);

  const safeSearch = useSearchStore((state) => state.safeSearch);
  const setSafeSearch = useSearchStore((state) => state.setSafeSearch);

  const searchLanguage = useSearchStore((state) => state.searchLanguage);
  const setSearchLanguage = useSearchStore((state) => state.setSearchLanguage);

  const dateRange = useSearchStore((state) => state.dateRange);
  const setDateRange = useSearchStore((state) => state.setDateRange);

  return (
    <Collapse className={className ?? className} in={isSearchOptionsOpen}>
      <Flex pt='xs' align='center' gap='xs'>
        <Select
          size='xs'
          label='Search language'
          value={searchLanguage}
          onChange={(val) => setSearchLanguage(val as ISearchLang)}
          data={[
            { label: 'All languages', value: 'all' },
            { label: 'Auto-detect', value: 'auto' },
            { label: '🌐 Afrikaans', value: 'af' },
            { label: '🌐 Català', value: 'ca' },
            { label: '🇪🇸 Català - Espanya', value: 'ca_ES' },
            { label: '🌐 Dansk', value: 'da' },
            { label: '🇩🇰 Dansk - Danmark', value: 'da_DK' },
            { label: '🌐 Deutsch', value: 'de' },
            { label: '🇦🇹 Deutsch - Österreich', value: 'de_AT' },
            { label: '🇨🇭 Deutsch - Schweiz', value: 'de_CH' },
            { label: '🇩🇪 Deutsch - Deutschland', value: 'de_DE' },
            { label: '🌐 Eesti', value: 'et' },
            { label: '🇪🇪 Eesti - Eesti', value: 'et_EE' },
            { label: '🌐 English', value: 'en' },
            { label: '🇦🇺 English - Australia', value: 'en_AU' },
            { label: '🇨🇦 English - Canada', value: 'en_CA' },
            { label: '🇬🇧 English - United Kingdom', value: 'en_GB' },
            { label: '🇮🇪 English - Ireland', value: 'en_IE' },
            { label: '🇮🇳 English - India', value: 'en_IN' },
            { label: '🇲🇾 English - Malaysia', value: 'en_MY' },
            { label: '🇳🇿 English - New Zealand', value: 'en_NZ' },
            { label: '🇵🇭 English - Philippines', value: 'en_PH' },
            { label: '🇺🇸 English - United States', value: 'en_US' },
            { label: '🇿🇦 English - South Africa', value: 'en_ZA' },
            { label: '🌐 Español', value: 'es' },
            { label: '🇦🇷 Español - Argentina', value: 'es_AR' },
            { label: '🇨🇱 Español - Chile', value: 'es_CL' },
            { label: '🇪🇸 Español - España', value: 'es_EL' },
            { label: '🇲🇽 Español - México', value: 'es_MX' },
            { label: '🇺🇸 Español - Estados Unidos', value: 'es_US' },
            { label: '🌐 Français', value: 'fr' },
            { label: '🇧🇪 Français - Belgique', value: 'fr_BE' },
            { label: '🇨🇦 Français - Canada', value: 'fr_CA' },
            { label: '🇨🇭 Français - Suisse', value: 'fr_CH' },
            { label: '🇫🇷 Français - France', value: 'fr_FR' },
            { label: '🌐 Hrvatski', value: 'hr' },
            { label: '🌐 Indonesia', value: 'id' },
            { label: '🇮🇩 Indonesia - Indonesia', value: 'id_ID' },
            { label: '🌐 Italiano', value: 'it' },
            { label: '🇨🇭 Italiano - Svizzera', value: 'it_CH' },
            { label: '🇮🇹 Italiano - Italia', value: 'it_IT' },
            { label: '🌐 Latviešu', value: 'lv' },
            { label: '🌐 Lietuvių', value: 'lt' },
            { label: '🌐 Magyar', value: 'hu' },
            { label: '🇭🇺 Magyar - Magyarország', value: 'hu_HU' },
            { label: '🌐 Nederlands', value: 'nl' },
            { label: '🇧🇪 Nederlands - België', value: 'nl_BE' },
            { label: '🇳🇱 Nederlands - Nederland', value: 'nl_NL' },
            { label: '🌐 Norsk Bokmål', value: 'nb' },
            { label: '🇳🇴 Norsk Bokmål - Norge', value: 'nb_NO' },
            { label: '🌐 Polski', value: 'pl' },
            { label: '🇵🇱 Polski - Polska', value: 'pl_PL' },
            { label: '🌐 Português', value: 'pt' },
            { label: '🇧🇷 Português - Brasil', value: 'pt_BR' },
            { label: '🇵🇹 Português - Portugal', value: 'pt_PT' },
            { label: '🌐 Română', value: 'ro' },
            { label: '🇷🇴 Română - România', value: 'ro_RO' },
            { label: '🌐 Slovenčina', value: 'sk' },
            { label: '🌐 Slovenščina', value: 'sl' },
            { label: '🌐 Suomi', value: 'fi' },
            { label: '🇫🇮 Suomi - Suomi', value: 'fi_FI' },
            { label: '🌐 Svenska', value: 'sv' },
            { label: '🇸🇪 Svenska - Sverige', value: 'sv_SE' },
            { label: '🌐 Tiếng Việt', value: 'vi' },
            { label: '🌐 Türkçe', value: 'tr' },
            { label: '🇹🇷 Türkçe - Türkiye', value: 'tr_TR' },
            { label: '🌐 Íslenska', value: 'is' },
            { label: '🌐 Čeština', value: 'cs' },
            { label: '🇨🇿 Čeština - Česko', value: 'cs_CZ' },
            { label: '🌐 Ελληνικά', value: 'el' },
            { label: '🇬🇷 Ελληνικά - Ελλάδα', value: 'el_GR' },
            { label: '🌐 Беларуская', value: 'be' },
            { label: '🌐 Български', value: 'bg' },
            { label: '🇧🇬 Български - България', value: 'bg_BG' },
            { label: '🌐 Русский', value: 'ru' },
            { label: '🇷🇺 Русский - Россия', value: 'ru_RU' },
            { label: '🌐 Српски', value: 'sr' },
            { label: '🌐 Українська', value: 'uk' },
            { label: '🇮🇱 עברית', value: 'he' },
            { label: '🌐 العربية', value: 'ar' },
            {
              label: '🇸🇦 العربية  - المملكة العربية السعودية',
              value: 'ar_SA',
            },
            { label: '🌐 فارسی ', value: 'fa' },
            { label: '🌐 हिन्दी', value: 'hi' },
            { label: '🌐 ไทย', value: 'th' },
            { label: '🇹🇭 ไทย - ไทย', value: 'th_TH' },
            { label: '🌐 中文', value: 'zh' },
            { label: '🇨🇳 中文 - 中国', value: 'zh_CN' },
            { label: '🇭🇰 中文 - 中國香港特別行政區', value: 'zh_HK' },
            { label: '🇹🇼 中文 - 台灣', value: 'zh_TW' },
            { label: '🌐 日本語', value: 'ja' },
            { label: '🇯🇵 日本語 - 日本', value: 'ja_JP' },
            { label: '🌐 한국어', value: 'ko' },
            { label: '🇰🇷 한국어 - 대한민국', value: 'ko_KR' },
          ]}
        />

        <Select
          size='xs'
          label='Safe search'
          value={`${safeSearch}`}
          onChange={(val) => setSafeSearch(parseInt(val || '0') as any)}
          data={[
            { label: 'None', value: '0' },
            { label: 'Moderate', value: '1' },
            { label: 'Strict', value: '2' },
          ]}
        />

        <Select
          size='xs'
          label='Date range'
          value={dateRange}
          onChange={(val) => setDateRange(val as IDateRange)}
          data={[
            { label: 'All time', value: 'all' },
            { label: 'Last day', value: 'day' },
            { label: 'Last week', value: 'week' },
            { label: 'Last month', value: 'month' },
            { label: 'Last year', value: 'year' },
          ]}
        />
      </Flex>
    </Collapse>
  );
};

export default SearchOptions;
