import { ref, onUnmounted } from 'vue'

export function useStopwatch() {
  const time = ref(0) // tempo total em ms
  const running = ref(false)
  let startTime = 0
  let timer: number | null = null

  function start() {
    if (running.value) return
    running.value = true
    startTime = Date.now() - time.value

    timer = window.setInterval(() => {
      time.value = Date.now() - startTime
    }, 100)
  }

  function pause() {
    if (!running.value) return
    running.value = false
    if (timer) clearInterval(timer)
  }

  function reset() {
    pause()
    time.value = 0
  }

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  function formattedTime() {
    const totalSeconds = Math.floor(time.value / 1000)
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
    const seconds = String(totalSeconds % 60).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  return { time, running, start, pause, reset, formattedTime }
}
