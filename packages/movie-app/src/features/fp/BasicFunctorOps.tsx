import React from 'react'

const EMPTY_OBJ: any = {}

// Функтор - то что может быть пройдено/замаплено/итерируемо
const animals = [
  { name: 'Tibbers', type: 'cat', isNeutered: true, age: 2 },
  { name: 'Fluffball', type: 'rabbit', isNeutered: false, age: 1 },
  { name: 'Strawhat', type: 'cat', isNeutered: true, age: 5 }
]

// ----- MAP -----
// what you need:
// ['Tibbers', 'Fluffball', 'Strawhat']
const animalNames = animals.map((animal) => {
  return animal.name
})
// what you need:
// [{name: 'Tibbers', species: 'cat'}, {name: 'Fluffball', species: 'rabbit'}, {name: 'Strawhat', species: 'cat'}]
const petDetails = animals.map((animal) => {
  return {
    name: animal.name,
    species: animal.type
  }
})

// ----- REDUCE -----
// How old are all the animals combined?
// 0 is the starting value and acts as the first acculmulator value
// will return 8
const totalAge = animals.reduce((acculmulator, animal) => {
  return acculmulator + animal.age
}, 0)
// lets say you want to find out the oldest animal
// code below will return {name: 'Strawhat', type: 'cat', isNeutered: true, age: 5}
const oldestPet = animals.reduce((oldest, animal) => {
  return (oldest.age || 0) > animal.age ? oldest : animal
}, EMPTY_OBJ)
// decrypting the code above and how terniaries work
// the condition --> (oldest.age || 0) > animal.age
// if true --> ? oldest
// else --> : animal

// ----- FILTER -----
/*using functional filter() where a represents an item in the array*/
const neuteredAnimals = animals.filter((a) => {
  return a.isNeutered === true
})

// ----- FIND -----
const animalTypeFound = animals.find((animal) => animal.type === 'cat')
// animalTypeFound will return:
// {name: 'Tibbers', type: 'cat', isNeutered: true, age: 2}
const animalTypeFilter = animals.filter((animal) => animal.type === 'cat')
// animalTypeFilter will return:
// [{name: 'Tibbers', type: 'cat', isNeutered: true, age: 2}, {name: 'Strawhat', type: 'cat', isNeutered: true, age: 5}]

// ----- EVERY -----
const allNeutered = animals.every((animal) => {
  return animal.isNeutered
})

// ----- SOME -----
const someAreCats = animals.some((animal) => {
  return animal.type === 'cat'
})

// ----- MIX -----
const totalScore = animals
  .filter((animal) => {
    return animal.isNeutered
  })
  .reduce((accumulator, animal) => {
    // @ts-ignore
    // добавляем новый ключ к объекту
    return accumulator + animal.cutenessScore
  }, 0)

export const FPPage = () => {
  return <div>FPPage</div>
}
