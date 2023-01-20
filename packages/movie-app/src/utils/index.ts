/* eslint-disable @typescript-eslint/ban-types */
export const convertToBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

export const extractNumber = (string: string): number => {
  const numArray = string.split('').map((item) => {
    if (typeof +item === 'number' && !isNaN(+item)) return +item
  })
  return +numArray.join('')
}

/**
 * Helper to produce an array of enum descriptors.
 * @param enumeration Enumeration object.
 * @param separatorRegex Regex that would catch the separator in your enum key.
 */
export function enumToMap<T>(
  enumeration: any,
  separatorRegex = /_/g
): {
  id: number
  description: string
}[] {
  const result: {
    id: number
    description: string
  }[] = (Object.keys(enumeration) as Array<keyof T>)
    .filter((key) => isNaN(Number(key)))
    .filter((key) => typeof enumeration[key] === 'number' || typeof enumeration[key] === 'string')
    .map((key) => ({
      id: enumeration[key],
      description: String(key).replace(separatorRegex, ' ')
    }))
  // @ts-ignore
  return result
}

export function parseJwt(token: string) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}

export const uuid4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
