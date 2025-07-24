import { useUtmParams } from "./useUtmParams";

export const useReproducibleData = (params?: {
  postalCode?: string;
  eventCategory?: string;
  eventLabel?: string;
  screenName?: string;
  registrationType?: string;
  step?: string | number;
  dob?: string;
}) => {
  const { utmParams, urlWithoutBase } = useUtmParams();
  
  return {
    utm_source: utmParams?.utm_source || '' ,
    utm_medium: utmParams?.utm_medium || '',
    utm_campaign: utmParams?.utm_campaign || '',
    utm_term: utmParams?.utm_term || '',
    utm_content: utmParams?.utm_content || '',
    event_category: params?.eventCategory || '',
    event_label: params?.eventLabel || '',
    screen_name: params?.screenName || '',
    registration_type: params?.registrationType || '',
    postal_code: params?.postalCode || undefined,
    step: params?.step || '',
    dob: params?.dob || '',
    url: urlWithoutBase || '',
  };
};