import { useDispatch } from "react-redux";
import { DispatchType } from "@/types";

const useTypeDispatch = () => useDispatch<DispatchType>();

export default useTypeDispatch;
