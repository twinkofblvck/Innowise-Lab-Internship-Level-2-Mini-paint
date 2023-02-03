import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "@/types";

const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypeSelector;
