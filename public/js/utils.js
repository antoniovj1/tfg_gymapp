export function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);
  return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
}

export function dateFormat(dat) {
  var d = new Date(dat);
  var date = d.getDate();
  var month = d.getMonth();
  month++;
  var year = d.getFullYear();
  var hour = d.getHours();
  var minute = d.getMinutes();
  return(month + "/" + date + "/" + year + " - " + hour + ":" + minute);
}
