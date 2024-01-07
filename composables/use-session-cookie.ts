export const useSessionCookies = () => {
  const cookies = {
    'access-token': useCookie('access-token'),
    client: useCookie('client'),
    uid: useCookie('uid'),
  }

  const setCookies = (key: keyof typeof cookies, value: string) => {
    if (value) {
      cookies[key].value = value
    }
  }

  return {
    cookies,
    setCookies,
  }
}
