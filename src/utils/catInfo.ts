function generateRandomTime() {
  const hours = Math.floor(Math.random() * 24)
  const minutes = Math.floor(Math.random() * 60)
  const seconds = Math.floor(Math.random() * 60)

  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = seconds.toString().padStart(2, '0')

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}

const catStatuses = [
  'Sleeping',
  'Eating',
  'Playing',
  'Exploring',
  'Lounging',
  'Cuddling',
  'By the Window',
  'Seeking Adventure',
  "At the Vet's",
  'Mouse Hunt'
]

export function generateRandomStatus() {
  const randomIndex = Math.floor(Math.random() * catStatuses.length)
  return catStatuses[randomIndex]
}

export function generateRandomStatusNotification() {
  const randomStatusCode = catStatuses[Math.floor(Math.random() * catStatuses.length)]
  const formattedTime = generateRandomTime()
  const notification = {
    id: Math.floor(Math.random() * 100),
    status: randomStatusCode,
    time: formattedTime
  }
  return notification
}

export function generateRandomArrayOfBirdsCount() {
  const randomNumbers = []

  for (let i = 0; i < 7; i++) {
    const randomNumber = Math.floor(Math.random() * 21)
    randomNumbers.push(randomNumber)
  }

  return randomNumbers
}

export function generateRandomArrayOfActivityTime() {
  const randomNumbers = []

  for (let i = 0; i < 24; i++) {
    const randomNumber = Math.floor(Math.random() * 61)
    randomNumbers.push(randomNumber)
  }

  return randomNumbers
}
