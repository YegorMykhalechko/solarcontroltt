export interface IUser {
  email: string
  password: string
}

export interface IUserRegister extends IUser {
  confirmPassword: string
}

export interface ICat {
  id?: string
  name: string
  breed: string
  color: string
  petName?: string
  url?: string
  description?: string
  hairless?: string
  images?: unknown[]
}

export interface INotification {
  id: number
  status: string
  time: string
}

export interface INotificationBell {
  label: string
  command: () => void
}

type Dataset = {
  label: string
  data: number[]
  backgroundColor: string
  borderColor: string
  borderWidth: number
}

export interface IGraphOption {
  labels: string[]
  datasets: Dataset[]
}
