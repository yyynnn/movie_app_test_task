import axios from 'axios'

// функции высшего порядка HOF - функции, которые принимают другие функции
// и возвращают другие функции
export const downloadPhoto = (image: string, callback: any) => {
  console.log('Загрузка начата')
  setTimeout(() => {
    if (image) {
      callback(null, image)
    } else {
      callback(new Error('Ошибка загрузки!'))
    }
  }, 1000)
}

export const someOtherCallback = (callback: any) => {
  console.log('Загрузка начата')
  callback()
}

downloadPhoto('http://coolcats.com/cat.gif', handlePhotoCallback)

function handlePhotoCallback(error: any, photo: string) {
  if (error) {
    console.error('Ошибка загрузки!', error)
    someOtherCallback(() => {
      // more callbacks :) .....
    })
  } else {
    console.log('Загрузка завершена', photo)
  }
}

console.log('Загрузка начата')

// ---------------------------------------------------------------------//
// AXIOS - библиотека для работы с HTTP запросами
// промисы и асинк авейты

// Запросы через промисы
// красивая функциональная записть через точки
const getUserPromise = axios
  .get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    // if no error
    console.log(response)
  })
  .catch(function (error) {
    // handle error
    console.log(error)
  })
  .finally(function () {
    // always executed
  })

// Запросы через async await
// императивная запись
async function getUserAwait() {
  try {
    const response = await axios.get('/user?ID=12345')
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

// разница только в синтаксисе
