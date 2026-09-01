import React, { useState } from 'react';
import { 
  Activity, 
  FileText
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

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="card-minimal rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-slate-700 dark:text-slate-300" />
            <span>Packet Inspector</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Inspect raw network captures, packet headers, and reconstructed TCP streams.
          </p>
        </div>

        {/* Capture Selector */}
        <div className="flex items-center gap-1.5">
          {PACKET_CAPTURES_DATA.map((cap, idx) => (
            <button
              key={cap.id}
              onClick={() => {
                setSelectedCaptureIdx(idx);
                setSelectedPacketIdx(0);
                setDisplayFilter('');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                selectedCaptureIdx === idx
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold'
                  : 'border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              PCAP #{idx + 1}: {cap.protocol}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Description & Action */}
      <div className="card-minimal rounded-2xl p-4 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-slate-600 dark:text-slate-400">
          <strong className="text-slate-900 dark:text-white">Scenario: </strong>
          {currentCapture.scenarioDescription}
        </p>
        <button
          onClick={() => setShowStreamModal(true)}
          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5 shrink-0"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Follow TCP Stream</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="card-minimal rounded-xl p-3 flex items-center gap-2.5">
        <span className="text-xs text-slate-500 font-medium">Filter:</span>
        <div className="relative flex-1">
          <input
            type="text"
            value={displayFilter}
            onChange={(e) => setDisplayFilter(e.target.value)}
            placeholder='e.g. "http", "dns", "POST", "192.168.1.45"...'
            className="w-full pl-3 pr-7 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-slate-400"
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
      </div>

      {/* 3-Pane Layout */}
      <div className="space-y-3">
        
        {/* Packet List */}
        <div className="card-minimal rounded-2xl overflow-hidden">
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-500 uppercase flex items-center justify-between">
            <span>PACKET LIST ({filteredPackets.length} PACKETS)</span>
            <span>Click row to inspect</span>
          </div>

          <div className="overflow-x-auto max-h-52 overflow-y-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-400 border-b border-slate-200 dark:border-slate-800 text-[10px]">
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
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
                {filteredPackets.map((pkt, idx) => {
                  const isCurrent = selectedPacket?.num === pkt.num;
                  return (
                    <tr
                      key={pkt.num}
                      onClick={() => setSelectedPacketIdx(idx)}
                      className={`cursor-pointer transition-colors ${
                        isCurrent 
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-900/40 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <td className="py-1.5 px-3 text-slate-400">{pkt.num}</td>
                      <td className="py-1.5 px-3">{pkt.time}</td>
                      <td className="py-1.5 px-3">{pkt.srcIp}</td>
                      <td className="py-1.5 px-3">{pkt.dstIp}</td>
                      <td className="py-1.5 px-3 font-semibold">{pkt.protocol}</td>
                      <td className="py-1.5 px-3 text-slate-400">{pkt.length}</td>
                      <td className="py-1.5 px-3 truncate max-w-xs">{pkt.info}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Headers and Payload */}
        {selectedPacket && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            
            <div className="card-minimal rounded-2xl p-4 space-y-2.5 font-mono text-xs">
              <div className="text-[11px] font-semibold text-slate-900 dark:text-white pb-1 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span>Packet #{selectedPacket.num} Headers</span>
                <span className="text-slate-400">{selectedPacket.protocol}</span>
              </div>

              <div className="space-y-1.5">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">Layer 2: Ethernet II</span>
                  <span className="text-slate-700 dark:text-slate-300 text-[11px]">{selectedPacket.headers.ethernet}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-medium">Layer 3: IPv4</span>
                  <span className="text-slate-700 dark:text-slate-300 text-[11px]">{selectedPacket.headers.ip}</span>
                </div>

                {selectedPacket.headers.tcp && (
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-medium">Layer 4: TCP</span>
                    <span className="text-slate-700 dark:text-slate-300 text-[11px]">{selectedPacket.headers.tcp}</span>
                  </div>
                )}

                {selectedPacket.headers.http && (
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-medium">Layer 7: HTTP</span>
                    <pre className="text-slate-700 dark:text-slate-300 text-[11px] mt-0.5 whitespace-pre-wrap">{selectedPacket.headers.http}</pre>
                  </div>
                )}

                {selectedPacket.headers.dns && (
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-medium">Layer 7: DNS</span>
                    <span className="text-slate-700 dark:text-slate-300 text-[11px] mt-0.5 block">{selectedPacket.headers.dns}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="card-minimal rounded-2xl p-4 space-y-2.5 font-mono text-xs">
              <div className="text-[11px] font-semibold text-slate-900 dark:text-white pb-1 border-b border-slate-100 dark:border-slate-800">
                Extracted Payload
              </div>

              {selectedPacket.payload ? (
                <div className="p-3.5 rounded-xl bg-[#0d1117] text-emerald-300 text-xs break-all font-mono whitespace-pre-wrap leading-relaxed">
                  {selectedPacket.payload}
                </div>
              ) : (
                <div className="p-6 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-slate-400">
                  <span>No application payload in this TCP control packet.</span>
                </div>
              )}
            </div>

          </div>
        )}

      </div>

      {/* TCP Stream Modal */}
      {showStreamModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="card-minimal rounded-2xl max-w-2xl w-full p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white font-mono">Reconstructed TCP Session</h3>
              <button
                onClick={() => setShowStreamModal(false)}
                className="text-xs text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#0d1117] font-mono text-xs space-y-2 max-h-80 overflow-y-auto leading-relaxed">
              <div className="text-rose-400">
                POST /api/login HTTP/1.1<br />
                Host: portal.internal-corp.com<br />
                User-Agent: Mozilla/5.0<br /><br />
                username=administrator&password=SuperSecret2026!
              </div>
              <div className="text-sky-300">
                HTTP/1.1 200 OK<br />
                Set-Cookie: session=adm_9941a; Path=/<br /><br />
                {`{"status": "success", "role": "admin"}`}
              </div>
            </div>

            <div className="text-right">
              <button
                onClick={() => setShowStreamModal(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
