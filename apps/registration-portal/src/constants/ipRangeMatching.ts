// IP Range mapping data

import { IPRange } from '../types/customer-registration';

const ipRanges: IPRange[] = [
    { scopeId: '10.2.1.0', name: 'EPLMLW', status: 'Active', start: '10.2.1.110', end: '10.2.1.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.2.0', name: 'EPLCPL', status: 'Active', start: '10.2.2.10', end: '10.2.2.250', subnet: '255.255.255.0' },
    { scopeId: '10.2.4.0', name: 'EPLCSD', status: 'Active', start: '10.2.4.110', end: '10.2.4.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.5.0', name: 'EPLCLV', status: 'Active', start: '10.2.5.100', end: '10.2.5.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.6.0', name: 'EPLHIG', status: 'Active', start: '10.2.6.110', end: '10.2.6.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.7.0', name: 'EPLJPL', status: 'Active', start: '10.2.7.110', end: '10.2.7.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.8.0', name: 'EPLMEA', status: 'Active', start: '10.2.8.110', end: '10.2.8.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.9.0', name: 'EPLABB', status: 'Active', start: '10.2.9.10', end: '10.2.9.250', subnet: '255.255.255.0' },
    { scopeId: '10.2.10.0', name: 'EPLWHP', status: 'Active', start: '10.2.10.110', end: '10.2.10.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.11.0', name: 'EPLRIV', status: 'Active', start: '10.2.11.110', end: '10.2.11.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.12.0', name: 'EPLSTR', status: 'Active', start: '10.2.12.110', end: '10.2.12.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.13.0', name: 'EPLSPW', status: 'Active', start: '10.2.13.110', end: '10.2.13.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.14.0', name: 'EPLWMC', status: 'Active', start: '10.2.14.10', end: '10.2.14.250', subnet: '255.255.255.0' },
    { scopeId: '10.2.15.0', name: 'EPLWOO', status: 'Active', start: '10.2.15.110', end: '10.2.15.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.16.0', name: 'EPLLHL', status: 'Active', start: '10.2.16.110', end: '10.2.16.240', subnet: '255.255.255.0' },
    { scopeId: '10.2.17.0', name: 'EPLIDY', status: 'Active', start: '10.2.17.110', end: '10.2.17.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.19.0', name: 'EPLMCN', status: 'Active', start: '10.2.19.110', end: '10.2.19.209', subnet: '255.255.255.0' },
    { scopeId: '10.2.28.0', name: 'VPN_EPL-Corp', status: 'Active', start: '10.2.28.10', end: '10.2.28.254', subnet: '255.255.255.0' },
    { scopeId: '10.2.30.0', name: 'EPLON', status: 'Active', start: '10.2.30.10', end: '10.2.30.250', subnet: '255.255.255.0' },
    { scopeId: '10.2.41.0', name: 'EPLCAL', status: 'Active', start: '10.2.41.10', end: '10.2.41.254', subnet: '255.255.255.0' },
    { scopeId: '10.2.44.0', name: 'EPLHVY', status: 'Active', start: '10.2.44.10', end: '10.2.44.250', subnet: '255.255.255.0' },
    { scopeId: '10.2.50.0', name: 'EPLMNA', status: 'Active', start: '10.2.50.10', end: '10.2.51.250', subnet: '255.255.254.0' },
    { scopeId: '10.2.52.0', name: 'EPLMNA', status: 'Active', start: '10.2.52.10', end: '10.2.53.250', subnet: '255.255.254.0' },
    { scopeId: '10.2.54.0', name: 'EPLMNA', status: 'Active', start: '10.2.54.10', end: '10.2.55.250', subnet: '255.255.254.0' },
    { scopeId: '10.2.56.0', name: 'EPLMNA', status: 'Active', start: '10.2.56.10', end: '10.2.57.250', subnet: '255.255.254.0' },
    { scopeId: '10.2.58.0', name: 'EPLMNA', status: 'Active', start: '10.2.58.10', end: '10.2.59.250', subnet: '255.255.254.0' },
    { scopeId: '10.2.60.0', name: 'EPLMNA', status: 'Active', start: '10.2.60.10', end: '10.2.61.250', subnet: '255.255.254.0' },
    { scopeId: '10.2.62.0', name: 'EPLMNA', status: 'Active', start: '10.2.62.10', end: '10.2.63.250', subnet: '255.255.254.0' },
    
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
      if (isIpInRange(ipAddress, range.start, range.end)) {
        return range.name;
      }
    }
    console.log(`IP ${ipAddress} not found in any range`);
    return 'Unknown'; // IP not found in any range
  }
  
  
  export { getNameByIpRange, ipRanges };