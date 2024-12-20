export const API_URL =
    process.env.NODE_ENV === 'production'
        ? `${process.env.NEXT_PUBLIC_API_PROD_URL}/${process.env.NEXT_PUBLIC_API_VERSION}`
        : `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/${process.env.NEXT_PUBLIC_API_VERSION}`

export const WEB_URL =
    process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_API_WEB_PROD_URL
        : process.env.NEXT_PUBLIC_LOCAL_URL

export const BASE_NAME_URL =
    process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASENAME_PROD_URL : ''

export const HOMEPAGE_URL =
    process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASENAME_PROD_URL : '/'
