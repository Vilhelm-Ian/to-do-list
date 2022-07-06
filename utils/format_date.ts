export function format_date(date: string) {
  let arr = date.split("/");
  if (arr[1].length === 1) arr[1] = `0${arr[1]}`;
  if (arr[0].length === 1) arr[0] = `0${arr[0]}`;
  return `${arr[2]}-${arr[0]}-${arr[1]}`;
}

export function format_time(date: Date) {
  let hours = String(date.getHours())
  let minutes = String(date.getMinutes())
  if(hours.length === 1) hours = `0${hours}`
  if(minutes.length === 1) minutes  = `0${minutes}`
  return `${hours}:${minutes}`  
}
