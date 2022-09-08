
export const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  var objString = s.trim();
  return objString.charAt(0).toUpperCase() + objString.slice(1)
}