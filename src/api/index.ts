import axios from 'axios'

const APIService = axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export const Cats = () => {
  return APIService.get('/breeds')
}

export const CatByBreed = (breed) => {
  return APIService.get(`/breeds/${breed}`)
}

export const CatImages = (breed, limit = 0) => {
  return APIService.get(`/images/search?limit=${limit}&breed_ids=${breed}`)
}

// export const Todos = () => {
//   return APIService.get(`/todos`)
// }

// export const AddTodo = (data) => {
//   return APIService.post(`/todos`, data)
// }
