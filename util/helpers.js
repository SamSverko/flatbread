export function verifyObjectId(objectId) {
  const objectIdRegex = /^[a-fA-F0-9]{24}$/
  return objectIdRegex.test(objectId)
}
