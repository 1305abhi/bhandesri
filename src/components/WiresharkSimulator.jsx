import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  Shield, 
  Layers, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Terminal,
  Lock
} from 'lucide-react';
import { PACKET_CAPTURES_DATA } from '../data/packetCapturesData';

export default function WiresharkSimulator() {
  const [selectedCaptureIdx, setSelectedCaptureIdx] = useState(0);
  const [selectedPacketIdx, setSelectedPacketIdx] = useState(0);
  const [displayFilter, setDisplayFilter] = useState('');
  const [showStreamModal, setShowStreamModal] = useState(false);

  const currentCapture = PACKET_CAPTURES_DATA[selectedCaptureIdx];

  const filteredPackets = currentCapture.packets.filter(p => {
    if (!displayFilter.trim()) return true;
    const f = displayFilter.toLowerCase();
    const matchProto = p.protocol.toLowerCase().includes(f);
    const matchInfo = p.info.toLowerCase().includes(f);
    const matchSrc = p.srcIp.includes(f);
    const matchDst = p.dstIp.includes(f);
    return matchProto || matchInfo || matchSrc || matchDst;
  });

  const selectedPacket = filteredPackets[selectedPacketIdx] || filteredPackets[0] || currentCapture.packets[0];

  const getProtocolColor = (proto) => {
    switch (proto) {
      case 'HTTP': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30';
      case 'DNS': return 'bg-sky-100 text-sky-800 dark:bg-cyan-500/20 dark:text-cyan-300 border-sky-300 dark:border-cyan-500/30';
      case 'TCP': return 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300 border-blue-300 dark:border-blue-500/30';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#0a1022] border border-slate-200 dark:border-blue-500/30 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 card-subtle-shadow">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white font-mono flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>WIRESHARK PACKET & PCAP INSPECTOR</span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Analyze raw network packet captures, inspect Layer 2-7 headers, and reconstruct bidirectional TCP sessions.
          </p>
        </div>

        {/* Capture Scenario Selector */}
        <div className="flex items-center gap-2">
          {PACKET_CAPTURES_DATA.map((cap, idx) => (
            <button
              key={cap.id}
              onClick={() => {
                setSelectedCaptureIdx(idx);
                setSelectedPacketIdx(0);
                setDisplayFilter('');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                selectedCaptureIdx === idx
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Capture #{idx + 1}: {cap.protocol}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Briefing */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-subtle-shadow">
        <div>
          <span className="font-bold text-blue-600 dark:text-blue-400 font-mono block text-[11px]">SCENARIO OVERVIEW:</span>
          <p className="text-slate-700 dark:text-slate-300 mt-0.5">{currentCapture.scenarioDescription}</p>
        </div>
        <button
          onClick={() => setShowStreamModal(true)}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs whitespace-nowrap shadow-sm flex items-center gap-1.5 shrink-0"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Follow TCP Stream</span>
        </button>
      </div>

      {/* Wireshark Display Filter Bar */}
      <div className="bg-white dark:bg-[#0c1220] border border-slate-200 dark:border-slate-800 rounded-2xl p-3 flex items-center gap-3 card-subtle-shadow">
        <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 font-bold">Filter:</span>
        <div className="relative flex-1">
          <input
            type="text"
            value={displayFilter}
            onChange={(e) => setDisplayFilter(e.target.value)}
            placeholder='e.g., "http", "dns", "POST", "192.168.1.45"...'
            className="w-full pl-3 pr-8 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:border-blue-500 text-xs font-mono text-slate-900 dark:text-blue-300 placeholder-slate-400 focus:outline-none"
          />
          {displayFilter && (
            <button
              onClick={() => setDisplayFilter('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>
          )}
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono">
          <button onClick={() => setDisplayFilter('http')} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-blue-600 border border-slate-200 dark:border-slate-800">http</button>
          <button onClick={() => setDisplayFilter('dns')} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-blue-600 border border-slate-200 dark:border-slate-800">dns</button>
          <button onClick={() => setDisplayFilter('POST')} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-blue-600 border border-slate-200 dark:border-slate-800">POST</button>
        </div>
      </div>

      {/* 3-Pane Layout Container */}
      <div className="space-y-4">
        
        {/* Pane 1: Packet List */}
        <div className="bg-white dark:bg-[#0b101d] border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden card-subtle-shadow">
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>PACKET LIST PANE ({filteredPackets.length} Packets)</span>
            <span>Click row to inspect</span>
          </div>

          <div className="overflow-x-auto max-h-56 overflow-y-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-100/70 dark:bg-slate-900/80 text-slate-500 border-b border-slate-200 dark:border-slate-800 text-[10px]">
                <tr>
                  <th className="py-2 px-3">No.</th>
                  <th className="py-2 px-3">Time</th>
                  <th className="py-2 px-3">Source</th>
                  <th className="py-2 px-3">Destination</th>
                  <th className="py-2 px-3">Protocol</th>
                  <th className="py-2 px-3">Length</th>
                  <th className="py-2 px-3">Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {filteredPackets.map((pkt, idx) => {
                  const isCurrent = selectedPacket?.num === pkt.num;
                  return (
                    <tr
                      key={pkt.num}
                      onClick={() => setSelectedPacketIdx(idx)}
                      className={`cursor-pointer transition-colors ${
                        isCurrent 
                          ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-900 dark:text-blue-200 font-bold' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-900/50 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <td className="py-2 px-3 text-slate-400">{pkt.num}</td>
                      <td className="py-2 px-3 text-slate-500">{pkt.time}</td>
                      <td className="py-2 px-3 text-slate-800 dark:text-slate-300">{pkt.srcIp}</td>
                      <td className="py-2 px-3 text-slate-800 dark:text-slate-300">{pkt.dstIp}</td>
                      <td className="py-2 px-3">
                        <span className={`px-1.5 py-0.2 rounded-md border text-[10px] font-bold ${getProtocolColor(pkt.protocol)}`}>
                          {pkt.protocol}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-slate-500">{pkt.length}</td>
                      <td className="py-2 px-3 truncate max-w-xs">{pkt.info}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pane 2: Header Breakdown and Payload */}
        {selectedPacket && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            <div className="bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-3 font-mono text-xs card-subtle-shadow">
              <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span>PACKET #{selectedPacket.num} HEADER BREAKDOWN</span>
                <span className="text-slate-400">{selectedPacket.protocol} Protocol</span>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-bold">LAYER 2: DATA LINK (ETHERNET II)</span>
                  <span className="text-slate-800 dark:text-slate-300 text-[11px]">{selectedPacket.headers.ethernet}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-bold">LAYER 3: NETWORK (IPv4)</span>
                  <span className="text-slate-800 dark:text-slate-300 text-[11px]">{selectedPacket.headers.ip}</span>
                </div>

                {selectedPacket.headers.tcp && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-bold">LAYER 4: TRANSPORT (TCP)</span>
                    <span className="text-slate-800 dark:text-slate-300 text-[11px]">{selectedPacket.headers.tcp}</span>
                  </div>
                )}

                {selectedPacket.headers.http && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30">
                    <span className="text-[10px] text-emerald-800 dark:text-emerald-400 block font-bold">LAYER 7: APPLICATION (HTTP)</span>
                    <pre className="text-emerald-900 dark:text-emerald-300 text-[11px] mt-1 whitespace-pre-wrap">{selectedPacket.headers.http}</pre>
                  </div>
                )}

                {selectedPacket.headers.dns && (
                  <div className="p-3 rounded-xl bg-sky-50 dark:bg-cyan-950/30 border border-sky-200 dark:border-cyan-500/30">
                    <span className="text-[10px] text-sky-800 dark:text-cyan-400 block font-bold">LAYER 7: APPLICATION (DNS)</span>
                    <span className="text-sky-900 dark:text-cyan-300 text-[11px] mt-1 block">{selectedPacket.headers.dns}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-3 font-mono text-xs card-subtle-shadow">
              <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span>PAYLOAD & ARTIFACT RECONSTRUCTION</span>
                <span className="text-slate-400">Plaintext Data</span>
              </div>

              {selectedPacket.payload ? (
                <div className="p-4 rounded-2xl bg-slate-900 text-amber-300 space-y-2">
                  <span className="text-[10px] text-amber-400 block uppercase font-bold">Extracted Payload Content:</span>
                  <div className="text-xs break-all font-mono whitespace-pre-wrap leading-relaxed">
                    {selectedPacket.payload}
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center text-slate-400">
                  <span>This packet is a pure TCP transport header (Handshake / ACK) without application payload.</span>
                </div>
              )}

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                <span className="font-bold text-sky-700 dark:text-cyan-400 block font-mono">SOC Defender Takeaway:</span>
                <p>
                  Because this session occurred over unencrypted Port 80, any adversary positioned on the local network path can intercept credentials directly without requiring decryption.
                </p>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Follow TCP Stream Modal */}
      {showStreamModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0b101c] border border-slate-200 dark:border-purple-500/40 rounded-3xl max-w-3xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="font-bold text-slate-900 dark:text-white font-mono text-sm">Follow TCP Stream (Session Reconstruction)</h3>
              </div>
              <button
                onClick={() => setShowStreamModal(false)}
                className="text-slate-500 hover:text-slate-900 text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900"
              >
                ✕ Close
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 font-mono text-xs space-y-3 max-h-96 overflow-y-auto leading-relaxed">
              <div className="text-rose-400">
                POST /api/login HTTP/1.1<br />
                Host: portal.internal-corp.com<br />
                User-Agent: Mozilla/5.0<br />
                Content-Type: application/x-www-form-urlencoded<br /><br />
                username=administrator&password=SuperSecret2026!&auth_token=8f91c
              </div>
              <div className="text-sky-400">
                HTTP/1.1 200 OK<br />
                Server: Apache/2.4.41<br />
                Set-Cookie: session=adm_9941a; Path=/<br /><br />
                {`{"status": "success", "user": "administrator", "role": "admin"}`}
              </div>
            </div>

            <div className="text-right">
              <button
                onClick={() => setShowStreamModal(false)}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
