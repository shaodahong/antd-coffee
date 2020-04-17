export default function showPlaceHolder(value: any, placeholder: string) {
  if (value === null || value === undefined || value === '') {
    return placeholder
  }
  return value
}
