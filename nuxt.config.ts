// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  ui: {
    global: true,
    icons: ['heroicons'],
  },
  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBase: '',
    },
  },
  // typescript: {
  //   typeCheck: true,
  //   strict: true,
  // },
})
