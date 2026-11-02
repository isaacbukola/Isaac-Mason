import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  GripVertical, 
  Code2, 
  Terminal, 
  Sliders, 
  Activity, 
  Layers,
  Zap,
  Check
} from 'lucide-react';
import { 
  AVAILABLE_TRIGGERS, 
  AVAILABLE_ACTIONS, 
  PRESET_WORKFLOWS, 
  WorkflowBlock, 
  CanvasStep 
} from '../data/workflowTemplates';

interface AutomationWorkspaceProps {
  onSelectPackageForOutreach: (packageId: string, customNote?: string) => void;
}

export const AutomationWorkspace: React.FC<AutomationWorkspaceProps> = ({
  onSelectPackageForOutreach,
}) => {
  // Active steps on canvas
  const [activeSteps, setActiveSteps] = useState<CanvasStep[]>(() => {
    return PRESET_WORKFLOWS[0].blocks.map((b, idx) => ({
      ...b,
      instanceId: `step-${Date.now()}-${idx}`,
    }));
  });

  const [selectedPresetId, setSelectedPresetId] = useState<string>('preset-essential');
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [currentRunningStepIndex, setCurrentRunningStepIndex] = useState<number>(-1);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [showPayloadInspector, setShowPayloadInspector] = useState<boolean>(false);
  const [draggedItem, setDraggedItem] = useState<WorkflowBlock | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [simulationLogs]);

  // Load a preset workflow
  const loadPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = PRESET_WORKFLOWS.find((p) => p.id === presetId);
    if (preset) {
      const newSteps: CanvasStep[] = preset.blocks.map((b, idx) => ({
        ...b,
        instanceId: `step-${Date.now()}-${idx}`,
      }));
      setActiveSteps(newSteps);
      setSelectedStepId(newSteps[0]?.instanceId || null);
      setSimulationLogs([`Loaded preset: ${preset.name}`]);
    }
  };

  // Drag and drop handlers
  const handleDragStartFromPalette = (e: React.DragEvent, block: WorkflowBlock) => {
    setDraggedItem(block);
    e.dataTransfer.setData('application/json', JSON.stringify(block));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOverCanvas = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOverIndex(index);
  };

  const handleDropOnCanvas = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    setDragOverIndex(null);
    let block: WorkflowBlock | null = draggedItem;

    if (!block) {
      try {
        const raw = e.dataTransfer.getData('application/json');
        if (raw) block = JSON.parse(raw);
      } catch {
        // fallback
      }
    }

    if (block) {
      const newStep: CanvasStep = {
        ...block,
        instanceId: `step-${Date.now()}-${Math.random()}`,
      };

      const updated = [...activeSteps];
      updated.splice(targetIndex, 0, newStep);
      setActiveSteps(updated);
      setSelectedStepId(newStep.instanceId);
      setSelectedPresetId('custom');
      setDraggedItem(null);
      setSimulationLogs((prev) => [...prev, `Added step: "${block.title}" to position ${targetIndex + 1}`]);
    }
  };

  const addBlockToCanvas = (block: WorkflowBlock) => {
    const newStep: CanvasStep = {
      ...block,
      instanceId: `step-${Date.now()}-${Math.random()}`,
    };
    setActiveSteps((prev) => [...prev, newStep]);
    setSelectedStepId(newStep.instanceId);
    setSelectedPresetId('custom');
    setSimulationLogs((prev) => [...prev, `Added step: "${block.title}"`]);
  };

  const removeStep = (instanceId: string) => {
    if (activeSteps.length <= 1) return;
    setActiveSteps((prev) => prev.filter((s) => s.instanceId !== instanceId));
    if (selectedStepId === instanceId) {
      setSelectedStepId(null);
    }
    setSelectedPresetId('custom');
  };

  // Run the live simulation
  const runSimulation = async () => {
    if (isSimulating || activeSteps.length === 0) return;
    setIsSimulating(true);
    setSimulationLogs(['Initializing simulated webhook listener...', 'Listening for live events...']);

    for (let i = 0; i < activeSteps.length; i++) {
      setCurrentRunningStepIndex(i);
      const step = activeSteps[i];
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');

      if (step.type === 'trigger') {
        setSimulationLogs((prev) => [
          ...prev,
          `[${timeStr}] ⚡ TRIGGER: ${step.title} fired via ${step.app}`,
          `[${timeStr}] -> Incoming payload verified (HTTP 200 OK)`,
        ]);
      } else {
        setSimulationLogs((prev) => [
          ...prev,
          `[${timeStr}] ⚙️ ACTION [Step 0${i + 1}]: Executing ${step.title} (${step.app})`,
          `[${timeStr}] -> Transformed fields mapped to ${step.app} API endpoint`,
          `[${timeStr}] -> Success: Action fulfilled in 140ms`,
        ]);
      }

      await new Promise((res) => setTimeout(res, 650));
    }

    const finalTime = new Date().toTimeString().split(' ')[0];
    setSimulationLogs((prev) => [
      ...prev,
      `[${finalTime}] ✨ WORKFLOW COMPLETE: All ${activeSteps.length} steps executed successfully.`,
      `[${finalTime}] 💡 0 human hours wasted. 100% data fidelity preserved.`,
    ]);

    setCurrentRunningStepIndex(-1);
    setIsSimulating(false);
  };

  const resetCanvas = () => {
    loadPreset('preset-essential');
  };

  const activeSelectedStep = activeSteps.find((s) => s.instanceId === selectedStepId) || activeSteps[0];

  // Determine estimated time saved
  const estimatedHoursSaved = activeSteps.reduce((acc, step) => {
    return acc + (step.type === 'trigger' ? 2 : 4);
  }, 0);

  return (
    <section id="workspace" className="py-16 md:py-24 border-b border-zinc-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#432888] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Workflow Engine</span>
              <span aria-hidden="true" className="text-zinc-300">·</span>
              <span>Visual Drag & Drop</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
              Test your automation before building it.
            </h2>
            <p className="text-base text-zinc-600 mt-2 max-w-2xl">
              Drag triggers and actions from the library to test how enquiries, reminders, and data sync through your business automatically.
            </p>
          </div>

          {/* Preset Selector */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-zinc-100/90 rounded-xl border border-zinc-200">
            {PRESET_WORKFLOWS.map((preset) => {
              const active = selectedPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => loadPreset(preset.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-white text-[#432888] shadow-sm font-semibold'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60'
                  }`}
                >
                  {preset.name}
                </button>
              );
            })}
            {selectedPresetId === 'custom' && (
              <span className="px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-100/70 rounded-lg whitespace-nowrap">
                Custom Blueprint
              </span>
            )}
          </div>
        </div>

        {/* Studio Workspace Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Draggable Library Palette (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#FAF9FE] rounded-2xl p-5 border border-purple-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#432888]" />
                  <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                    Component Palette
                  </h3>
                </div>
                <span className="text-[11px] text-zinc-500 font-medium">Drag or click +</span>
              </div>

              {/* Triggers Group */}
              <div className="mb-6">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide block mb-2.5">
                  1. Triggers (What starts the workflow)
                </span>
                <div className="space-y-2">
                  {AVAILABLE_TRIGGERS.map((block) => (
                    <div
                      key={block.id}
                      draggable
                      onDragStart={(e) => handleDragStartFromPalette(e, block)}
                      className="group flex items-start gap-3 p-3 bg-white hover:bg-purple-50/40 rounded-xl border border-zinc-200/90 hover:border-purple-300 transition-all cursor-grab active:cursor-grabbing shadow-xs"
                    >
                      <GripVertical className="w-4 h-4 text-zinc-400 group-hover:text-purple-600 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-xs font-bold text-zinc-900 truncate">
                            {block.title}
                          </span>
                          <span className="text-[10px] font-semibold text-[#432888] bg-purple-100/80 px-1.5 py-0.2 rounded">
                            {block.app}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">
                          {block.description}
                        </p>
                      </div>
                      <button
                        onClick={() => addBlockToCanvas(block)}
                        title="Add to workflow"
                        className="p-1 text-zinc-400 hover:text-[#432888] hover:bg-purple-100/80 rounded transition-colors shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Group */}
              <div>
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide block mb-2.5">
                  2. Actions (What executes automatically)
                </span>
                <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                  {AVAILABLE_ACTIONS.map((block) => (
                    <div
                      key={block.id}
                      draggable
                      onDragStart={(e) => handleDragStartFromPalette(e, block)}
                      className="group flex items-start gap-3 p-3 bg-white hover:bg-emerald-50/30 rounded-xl border border-zinc-200/90 hover:border-emerald-300 transition-all cursor-grab active:cursor-grabbing shadow-xs"
                    >
                      <GripVertical className="w-4 h-4 text-zinc-400 group-hover:text-emerald-600 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-xs font-bold text-zinc-900 truncate">
                            {block.title}
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/80 px-1.5 py-0.2 rounded">
                            {block.app}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">
                          {block.description}
                        </p>
                      </div>
                      <button
                        onClick={() => addBlockToCanvas(block)}
                        title="Add to workflow"
                        className="p-1 text-zinc-400 hover:text-emerald-700 hover:bg-emerald-100/80 rounded transition-colors shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Metrics & ROI Box */}
            <div className="bg-zinc-900 text-white rounded-2xl p-5 shadow-md">
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
                <span className="font-semibold text-purple-300">ESTIMATED PIPELINE ROI</span>
                <Activity className="w-3.5 h-3.5 text-purple-400" />
              </div>
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-zinc-800">
                <div>
                  <span className="text-2xl font-black text-white tabular-nums">
                    {estimatedHoursSaved} hrs
                  </span>
                  <span className="block text-[11px] text-zinc-400">Admin saved / month</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-emerald-400 tabular-nums">
                    &lt; 1 sec
                  </span>
                  <span className="block text-[11px] text-zinc-400">Response speed</span>
                </div>
              </div>
              <div className="pt-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-zinc-400">Matched Package</span>
                  <div className="text-xs font-bold text-purple-300">
                    {activeSteps.length <= 4 ? 'Essential or Booking Boost' : 'Business Flow (£599)'}
                  </div>
                </div>
                <button
                  onClick={() => {
                    const matched = activeSteps.length <= 4 ? 'essential' : 'business-flow';
                    onSelectPackageForOutreach(
                      matched,
                      `Configured interactive workflow with ${activeSteps.length} steps: ${activeSteps.map((s) => s.title).join(' -> ')}`
                    );
                  }}
                  className="px-3 py-1.5 text-xs font-bold text-zinc-900 bg-white hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Build This</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Automation Canvas (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Canvas Header & Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-zinc-900 text-white rounded-2xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Live Operational Pipeline
                  </span>
                  <div className="text-[11px] text-zinc-400 flex items-center gap-2">
                    <span>{activeSteps.length} active stages connected</span>
                    <span>·</span>
                    <span>Status: {isSimulating ? 'Executing...' : 'Ready'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPayloadInspector(!showPayloadInspector)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                    showPayloadInspector 
                      ? 'bg-purple-900/60 border-purple-500 text-purple-200' 
                      : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Payload Inspector</span>
                </button>

                <button
                  onClick={resetCanvas}
                  disabled={isSimulating}
                  className="p-2 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors border border-zinc-700 cursor-pointer disabled:opacity-50"
                  title="Reset to default preset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={runSimulation}
                  disabled={isSimulating || activeSteps.length === 0}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#432888] hover:bg-[#5233a3] rounded-lg transition-all flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className={`w-3.5 h-3.5 fill-white ${isSimulating ? 'animate-spin' : ''}`} />
                  <span>{isSimulating ? 'Simulating...' : 'Simulate Workflow'}</span>
                </button>
              </div>
            </div>

            {/* Canvas Surface with Grid and Connector Lines */}
            <div 
              className="relative p-6 sm:p-8 bg-zinc-50/70 border border-zinc-200/90 rounded-2xl canvas-grid min-h-[480px] flex flex-col justify-between"
              onDragOver={(e) => handleDragOverCanvas(e, activeSteps.length)}
              onDrop={(e) => handleDropOnCanvas(e, activeSteps.length)}
            >
              {/* Droppable Step Cards Sequence */}
              <div className="space-y-4 relative">
                {activeSteps.map((step, index) => {
                  const isRunning = currentRunningStepIndex === index;
                  const isCompleted = currentRunningStepIndex > index || (!isSimulating && currentRunningStepIndex === -1 && simulationLogs.length > 5);
                  const isSelected = selectedStepId === step.instanceId;

                  return (
                    <div key={step.instanceId} className="relative">
                      {/* Drop insertion line indicator */}
                      {dragOverIndex === index && (
                        <div className="h-1 bg-[#432888] rounded-full my-2 animate-pulse" />
                      )}

                      {/* Main Node Card */}
                      <div
                        onClick={() => setSelectedStepId(step.instanceId)}
                        className={`relative z-10 p-4 sm:p-5 rounded-xl transition-all cursor-pointer border ${
                          isRunning
                            ? 'bg-purple-50/95 border-[#432888] shadow-lg ring-2 ring-[#432888]/20 scale-[1.01]'
                            : isSelected
                            ? 'bg-white border-[#432888] shadow-md'
                            : 'bg-white hover:bg-zinc-50 border-zinc-200 shadow-xs hover:border-zinc-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            {/* Step index badge */}
                            <span className="w-7 h-7 rounded-lg bg-zinc-100 text-zinc-700 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-zinc-200">
                              0{index + 1}
                            </span>

                            {/* Node identity */}
                            <div>
                              <div className="flex items-center gap-2 mb-0.5">
                                <span
                                  className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wider ${
                                    step.type === 'trigger'
                                      ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                      : 'bg-purple-100 text-purple-900 border border-purple-200'
                                  }`}
                                >
                                  {step.type === 'trigger' ? 'Trigger' : 'Action'}
                                </span>
                                <span className="text-xs font-semibold text-zinc-500">
                                  via {step.app}
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-zinc-950">
                                {step.title}
                              </h4>
                            </div>
                          </div>

                          {/* Status & controls */}
                          <div className="flex items-center gap-2">
                            {isRunning && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#432888] bg-purple-100 px-2 py-0.5 rounded-full animate-pulse">
                                <Zap className="w-3 h-3 fill-[#432888]" />
                                Running
                              </span>
                            )}
                            {isCompleted && !isRunning && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full">
                                <Check className="w-3 h-3" />
                                Done
                              </span>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeStep(step.instanceId);
                              }}
                              disabled={activeSteps.length <= 1}
                              className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                              title="Delete stage"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Step Description */}
                        <p className="text-xs text-zinc-600 mt-2 pl-10 pr-4 leading-relaxed">
                          {step.description}
                        </p>

                        {/* Connected parameters when selected */}
                        {isSelected && (
                          <div className="mt-3.5 pt-3.5 border-t border-zinc-100 pl-10 flex flex-wrap items-center gap-4 text-[11px] text-zinc-500">
                            <div>
                              <span className="text-zinc-400">Endpoint:</span>{' '}
                              <span className="font-mono text-zinc-800">
                                {step.type === 'trigger' ? 'POST /webhooks/v1/inbound' : `POST /api/v2/${step.app.toLowerCase()}`}
                              </span>
                            </div>
                            <div>
                              <span className="text-zinc-400">Latency:</span>{' '}
                              <span className="font-mono text-emerald-700 font-semibold">
                                {step.type === 'trigger' ? 'Real-time (0ms)' : '~120ms'}
                              </span>
                            </div>
                            <div>
                              <span className="text-zinc-400">Error Retries:</span>{' '}
                              <span className="font-mono text-zinc-800">3x Exponential backoff</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Animated Connector Conduit Line to Next Step */}
                      {index < activeSteps.length - 1 && (
                        <div className="relative flex justify-center my-1 py-1">
                          <div className="w-0.5 h-6 bg-zinc-300 relative flex items-center justify-center">
                            {isRunning && (
                              <div className="absolute w-2 h-2 rounded-full bg-[#432888] shadow-sm animate-ping" />
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Drop placeholder at end */}
                <div
                  onDragOver={(e) => handleDragOverCanvas(e, activeSteps.length)}
                  onDrop={(e) => handleDropOnCanvas(e, activeSteps.length)}
                  className="p-3 border-2 border-dashed border-zinc-300/80 hover:border-[#432888] rounded-xl text-center text-xs text-zinc-500 hover:text-[#432888] transition-colors cursor-pointer bg-white/40"
                  onClick={() => addBlockToCanvas(AVAILABLE_ACTIONS[0])}
                >
                  <Plus className="w-4 h-4 mx-auto mb-1 opacity-70" />
                  <span>Drag components here or click to append action</span>
                </div>
              </div>

              {/* Payload Inspector Drawer (Expandable) */}
              {showPayloadInspector && (
                <div className="mt-6 p-4 bg-zinc-950 text-emerald-400 font-mono text-xs rounded-xl border border-zinc-800 shadow-inner overflow-x-auto">
                  <div className="flex items-center justify-between text-zinc-400 mb-2 pb-2 border-b border-zinc-800">
                    <span className="text-[11px] font-bold text-zinc-300">
                      TRANSIT PAYLOAD (INSPECTING: {activeSelectedStep.title})
                    </span>
                    <span className="text-[10px] text-zinc-500">JSON Schema v2.4</span>
                  </div>
                  <pre className="text-[11px] leading-relaxed text-zinc-200">
                    {JSON.stringify(
                      {
                        event: activeSelectedStep.type === 'trigger' ? 'inbound_trigger_received' : 'action_dispatched',
                        timestamp: new Date().toISOString(),
                        sourceApp: activeSelectedStep.app,
                        stageIndex: activeSteps.findIndex((s) => s.instanceId === activeSelectedStep.instanceId) + 1,
                        leadData: {
                          contactName: 'James Whitfield',
                          business: 'Apex Logistics Ltd',
                          email: 'j.whitfield@apexlogistics.co.uk',
                          phone: '+44 7700 900123',
                          status: 'Pipeline Qualified',
                          assignedSpecialist: 'Isaac Mason',
                        },
                        automationEngine: {
                          serviceAgreement: 'Zero-Downtime Webhook Pipeline',
                          guarantee: 'Included in Isaac Mason setup package',
                        },
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              )}
            </div>

            {/* Live Terminal Execution Console */}
            <div className="bg-zinc-950 text-zinc-200 rounded-2xl p-4 sm:p-5 border border-zinc-800 shadow-md">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800 text-xs">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-purple-400" />
                  <span className="font-mono font-bold text-zinc-300">EXECUTION CONSOLE & EVENT STREAM</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">
                  {isSimulating ? 'STREAMING ACTIVE' : 'AWAITING RUN'}
                </span>
              </div>

              <div className="font-mono text-xs space-y-1.5 max-h-36 overflow-y-auto pr-2 text-zinc-300">
                {simulationLogs.length === 0 ? (
                  <p className="text-zinc-600 italic">
                    Press "Simulate Workflow" above to watch data stream across every connected application in real-time.
                  </p>
                ) : (
                  simulationLogs.map((log, i) => (
                    <div 
                      key={i} 
                      className={`leading-relaxed ${
                        log.includes('COMPLETE') 
                          ? 'text-emerald-400 font-bold' 
                          : log.includes('TRIGGER') 
                          ? 'text-amber-300' 
                          : 'text-zinc-300'
                      }`}
                    >
                      {log}
                    </div>
                  ))
                )}
                <div ref={logsEndRef} />
              </div>
            </div>

            {/* Bottom Conversion Banner for the Workspace */}
            <div className="p-5 bg-purple-50/70 border border-purple-200/90 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-zinc-950">
                  Want this exact pipeline configured for your existing tools?
                </h4>
                <p className="text-xs text-zinc-600 mt-0.5">
                  I connect your website forms, calendar, CRM, and invoicing into a robust zero-downtime system.
                </p>
              </div>
              <button
                onClick={() => {
                  const matched = activeSteps.length <= 4 ? 'essential' : 'business-flow';
                  onSelectPackageForOutreach(
                    matched,
                    `Pipeline: ${activeSteps.map((s) => s.title).join(' -> ')}`
                  );
                }}
                className="shrink-0 px-4 py-2.5 text-xs font-bold text-white bg-[#432888] hover:bg-[#382470] rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-2"
              >
                <span>Request Setup Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
