import { Flex } from "@chakra-ui/react";
import { ChangeEvent, memo, useCallback, useEffect, useState } from "react";
import useTypeDispatch from "../hooks/redux/useTypeDispatch";
import getImagesAction from "../store/slices/images/actions/get";
import ImageList from "../components/home/ImageList";
import { IListImage } from "../types/images";
import ImageFilter from "../components/home/ImageFilter";

const HomePage = memo(() =>
{
  const [query, setQuery] = useState("");
  const [criteria, setCriteria] = useState<keyof IListImage>("name");

  const d = useTypeDispatch();

  const onQueryChange = useCallback((e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value), []);

  useEffect(() =>
  {
    d(getImagesAction());
  }, [d]);

  return (
    <Flex direction="column" gap={5}>
      <ImageFilter criteria={criteria} setCriteria={setCriteria} onChange={onQueryChange} value={query} />
      <ImageList query={query} criteria={criteria} />
    </Flex>
  );
});

export default HomePage;