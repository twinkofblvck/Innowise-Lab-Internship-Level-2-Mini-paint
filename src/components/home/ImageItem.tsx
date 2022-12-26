import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { FC, memo, useCallback } from "react";
import { BsTrash } from "react-icons/bs";
import useTypeDispatch from "../../hooks/redux/useTypeDispatch";
import useTypeSelector from "../../hooks/redux/useTypeSelector";
import server from "../../server";
import authSelector from "../../store/selectors/auth";
import removeImageAction from "../../store/slices/images/actions/remove";
import { IListImage } from "../../types/images";

interface IImageItemProps
{
  image: IListImage;
}

const ImageItem: FC<IImageItemProps> = memo(({ image }) =>
{
  const { userData } = useTypeSelector(authSelector);

  const d = useTypeDispatch();

  const remove = useCallback(() =>
  {
    d(removeImageAction({ id: image.id, auth: server.auth.ref }));
  }, [image, d]);

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
      {isMine &&
        <Button
          colorScheme="red"
          pos="absolute"
          right="15px"
          top="25px"
          onClick={remove}
        >
          <BsTrash />
        </Button>}
    </Flex>
  );
});

export default ImageItem;