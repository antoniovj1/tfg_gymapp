export function secondsToHms(d) {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);
  return `${(h > 0 ? `${h}:${m < 10 ? "0" : ""}` : "") + m}:${s < 10 ? "0" : ""}${s}`;
}

export function dateFormat(dat) {
  const d = new Date(dat);
  const date = d.getDate();
  let month = d.getMonth();
  month += 1;
  const year = d.getFullYear();
  const hour = d.getHours();
  const minute = d.getMinutes();
  return `${month}/${date}/${year} - ${hour}:${minute}`;
}
