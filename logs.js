let logs = [];

export function saveLog(data) {
  logs.push(data);

  // sirf last 300 request rakhenge
  if (logs.length > 300) {
    logs.shift();
  }
}

export function getLogs() {
  return logs;
}
