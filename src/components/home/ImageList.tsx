import { Flex, Heading } from "@chakra-ui/react";
import { FC, memo, useMemo } from "react";
import { useTypeSelector } from "@/hooks/redux";
import { imagesSelector } from "@/store/selectors";
import { IImageListProps, ImageItem } from "@/components/home";

const ImageList: FC<IImageListProps> = memo(({ query, criteria }) => {
  const { images } = useTypeSelector(imagesSelector);

  const filteredImages = useMemo(
    () => images.filter((image) => image[criteria].toLowerCase().includes(query.toLowerCase())),
    [query, images, criteria]
  );

  return (
    <Flex direction="column" gap={4} w="max(50vw, 300px)" m="auto" mb={20}>
      {filteredImages.length ? (
        filteredImages.map((image) => <ImageItem key={image.id} image={image} />)
      ) : (
        <Heading size="md" textAlign="center">
          No images found
        </Heading>
      )}
    </Flex>
  );
});

export default ImageList;
