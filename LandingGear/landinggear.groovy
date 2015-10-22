// ----------------------------
// Help functions
// ----------------------------
def setTrace(t1, t2) {
    animations.replaceTrace(t1, t2);
    return t2;
}

def getOp(sId, name, pred) {
    try {
        def ops = statespace.opFromPredicate(sId, name, pred, 1)
        ops[0]
    } catch (Exception e) {
        null
    }
}

def trace1 = ["env_toggle_handle",
              "con_stimulate_general_valve",
              "env_close_switch",
              "evn_open_general_valve",
              "con_stimulate_open_door_valve",
              "env_open_valve_open_door",
              "env_start_open_door",
              "env_open_door",
              "con_stimulate_retract_gear_valve",
              "env_open_valve_retract_gear",
              "env_start_retracting",
              "env_retract_gear",
              "con_stop_stimulate_retract_gear_valve",
              "env_close_valve_retract_gear",
              "con_stop_stimulate_open_door_valve",
              "env_close_valve_open_door",
              "con_stimulate_close_door_valve",
              "env_open_valve_close_door",
              "env_start_close_door",
              "env_close_door",
              "con_stop_stimulate_close_door_valve",
              "env_close_valve_close_door",
              "con_stop_stimulate_general_valve",
              "evn_close_general_valve",
              "env_open_switch"]

// ----------------------------
// Animation starting
// ----------------------------

/*m = api.eventb_load(machine)
statespace = m as StateSpace
t = m as Trace
t = t.$setup_constants() // setup constants
t = t.$initialise_machine() // initialize machine
animations.addNewAnimation(t)

def th = Thread.start {

	trace1.each {
		def ot = t
		def op
		op = getOp(t.getCurrentState(),it,"TRUE=TRUE")
		while(op == null) {
			op = getOp(t.getCurrentState(),it,"TRUE=TRUE")
    	}
      	t = t.add(op.getId())
      	setTrace(ot,t);
		sleep 1000
	}

}*/