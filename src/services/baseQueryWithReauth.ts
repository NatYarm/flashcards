import { matchPath } from 'react-router-dom'

import { path } from '@/common/enams'
import { SignInResponse } from '@/common/types'
import { publicRoutes, router } from '@/router'
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.flashcards.andrii.es',
  credentials: 'include',
  prepareHeaders: headers => {
    const token = localStorage.getItem('accessToken')

    if (headers.get('Authorization')) {
      return headers
    }

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      const refreshToken = localStorage.getItem('refreshToken')

      try {
        const refreshResult = await baseQuery(
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
            method: 'POST',
            url: '/v2/auth/refresh-token',
          },
          api,
          extraOptions
        )

        if (refreshResult.data) {
          localStorage.setItem('accessToken', (refreshResult.data as SignInResponse).accessToken)
          localStorage.setItem('refreshToken', (refreshResult.data as SignInResponse).refreshToken)
          result = await baseQuery(args, api, extraOptions)
        } else {
          const isPublicRoutes = publicRoutes.find(route =>
            matchPath(route.path ?? '', window.location.pathname)
          )

          if (!isPublicRoutes) {
            void router.navigate(path.signIn)
          }
        }
      } finally {
        release()
      }
      /*const refreshResult = await baseQuery(
        { method: 'POST', url: '/v1/auth/refresh-token' },
        api,
        extraOptions
      )

      if (refreshResult.meta?.response?.status === 204) {
        // retry the initial query
        result = await baseQuery(args, api, extraOptions)
      }
      release()*/
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
