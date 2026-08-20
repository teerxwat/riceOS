let counter = 0

// Local-only ids for form rows (plots, files) — never sent as real DB ids.
export function nextLocalId(prefix) {
  counter += 1
  return `${prefix}-${counter}`
}
