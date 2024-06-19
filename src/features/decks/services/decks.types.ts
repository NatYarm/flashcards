export type DecksListResponse = {
  items: Deck[]
  pagination: Pagination
}

export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type Author = {
  id: string
  name: string
}

export type Deck = {
  author: Author
  cardsCount: number
  cover?: any
  created: string
  id: string
  isFavorite: boolean
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export type GetDecksArgs = {
  minCardsCount?: number
  maxCardsCount?: number
  name?: string
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  orderBy?: string
}

export type MinMaxCards = {
  min: number
  max: number
}

export type ErrorMessages = {
  field: string
  message: string
}

export type ErrorData = {
  errorMessages: ErrorMessages[]
}
export type ErrorResponse = {
  data: ErrorData
  status: number
}
