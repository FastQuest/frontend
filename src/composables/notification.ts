import { ref } from 'vue'

const message = ref<string | null>(null)
const type = ref<'success' | 'error' | 'info' | null>(null)
const closed = ref<boolean>(true)

export const useNotification = () => {
  function notify(msg: string, t: 'success' | 'error' | 'info' = 'info') {
    message.value = msg
    type.value = t
    closed.value = false

    setTimeout(() => {
      closed.value = true
      setTimeout(() => {
        message.value = null
        type.value = null
      }, 1000)
    }, 4000)
  }

  return {
    message,
    type,
    notify,
    closed
  }
}
