import { useUtmParams } from '../composables/useUtmParams';
const { gtag } = useGtag();
const utmParams = useUtmParams()

export const sendEventToGA = (buttonName: string) => {
    gtag('event', 'child_details', {
        app_name: 'EPL | Online Registration',
        screen_name: 'Child Screen',
        event_category: `${buttonName} button clicked`,
        event_label: 'Child Details',
        registration_type: 'EPL_SELFJ',
        step: 2,
        ...utmParams
    });
}
