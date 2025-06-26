import { Divider, Stack } from "@mantine/core";
import { useSearchStore } from "@store/search";
import { ICategories, useSettingsStore } from "@store/settings";
import { ISearXNGResultsGeneral } from "@ts/searxng.types";
import React from "react";
import RowCommon from "../components/RowCommon";
import GeneralMedia from "../../components/GeneralMedia";
import SkeletonCommon from "../components/SkeletonCommon";

interface Props {
  tab: ICategories;
  data: ISearXNGResultsGeneral[];
  showSkeleton: boolean;
}

const LayoutGeneral: React.FC<Props> = ({ tab, data, showSkeleton }) => {
  const generalMedia = useSettingsStore((state) => state.generalMedia);
  const hydratedSettings = useSettingsStore((state) => state.hydrated);

  const domainsPriority = useSearchStore((state) => state.domainsPriority);
  const domainsBlacklist = useSearchStore((state) => state.domainsBlacklist);

  return (
    <>
      {data?.map((res, i) => {
        if (typeof res === "string") return;

        if (!res?.results) return;

        const organizedResults = [...res.results]
          // Blacklist
          .filter((item) => {
            return !domainsBlacklist.some((domain) => item.parsed_url?.[1]?.includes(domain));
          })
          // Priority
          .sort((a, b) => {
            // Check if URL a is in priority domains
            const aIsPriority = domainsPriority.some((domain) =>
              a.parsed_url?.[1]?.includes(domain)
            );
            // Check if URL b is in priority domains
            const bIsPriority = domainsPriority.some((domain) =>
              b.parsed_url?.[1]?.includes(domain)
            );

            if (aIsPriority && !bIsPriority) {
              return -1; // a comes before b
            } else if (!aIsPriority && bIsPriority) {
              return 1; // b comes before a
            }
            return 0; // Keep original order if both are priority or neither is priority
          });

        return (
          <Stack gap="lg" key={i}>
            {i !== 0 && <Divider label={`Page ${i + 1}`} labelPosition="left" />}

            {generalMedia.enabled && i === 0 && hydratedSettings ? (
              // Display images/videos in between results
              <>
                {organizedResults.slice(0, 2).map((r, i) => (
                  <RowCommon key={i} tab={tab} rowData={r} />
                ))}

                <GeneralMedia />

                {organizedResults.slice(2).map((r, i) => (
                  <RowCommon key={i} tab={tab} rowData={r} />
                ))}
              </>
            ) : (
              // Display just results
              organizedResults.map((r, i) => <RowCommon key={i} tab={tab} rowData={r} />)
            )}
          </Stack>
        );
      })}

      {showSkeleton &&
        // Loading state
        Array.from(Array(10).keys()).map((e, i) => <SkeletonCommon key={i} tab={tab} />)}
    </>
  );
};

export default LayoutGeneral;
