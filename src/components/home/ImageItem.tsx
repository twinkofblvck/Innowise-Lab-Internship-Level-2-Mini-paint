import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { FC, memo, useCallback } from "react";
import { BsTrash } from "react-icons/bs";
import { useTypeDispatch, useTypeSelector } from "@/hooks/redux";
import { server } from "@/server";
import { authSelector } from "@/store/selectors";
import { removeImageAction } from "@/store/slices/images/actions";
import { IImageItemProps } from "@/components/home";

const ImageItem: FC<IImageItemProps> = memo(({ image }) => {
  const { userData } = useTypeSelector(authSelector);

  const dispatch = useTypeDispatch();

  const remove = useCallback(() => {
    dispatch(removeImageAction({ id: image.id, auth: server.auth.ref }));
  }, [image, dispatch]);

  const isMine = userData?.email === image.author;

  return (
    <Flex
      pos="relative"
      p={4}
      borderWidth={1}
      direction="column"
      gap={2}
      boxShadow={isMine ? "0 0 10px 0 orange" : "unset"}
    >
      <Heading>{image.name}</Heading>
      <Text>{image.author}</Text>
      <Image border="1px solid ButtonHighlight" src={image.url} />
      {isMine && (
        <Button colorScheme="red" pos="absolute" right="15px" top="25px" onClick={remove}>
          <BsTrash />
        </Button>
      )}
    </Flex>
  );
});

export default ImageItem;
