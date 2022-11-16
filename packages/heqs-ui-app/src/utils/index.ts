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
