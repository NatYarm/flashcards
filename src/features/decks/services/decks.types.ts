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
  cover?: null | string
  created: string
  id: string
  isFavorite: boolean
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export type GetDecksArgs = {
  authorId?: string
  currentPage?: number
  itemsPerPage?: number
  maxCardsCount?: number
  minCardsCount?: number
  name?: string
  orderBy?: null | string
}

export type GetDeckCards = {
  answer?: string
  currentPage?: number
  id: string
  itemsPerPage?: number
  orderBy?: string
  question?: string
}

export type GetDeckById = {
  id: string
}

export type MinMaxCards = {
  max: number
  min: number
}

export type CreateDeckArgs = {
  cover?: File | null | string
  isPrivate?: boolean
  name: string
}
export type DeleteDeckArgs = { id: string }

export type UpdateDeckArgs = { id: string } & Partial<CreateDeckArgs>

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
