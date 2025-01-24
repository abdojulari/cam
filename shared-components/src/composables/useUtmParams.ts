// composables/useUtmParams.ts
export function useUtmParams() {
  const getUtmParams = () => {
    if (typeof window === 'undefined') return {}

    const urlParams = new URLSearchParams(window.location.search)
    const utmParams: { [key: string]: string } = {}
    
    // List of UTM parameters to capture
    const utmKeys = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content'
    ]

    utmKeys.forEach(key => {
      const value = urlParams.get(key)
      if (value) {
        utmParams[key] = value
      }
    })

    return utmParams
  }

  return getUtmParams()
}