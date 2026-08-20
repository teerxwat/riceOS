import { useEffect, useState } from 'react'

// Shared loading/error/data plumbing for the mock api/* fetchers so pages
// don't each re-implement the same useEffect boilerplate.
export function useApiData(fetcher, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null })

  useEffect(() => {
    let cancelled = false

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null })
      })
      .catch((err) => {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : 'โหลดข้อมูลไม่สำเร็จ'
          setState({ data: null, loading: false, error: message })
        }
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return state
}
