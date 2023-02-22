export default function getErrorMessage(e: unknown) {
  return e instanceof Error ? e.message : "" + e;
}
