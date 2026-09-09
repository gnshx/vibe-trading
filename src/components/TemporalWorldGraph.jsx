import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Filter, Clock, Eye, MapPin, Layers, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { INITIAL_WORLD_GRAPH } from '../services/worldGraphEngine';

export default function TemporalWorldGraph() {
  const [selectedNode, setSelectedNode] = useState(INITIAL_WORLD_GRAPH.nodes[0]);
  const [temporalState, setTemporalState] = useState('present');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredNodes = INITIAL_WORLD_GRAPH.nodes.filter(n => {
    if (activeFilter === 'all') return true;
    return n.type === activeFilter;
  });

  const connectedEdges = selectedNode
    ? INITIAL_WORLD_GRAPH.edges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id)
    : [];

  return (
    <div className="space-y-6">
      {/* Top Controls & Header */}
      <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-extrabold text-white">Temporal World Graph Explorer</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Machine-readable model of global entities, cause-and-effect relationships, and supply chain dependencies.
          </p>
        </div>

        {/* Temporal Slider Controls */}
        <div className="flex items-center gap-3 bg-slate-950 p-2 rounded-2xl border border-slate-800">
          <Clock className="w-4 h-4 text-cyan-400 ml-2" />
          <span className="text-xs font-mono font-bold text-slate-400 uppercase">Temporal State:</span>
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl">
            {['past', 'present', 'future'].map((state) => (
              <button
                key={state}
                onClick={() => setTemporalState(state)}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                  temporalState === state
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {state === 'past' ? '2024-25 (Past)' : state === 'present' ? '2026 (Live)' : '2027 (Scenarios)'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/60 p-2.5 rounded-2xl border border-slate-800">
        <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5 px-2">
          <Filter className="w-3.5 h-3.5 text-cyan-400" /> Filter Graph Nodes:
        </span>
        {['all', 'event', 'entity', 'supply_chain', 'product'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
              activeFilter === filter
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            {filter === 'all' ? 'All Nodes' : filter.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Main Interactive Graph & Node Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Graph Canvas / Node Map */}
        <div className="lg:col-span-2 bg-slate-950 p-6 rounded-3xl border border-cyan-500/30 min-h-[480px] relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-xs text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Interactive Node Canvas (Click node to inspect)</span>
          </div>

          {/* Node Grid Visualization */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 my-12 relative z-10">
            <AnimatePresence>
              {filteredNodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                let nodeColor = 'bg-slate-900 border-slate-800 text-slate-300';
                if (node.type === 'event') nodeColor = 'bg-rose-950/40 border-rose-500/40 text-rose-300 hover:bg-rose-900/60';
                if (node.type === 'cause') nodeColor = 'bg-amber-950/40 border-amber-500/40 text-amber-300 hover:bg-amber-900/60';
                if (node.type === 'entity') nodeColor = 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/60';
                if (node.type === 'supply_chain') nodeColor = 'bg-indigo-950/40 border-indigo-500/40 text-indigo-300 hover:bg-indigo-900/60';
                if (node.type === 'product') nodeColor = 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60';

                return (
                  <motion.button
                    key={node.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedNode(node)}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-200 ${nodeColor} ${
                      isSelected ? 'ring-2 ring-cyan-400 scale-105 shadow-xl shadow-cyan-500/20' : ''
                    }`}
                  >
                    <div className="text-[10px] uppercase font-bold tracking-wider opacity-70 mb-1">
                      {node.type.replace('_', ' ')}
                    </div>
                    <div className="text-xs font-extrabold truncate">{node.label}</div>
                    {node.geography && (
                      <div className="text-[10px] opacity-80 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        <span>{node.geography}</span>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-900 pt-3 font-mono">
            <span>Graph Nodes: {filteredNodes.length}</span>
            <span>Causal Edges: {INITIAL_WORLD_GRAPH.edges.length}</span>
            <span>Temporal View: {temporalState.toUpperCase()}</span>
          </div>
        </div>

        {/* Node Inspector Sidebar Panel */}
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>Node Inspector</span>
            </h3>
            <span className="text-xs font-mono text-cyan-400 uppercase font-bold">{selectedNode?.type}</span>
          </div>

          {selectedNode ? (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div>
                <h4 className="text-lg font-black text-white">{selectedNode.label}</h4>
                {selectedNode.description && (
                  <p className="text-xs text-slate-300 mt-1">{selectedNode.description}</p>
                )}
              </div>

              {selectedNode.geography && (
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Geography / Jurisdiction:</span>
                  <span className="font-bold text-cyan-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {selectedNode.geography}
                  </span>
                </div>
              )}

              {/* Connected Causal Relationships */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Connected Causal Edges ({connectedEdges.length})
                </h5>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {connectedEdges.map((edge, i) => {
                    const isOutgoing = edge.source === selectedNode.id;
                    const otherNodeId = isOutgoing ? edge.target : edge.source;
                    const otherNode = INITIAL_WORLD_GRAPH.nodes.find(n => n.id === otherNodeId);

                    return (
                      <div key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-800/90 space-y-1 text-xs">
                        <div className="flex items-center justify-between font-bold">
                          <span className="text-cyan-400 font-mono">
                            {isOutgoing ? 'OUTGOING →' : '← INCOMING'}
                          </span>
                          <span className="text-emerald-400 font-mono">{edge.confidence}% Conf</span>
                        </div>
                        <div className="text-slate-200">
                          <span className="text-slate-400 font-mono">{edge.relationship}</span>{' '}
                          <span className="text-white font-bold">{otherNode?.label}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 italic">Evidence: {edge.evidence}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Click any node on the graph canvas to inspect properties & evidence.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

