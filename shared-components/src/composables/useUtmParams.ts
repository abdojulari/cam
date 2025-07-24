// composables/useUtmParams.ts
export function useUtmParams() {
  const getUtmParams = () => {
    if (typeof window === 'undefined') return {}
    // get the url from the window
    const url = window.location.href
    // remove the base url from the url
    const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://cam.epl.ca'
      : 'http://localhost:4500/';
      const urlWithoutBase = url.replace(baseUrl, '')
    console.log('url', urlWithoutBase)

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
    console.log('utmParams', utmParams)
    return { utmParams, urlWithoutBase }
  }
  
  return getUtmParams()
}