import { configureStore } from '@reduxjs/toolkit'
<<<<<<< HEAD

import { flashcardsApi } from './flashcardsApi'
=======
import { baseApi } from './baseApi'
>>>>>>> 7fd046f0892a52b696eecbaaef6abb1a1e08acc5

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
  reducer: { [baseApi.reducerPath]: baseApi.reducer },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
