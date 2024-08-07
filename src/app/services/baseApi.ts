import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from './baseQueryWithReauth'

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'CardLearn', 'Me', 'Cards', 'MinMaxCards', 'Deck'],
})
