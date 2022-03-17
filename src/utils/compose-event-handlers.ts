/**
 * Wraps a lib-defined event handler and a user-defined event handler, returning
 * a single handler that allows a user to prevent lib-defined handlers from
 * firing.
 *
 * @param customHandler User-supplied event handler
 * @param defaultHandler Library-supplied event handler
 */
 export function composeEventHandlers<
 EventType extends React.SyntheticEvent | Event
>(
  customHandler: ((event: EventType) => unknown) | undefined,
  defaultHandler: (event: EventType) => unknown
): (event: EventType) => unknown {
  return (event) => {
    customHandler?.(event)

    // If the user prevents default we don't call our handler
    if (!event.defaultPrevented) {
      return defaultHandler(event)
    }
  }
}
