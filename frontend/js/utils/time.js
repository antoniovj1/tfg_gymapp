import { format } from 'date-fns';

export function secondsToHms(d) {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);
  return `${(h > 0 ? `${h}:${m < 10 ? '0' : ''}` : '') + m}:${s < 10 ? '0' : ''}${s}`;
}

export function dateFormat(date) {
  return format(new Date(date), 'dd/MM/yyyy');
}
