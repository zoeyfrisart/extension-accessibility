/* eslint-disable max-statements */
const focusElement = (element: HTMLButtonElement | null) => {
  element?.focus()
}

export const radioGroupKeyboardHandler = (
  event: React.KeyboardEvent,
  elements: (HTMLButtonElement | null)[],
  values: {
    label: string
    id: string
  }[],
  handleChange: (id: string) => void,
) => {
  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      if (event.target === elements[0]) {
        const index = values.length - 1
        handleChange(values[index].id)
        focusElement(elements[index])
      } else {
        const index = elements.indexOf(event.target as HTMLButtonElement)
        handleChange(values[index - 1].id)
        focusElement(elements[index - 1])
      }
      break

    case 'ArrowRight':
    case 'ArrowDown':
      if (event.target === elements[elements.length - 1]) {
        handleChange(values[0].id)
        focusElement(elements[0])
      } else {
        const index = elements.indexOf(event.target as HTMLButtonElement)
        handleChange(values[index + 1].id)
        focusElement(elements[index + 1])
      }
      break

    default:
      break
  }
}
