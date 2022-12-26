import { useDispatch } from "react-redux";
import { DispatchType } from "../../types/redux";

const useTypeDispatch = () => useDispatch<DispatchType>();

export default useTypeDispatch;