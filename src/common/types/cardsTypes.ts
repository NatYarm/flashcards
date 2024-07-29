import { Deck } from '@/common/types/decksTypes'

// Определение типа карты
export type Card = {
  answer: string
  answerImg: null | string
  answerVideo: null | string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: null | string
  questionVideo: null | string
  shots: number
  updated: string
  userId: string
}

// Ответ при создании карты (без оценки)
export type CreateCardResponse = Omit<Card, 'grade'>

// Тип для идентификации карты по ID
export type CardId = { id: string }

// Тип для тела запроса на обновление карты
export type UpdateCardBody = {
  answerImg?: File | null | string
  questionImg?: File | null | string
} & Partial<Pick<Card, 'answer' | 'answerVideo' | 'question' | 'questionVideo'>>

// Тип для аргументов функции обновления карты
export type UpdateCardArgs = CardId & UpdateCardBody

// Тип для тела запроса на создание карты, требующий 'answer' и 'question'
export type CreateCardBody = Omit<UpdateCardBody, 'answer' | 'question'> &
  Required<Pick<UpdateCardBody, 'answer' | 'question'>>

// Тип для аргументов функции создания карты
export type CreateCardArgs = CreateCardBody & Pick<Deck, 'id'>

// Тип для следующей карты в колоде
export type NextCard = {
  cardId: string
  deckId: string
  grade: number
}

export type ErrorsField = {
  message: string
  path: string
  statusCode: number
  timestamp: string
}

export type ErrorResponseField = {
  data: ErrorsField
  status: number
}

// Тип для опций, которые могут использоваться в селектах
export type Option = {
  label: string
  value: string
}

// Тип для описания колонок в таблице
export type Column = {
  key: string
  sortable: boolean
  title: string
}

// Тип для сортировки
export type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null

// Тип, включающий только выбранные поля из 'Card'
export type CardById = Pick<Card, 'answer' | 'answerImg' | 'id' | 'question' | 'questionImg'>

// Тип для шкалы оценки
export type GradeScale = 0 | 1 | 2 | 3 | 4 | 5
