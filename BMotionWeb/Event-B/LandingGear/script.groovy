def replayTrace = [
  [name: "begin_flying"],
  [name: "toggle_handle_up"],
  [name: "con_stimulate_general_valve"],
  [name: "env_close_analogical_switch"],
  [name: "evn_open_general_valve"],
  [name: "con_stimulate_open_door_valve"],
  [name: "open_valve_door_open"],
  [name: "env_start_open_door", pred: "gr=front"],
  [name: "env_open_door_skip", pred: "gr=front"],
  [name: "env_start_open_door", pred: "gr=right"],
  [name: "env_open_door_skip", pred: "gr=right"],
  [name: "env_start_open_door", pred: "gr=left"],
  [name: "env_open_door_last", pred: "gr=left"],
  [name: "con_stimulate_retract_gear_valve"],
  [name: "open_valve_retract_gear"],
  [name: "env_start_retracting_first", pred: "gr=front"],
  [name: "env_retract_gear_skip", pred: "gr=front"],
  [name: "env_start_retracting_first", pred: "gr=right"],
  [name: "env_retract_gear_skip", pred: "gr=right"],
  [name: "env_start_retracting_first", pred: "gr=left"],
  [name: "env_retract_gear_last", pred: "gr=left"],
  [name: "con_stop_stimulate_retract_gear_valve"],
  [name: "close_valve_retract_gear"],
  [name: "con_stop_stimulate_open_door_valve"],
  [name: "close_valve_door_open"],
  [name: "con_stimulate_close_door_valve"],
  [name: "open_valve_door_close"],
  [name: "env_start_close_door", pred: "gr=front"],
  [name: "env_close_door_skip", pred: "gr=front"],
  [name: "env_start_close_door", pred: "gr=right"],
  [name: "env_close_door_skip", pred: "gr=right"],
  [name: "env_start_close_door", pred: "gr=left"],
  [name: "env_close_door", pred: "gr=left"],
  [name: "con_stop_stimulate_close_door_valve"],
  [name: "close_valve_door_close"],
  [name: "con_stop_stimulate_general_valve"],
  [name: "evn_close_general_valve"],
  [name: "env_open_analogical_switch"]
]

bms.registerMethod("replay", {

  def animationSelector = bms.getAnimationSelector()
  def currentTrace = bms.getTrace()
  def trace = currentTrace

  // Go back to root state
  while(trace.canGoBack()) {
    trace = trace.back()
  }
  animationSelector.traceChange(trace)
  trace = trace.anyEvent() // setup constants
  trace = trace.anyEvent() // initialize machine
  animationSelector.traceChange(trace)

  sleep 1000

  // Replay extension and retraction sequence
  Thread.start {

  	replayTrace.each {
      trace = trace.execute(it.name, it.pred ?: "TRUE=TRUE");
      animationSelector.traceChange(trace)
  		sleep 1000
  	}

  }

});
