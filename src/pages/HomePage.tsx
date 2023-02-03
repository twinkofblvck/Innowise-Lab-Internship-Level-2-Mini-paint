import { Flex } from "@chakra-ui/react";
import { ChangeEvent, memo, useCallback, useEffect, useState } from "react";
import { useTypeDispatch } from "@/hooks/redux";
import { getImagesAction } from "@/store/slices/images/actions";
import { ImageList, ImageFilter } from "@/components/home";
import { IListImage } from "@/types";

const HomePage = memo(() => {
  const [query, setQuery] = useState("");
  const [criteria, setCriteria] = useState<keyof IListImage>("name");

  const dispatch = useTypeDispatch();

  const onQueryChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value), []);

  useEffect(() => {
    dispatch(getImagesAction());
  }, [dispatch]);

  return (
    <Flex direction="column" gap={5}>
      <ImageFilter criteria={criteria} setCriteria={setCriteria} onChange={onQueryChange} value={query} />
      <ImageList query={query} criteria={criteria} />
    </Flex>
  );
});

export default HomePage;
