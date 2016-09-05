export default function (key) {
  return key.replace(/\.[0-9]+\./g, '.$.')
}
