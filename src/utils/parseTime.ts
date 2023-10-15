function parseTime(decimalSeconds: string, includeMilliseconds = true) {
  const ds = parseFloat(decimalSeconds);

  if (!ds) {
    return includeMilliseconds ? ["00", "00", "00", "000"] : ["00", "00", "00"];
  }

  const hours = Math.floor(ds / 3600);
  const minutes = Math.floor((ds % 3600) / 60);
  const seconds = Math.floor(ds % 60);
  const milliseconds = Math.floor(ds * 1000) % 1000;

  if (includeMilliseconds) {
    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
      milliseconds.toString().padStart(3, "0"),
    ];
  } else {
    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ];
  }
}

export default parseTime;
