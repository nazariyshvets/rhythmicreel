function numberToMinutesString(number: number) {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number % 60);

  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toString().padStart(2, "0");

  return `${minutesStr}:${secondsStr}`;
}

export default numberToMinutesString;
