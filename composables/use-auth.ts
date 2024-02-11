export const useAuth = () => {
  const user = useState('user', () => ({
    email: '',
    firstname: '',
    lastname: '',
    isAdmin: null,
  }))

  const setUser = (data: any) => {
    if (data) {
      user.value = { ...data }
    }
  }

  return {
    setUser,
    user,
  }
}
