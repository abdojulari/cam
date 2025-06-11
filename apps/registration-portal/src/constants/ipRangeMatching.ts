// IP Range mapping data

import { IPRange } from '../types/customer-registration';

const ipRanges: IPRange[] = [
    { scopeId: '10.2.1.0', name: 'MLW', status: 'Active', start: '10.2.1.110', end: '10.2.1.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.2.0', name: 'CPL', status: 'Active', start: '10.2.2.10', end: '10.2.2.250', subnet: '255.255.255.0' },
    { scopeId: '10.2.4.0', name: 'CSD', status: 'Active', start: '10.2.4.110', end: '10.2.4.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.5.0', name: 'CLV', status: 'Active', start: '10.2.5.100', end: '10.2.5.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.6.0', name: 'HIG', status: 'Active', start: '10.2.6.110', end: '10.2.6.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.7.0', name: 'JPL', status: 'Active', start: '10.2.7.110', end: '10.2.7.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.8.0', name: 'MEA', status: 'Active', start: '10.2.8.110', end: '10.2.8.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.9.0', name: 'ABB', status: 'Active', start: '10.2.9.10', end: '10.2.9.250', subnet: '255.255.255.0' },
    { scopeId: '10.2.10.0', name: 'WHP', status: 'Active', start: '10.2.10.110', end: '10.2.10.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.11.0', name: 'RIV', status: 'Active', start: '10.2.11.110', end: '10.2.11.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.12.0', name: 'STR', status: 'Active', start: '10.2.12.110', end: '10.2.12.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.13.0', name: 'SPW', status: 'Active', start: '10.2.13.110', end: '10.2.13.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.14.0', name: 'WMC', status: 'Active', start: '10.2.14.10', end: '10.2.14.250', subnet: '255.255.255.0' },
    { scopeId: '10.2.15.0', name: 'WOO', status: 'Active', start: '10.2.15.110', end: '10.2.15.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.16.0', name: 'LHL', status: 'Active', start: '10.2.16.110', end: '10.2.16.240', subnet: '255.255.255.0' },
    { scopeId: '10.2.17.0', name: 'IDY', status: 'Active', start: '10.2.17.110', end: '10.2.17.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.19.0', name: 'MCN', status: 'Active', start: '10.2.19.110', end: '10.2.19.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.21.0', name: 'DC-Staff-VM', status: 'Active', start: '10.2.21.10', end: '10.2.21.250', subnet: '255.255.255.0' },
    { scopeId: '10.2.25.0', name: 'VPN_Public_Telus', status: 'Active', start: '10.2.25.110', end: '10.2.25.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.28.0', name: 'VPN_EPL-Corp', status: 'Active', start: '10.2.28.10', end: '10.2.28.254', subnet: '255.255.255.0' },
    { scopeId: '10.2.29.0', name: 'TEST2 VPN', status: 'Active', start: '10.2.29.10', end: '10.2.29.254', subnet: '255.255.255.0' },
    { scopeId: '10.2.30.0', name: 'LON', status: 'Active', start: '10.2.30.10', end: '10.2.30.250', subnet: '255.255.255.0' },
    { scopeId: '10.2.41.0', name: 'CAL', status: 'Active', start: '10.2.41.10', end: '10.2.41.254', subnet: '255.255.255.0' },
    { scopeId: '10.2.44.0', name: 'HVY', status: 'Active', start: '10.2.44.10', end: '10.2.44.250', subnet: '255.255.255.0' },
    { scopeId: '10.2.45.0', name: 'Fortigate-Test-Staff', status: 'Active', start: '10.2.45.10', end: '10.2.45.250', subnet: '255.255.255.0' },
    { scopeId: '10.2.50.0', name: 'MNA', status: 'Active', start: '10.2.50.10', end: '10.2.51.250', subnet: '255.255.254.0' },
    { scopeId: '10.2.52.0', name: 'MNA', status: 'Active', start: '10.2.52.10', end: '10.2.53.250', subnet: '255.255.254.0' },
    { scopeId: '10.2.54.0', name: 'MNA', status: 'Active', start: '10.2.54.10', end: '10.2.55.250', subnet: '255.255.254.0' },
    { scopeId: '10.2.56.0', name: 'MNA', status: 'Active', start: '10.2.56.10', end: '10.2.57.250', subnet: '255.255.254.0' },
    { scopeId: '10.2.58.0', name: 'MNA', status: 'Active', start: '10.2.58.10', end: '10.2.59.250', subnet: '255.255.254.0' },
    { scopeId: '10.2.60.0', name: 'MNA', status: 'Active', start: '10.2.60.10', end: '10.2.61.250', subnet: '255.255.254.0' },
    { scopeId: '10.2.62.0', name: 'MNA', status: 'Active', start: '10.2.62.10', end: '10.2.63.250', subnet: '255.255.254.0' },
    { scopeId: '209.91.103.65', name: 'Home', status: 'Active', start: '209.91.103.65', end: '209.91.103.65', subnet: '255.255.254.0' },
    { scopeId: '198.161.203.6', name: 'ITS-Staff', status: 'Active', start: '198.161.203.6', end: '198.161.203.6', subnet: '255.255.254.0' },
  ];
  
  /**
   * Converts an IP address string to a number for comparison
   * @param ip - IP address string (e.g., "10.2.1.110")
   * @returns number representation of the IP address
   */
  const ipToNumber = (ip: string): number => {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
  }
  
  /**
   * Checks if an IP address falls within a given range
   * @param ip - IP address to check
   * @param startIp - Start of the IP range
   * @param endIp - End of the IP range
   * @returns true if IP is within range, false otherwise
   */
  const isIpInRange = (ip: string, startIp: string, endIp: string): boolean => {
    const ipNum = ipToNumber(ip);
    const startNum = ipToNumber(startIp);
    const endNum = ipToNumber(endIp);
    
    return ipNum >= startNum && ipNum <= endNum;
  }
  
  /**
   * Finds the name associated with an IP address based on defined ranges
   * @param ipAddress - IP address to lookup
   * @returns The name of the range if found, or null if not found
   */
  const getNameByIpRange = async (ipAddress: string): Promise<string | null> => {
    // Validate IP address format
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    if (!ipRegex.test(ipAddress)) {
      console.warn('Invalid IP address format:', ipAddress);
      return null;
    }
  
    // Find matching range
    for (const range of ipRanges) {
      console.log(`Checking IP ${ipAddress} against range ${range.start} - ${range.end}`);
      if (isIpInRange(ipAddress, range.start, range.end)) {
        console.log(`IP ${ipAddress} belongs to: ${range.name}`);
        return range.name;
      }
    }
    console.log(`IP ${ipAddress} not found in any range`);
    return 'Unknown'; // IP not found in any range
  }
  
  
  export { getNameByIpRange, ipRanges };