export function millisecondsToExtendedCron(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);

  if (seconds < 60) {
    // Schedule in seconds
    return `*/${seconds === 0 ? 1 : seconds} * * * * *`;
  } else if (seconds < 3600) {
    // Schedule in minutes
    const minutes = Math.floor(seconds / 60);
    return `0 */${minutes} * * * *`;
  } else {
    // Schedule in hours
    const hours = Math.floor(seconds / 3600);
    return `0 0 */${hours} * * *`;
  }
}
