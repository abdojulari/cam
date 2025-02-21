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
  const utmData = useUtmParams();

  return {
    utm_source: utmData.utm_source || '',
    utm_medium: utmData.utm_medium || '',
    utm_campaign: utmData.utm_campaign || '',
    utm_term: utmData.utm_term || '',
    utm_content: utmData.utm_content || '',
    event_category: params?.eventCategory || '',
    event_label: params?.eventLabel || '',
    screen_name: params?.screenName || '',
    registration_type: params?.registrationType || '',
    postal_code: params?.postalCode || undefined,
    step: params?.step || '',
    dob: params?.dob || '',
  };
};