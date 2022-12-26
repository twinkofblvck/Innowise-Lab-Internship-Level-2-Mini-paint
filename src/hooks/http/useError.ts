import { useToast } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import useTypeSelector from "../redux/useTypeSelector";

export default function useError()
{
  const { error } = useTypeSelector(state => state.generic);

  const toast = useToast();

  const errNotify = useCallback((message: string) =>
  {
    return toast(
      {
        status: "error",
        title: "ERROR",
        description: message,
        duration: 2000,
        isClosable: true,
        variant: "subtle",
        position: "bottom"
      }
    );
  }, [toast]);

  useEffect(() =>
  {
    if(error) errNotify(error);
  }, [error, errNotify]);
}