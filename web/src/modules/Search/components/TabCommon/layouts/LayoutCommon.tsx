import { Divider, Stack } from "@mantine/core";
import { ICategories } from "@store/settings";
import React from "react";
import RowCommon from "../components/RowCommon";
import SkeletonCommon from "../components/SkeletonCommon";
import { ISearXNGResultsShared } from "@ts/searxng.types";
import PrivateMusicPlayer from "../../components/PrivatePlayer/music";

interface Props {
  tab: ICategories;
  data: ISearXNGResultsShared[];
  showSkeleton: boolean;
}

const LayoutCommon: React.FC<Props> = ({ tab, data, showSkeleton }) => {
  return (
    <>
      {data?.map((res, i) => {
        if (!res?.results) return;
        return (
          <Stack gap="lg" key={i}>
            {i !== 0 && <Divider label={`Page ${i + 1}`} labelPosition="left" />}

            {res?.results.map((r, i) => (
              <RowCommon key={i} rowData={r} tab={tab} />
            ))}
          </Stack>
        );
      })}

      {showSkeleton &&
        // Loading state
        Array.from(Array(10).keys()).map((e, i) => <SkeletonCommon key={i} tab={tab} />)}

      {/* Private Video Player */}
      <PrivateMusicPlayer />
    </>
  );
};

export default LayoutCommon;
