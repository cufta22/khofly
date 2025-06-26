import { Flex } from "@mantine/core";
import { ICategories } from "@store/settings";
import { ISearXNGResultsImages } from "@ts/searxng.types";
import classes from "./styles.module.scss";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import CellImage from "../components/CellImage";
import SkeletonImage from "../components/SkeletonImage";
import ImageView from "../../components/ImageView";
import { useSearchParams } from "react-router";

interface Props {
  tab: ICategories;
  data: ISearXNGResultsImages[];
  showSkeleton: boolean;
}

const LayoutImages: React.FC<Props> = ({ tab, data, showSkeleton }) => {
  const [searchParams] = useSearchParams();

  const [isOpenImageView, { open: openImageView, close: closeImageView }] = useDisclosure(false);
  const [viewImage, setViewImage] = useState<ISearXNGResultsImages["results"][0] | null>(null);

  const openImageInView = (img: ISearXNGResultsImages["results"][0]) => {
    setViewImage(img);
    openImageView();
  };

  const paramsMediaSrc = searchParams.get("media_src");
  useEffect(() => {
    if (!data.length) return;

    const foundImg = data?.[0].results.find((res) => res.img_src === paramsMediaSrc);

    // Open image initially if media_src param exists
    if (foundImg && paramsMediaSrc) {
      openImageInView(foundImg);
    }
  }, [paramsMediaSrc, data]);

  return (
    <Flex className={classes.image_gallery} wrap="wrap" p="lg" gap="md" justify="center">
      {data?.map((res) => {
        if (!res) return;
        return res?.results.map((img, i) => (
          <CellImage key={i} rowData={img} openImageInView={openImageInView} />
        ));
      })}

      {showSkeleton &&
        // Loading state
        Array.from(Array(30).keys()).map((e, i) => <SkeletonImage key={i} />)}

      {/* Image preview */}
      {<ImageView isOpen={isOpenImageView} handleClose={closeImageView} viewImage={viewImage} />}
    </Flex>
  );
};

export default LayoutImages;
