bms.registerMethod("testMethod", { arg1, arg2 ->
  return -1;
});

bms.registerMethod("random",
{ steps ->

  def trace = bms.getTrace();
  1.upto(steps, {
    trace = trace.anyEvent();
  });

  bms.getAnimationSelector().traceChange(trace);

});
