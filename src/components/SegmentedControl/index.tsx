import React from 'react'
import {
  LayoutGroup,
  m,
  LazyMotion,
  domMax
} from 'framer-motion'

// Utils
import { composeEventHandlers } from '../../utils/compose-event-handlers'
import { radioGroupKeyboardHandler } from '../../utils/radio-group-keyboard-handler'

// Styling
import styles from './segmented-control.module.scss'

// Types
declare global {
  interface ISegmentedControlOption {
    /** The label that is displayed in the element */
    label: string
    /** The unique ID of the element */
    id: string
  }

  interface ISegmentedControlProps {
    /**
     * The values of the segmented Control.
     */
    values: ISegmentedControlOption[]
    /** A descriptive label that explains what this group is used for, @example 'Filter on category' */
    groupLabel: string
    /** A unique ID, only needs to be provided if a page contains multiple segmented controls */
    groupId?: string
    /** Parent event handler, this allows the parent to hook into the logic. */
    onClick(event: React.MouseEvent | string): void
  }
}

/**
 * Segmented Control, this particular implementation expects it to work like a tab group.
 *
 * Implemented according to WCAG Guidelines: https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html
 */
export function SegmentedControl({
  values,
  groupLabel,
  groupId = 'segmented-control',
  onClick
}: ISegmentedControlProps) {
  const [currentValue, setCurrentValue] = React.useState<string>(values[0].id)
  const radioButtons = React.useRef<(HTMLButtonElement | null)[]>([])

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    const target = event.target as HTMLButtonElement
    const { id } = target.dataset
    setCurrentValue(id ?? '')
  }

  const updateValue = (id: string) => {
    setCurrentValue(id)
    onClick(id)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    radioGroupKeyboardHandler(
      event,
      radioButtons.current,
      values,
      updateValue
    )
  }

  return (
    <div aria-label={groupLabel} className={styles.wrapper} role="tablist">
      <LazyMotion features={domMax}>
        <LayoutGroup id={groupId}>
          {values.map(({ label, id }, idx) => {
            const isSelected = currentValue === id
            const isNextSelected = currentValue === values[idx + 1]?.id

            return (
              <React.Fragment key={`${id}-${idx}`}>
                <button
                  aria-controls={`${id}-panel`}
                  aria-selected={id === currentValue}
                  className={styles.button}
                  data-group={groupId}
                  data-id={id}
                  id={`${id}-label`}
                  onClick={composeEventHandlers(onClick, handleClick)}
                  onKeyDown={handleKeyDown}
                  ref={(element) => radioButtons.current[idx] = element}
                  role="tab"
                  tabIndex={id === currentValue ? 0 : -1}
                  type="button"
                >
                  {label}
                  {id === currentValue && (
                    <m.div className={styles.background} layoutId="active-background" />
                  )}
                </button>
                <div
                  className={styles.separator}
                  style={{
                    opacity: isSelected || isNextSelected ? 0 : 1
                  }}
                />
              </React.Fragment>
            )
          })}
        </LayoutGroup>
      </LazyMotion>
    </div>
  )
}
