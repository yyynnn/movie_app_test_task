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
