/**
 * Simulated Network Packet Captures (PCAPs) for Interactive Wireshark Analysis.
 */

export const PACKET_CAPTURES_DATA = [
  {
    id: 'pcap-1',
    title: 'Plaintext HTTP Authentication & Credential Exposure',
    protocol: 'HTTP / TCP',
    scenarioDescription: 'Employee authenticating to an internal legacy portal over unencrypted HTTP (Port 80). Demonstrates cleartext credential exposure.',
    packets: [
      {
        num: 1,
        time: '0.000000',
        srcIp: '192.168.1.45',
        dstIp: '93.184.216.34',
        protocol: 'TCP',
        srcPort: 51240,
        dstPort: 80,
        length: 66,
        info: '51240 -> 80 [SYN] Seq=0 Win=64240 Len=0',
        headers: {
          ethernet: 'Src: 00:1a:2b:3c:4d:5e, Dst: 00:50:56:c0:00:08',
          ip: 'IPv4, Src: 192.168.1.45, Dst: 93.184.216.34, TTL: 64',
          tcp: 'Source Port: 51240, Dst Port: 80, Flags: [SYN], Seq: 0'
        },
        payload: ''
      },
      {
        num: 2,
        time: '0.012450',
        srcIp: '93.184.216.34',
        dstIp: '192.168.1.45',
        protocol: 'TCP',
        srcPort: 80,
        dstPort: 51240,
        length: 66,
        info: '80 -> 51240 [SYN, ACK] Seq=0 Ack=1 Win=65535 Len=0',
        headers: {
          ethernet: 'Src: 00:50:56:c0:00:08, Dst: 00:1a:2b:3c:4d:5e',
          ip: 'IPv4, Src: 93.184.216.34, Dst: 192.168.1.45, TTL: 52',
          tcp: 'Source Port: 80, Dst Port: 51240, Flags: [SYN, ACK], Seq: 0, Ack: 1'
        },
        payload: ''
      },
      {
        num: 3,
        time: '0.012510',
        srcIp: '192.168.1.45',
        dstIp: '93.184.216.34',
        protocol: 'TCP',
        srcPort: 51240,
        dstPort: 80,
        length: 54,
        info: '51240 -> 80 [ACK] Seq=1 Ack=1 Win=64240 Len=0',
        headers: {
          ethernet: 'Src: 00:1a:2b:3c:4d:5e, Dst: 00:50:56:c0:00:08',
          ip: 'IPv4, Src: 192.168.1.45, Dst: 93.184.216.34, TTL: 64',
          tcp: 'Source Port: 51240, Dst Port: 80, Flags: [ACK], Seq: 1, Ack: 1'
        },
        payload: ''
      },
      {
        num: 4,
        time: '0.054210',
        srcIp: '192.168.1.45',
        dstIp: '93.184.216.34',
        protocol: 'HTTP',
        srcPort: 51240,
        dstPort: 80,
        length: 312,
        info: 'POST /api/login HTTP/1.1 (application/x-www-form-urlencoded)',
        headers: {
          ethernet: 'Src: 00:1a:2b:3c:4d:5e, Dst: 00:50:56:c0:00:08',
          ip: 'IPv4, Src: 192.168.1.45, Dst: 93.184.216.34, TTL: 64',
          tcp: 'Source Port: 51240, Dst Port: 80, Flags: [PSH, ACK], Seq: 1, Ack: 1',
          http: 'POST /api/login HTTP/1.1\r\nHost: portal.internal-corp.com\r\nUser-Agent: Mozilla/5.0\r\nContent-Type: application/x-www-form-urlencoded\r\nContent-Length: 42'
        },
        payload: 'username=administrator&password=SuperSecret2026!&auth_token=8f91c'
      },
      {
        num: 5,
        time: '0.078120',
        srcIp: '93.184.216.34',
        dstIp: '192.168.1.45',
        protocol: 'HTTP',
        srcPort: 80,
        dstPort: 51240,
        length: 245,
        info: 'HTTP/1.1 200 OK (text/html)',
        headers: {
          ethernet: 'Src: 00:50:56:c0:00:08, Dst: 00:1a:2b:3c:4d:5e',
          ip: 'IPv4, Src: 93.184.216.34, Dst: 192.168.1.45, TTL: 52',
          http: 'HTTP/1.1 200 OK\r\nServer: Apache/2.4.41\r\nSet-Cookie: session=adm_9941a; Path=/'
        },
        payload: '{"status": "success", "user": "administrator", "role": "admin"}'
      }
    ]
  },
  {
    id: 'pcap-2',
    title: 'DNS Tunneling & Data Exfiltration Query Stream',
    protocol: 'DNS / UDP',
    scenarioDescription: 'Malware exfiltrating sensitive data chunk by chunk encoded in subdomains of an attacker-controlled authoritative name server.',
    packets: [
      {
        num: 1,
        time: '1.102100',
        srcIp: '192.168.10.88',
        dstIp: '10.0.0.2',
        protocol: 'DNS',
        srcPort: 58210,
        dstPort: 53,
        length: 110,
        info: 'Standard query 0x1a4f A dXNlcm5hbWU9YWRtaW4=.c2-tunnel.attacker-domain.com',
        headers: {
          ethernet: 'Src: 00:11:22:33:44:55, Dst: 00:aa:bb:cc:dd:ee',
          ip: 'IPv4, Src: 192.168.10.88, Dst: 10.0.0.2, TTL: 128',
          dns: 'Transaction ID: 0x1a4f, Flags: Standard query, Query Name: dXNlcm5hbWU9YWRtaW4=.c2-tunnel.attacker-domain.com'
        },
        payload: 'DNS Query for Base64 encoded payload: dXNlcm5hbWU9YWRtaW4= (Decodes to: username=admin)'
      },
      {
        num: 2,
        time: '1.205400',
        srcIp: '192.168.10.88',
        dstIp: '10.0.0.2',
        protocol: 'DNS',
        srcPort: 58211,
        dstPort: 53,
        length: 115,
        info: 'Standard query 0x2b8a A cGFzc3dvcmQ9U2VjdXJlMTI=.c2-tunnel.attacker-domain.com',
        headers: {
          ethernet: 'Src: 00:11:22:33:44:55, Dst: 00:aa:bb:cc:dd:ee',
          ip: 'IPv4, Src: 192.168.10.88, Dst: 10.0.0.2, TTL: 128',
          dns: 'Transaction ID: 0x2b8a, Flags: Standard query, Query Name: cGFzc3dvcmQ9U2VjdXJlMTI=.c2-tunnel.attacker-domain.com'
        },
        payload: 'DNS Query for Base64 encoded payload: cGFzc3dvcmQ9U2VjdXJlMTI= (Decodes to: password=Secure12)'
      }
    ]
  }
];
