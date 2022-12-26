import { RootState } from "../../types/redux";

const authSelector = (state: RootState) => state.auth;

export default authSelector;