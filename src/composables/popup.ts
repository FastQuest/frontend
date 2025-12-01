import { ref } from 'vue'

// Estado Global (Singleton)
const isOpen = ref(false) // Mudei de 'closed' para 'isOpen' (mais intuitivo)
const confirmAction = ref<(() => void) | null>(null)

export const usePopUp = () => {

  function open(func: () => void) {
    // 1. Define a ação que será executada ao confirmar
    confirmAction.value = () => {
      func()           // Executa a função passada
      isOpen.value = false // Fecha o modal automaticamente
    }

    // 2. Abre o modal
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  // Função para usar no @click do botão "Sim/Confirmar" no template
  function onConfirm() {
    if (confirmAction.value) {
      confirmAction.value()
    }
  }

  return {
    open,
    close,
    isOpen,
    onConfirm // Retornamos uma função fixa que chama a referência dinâmica
  }
}
