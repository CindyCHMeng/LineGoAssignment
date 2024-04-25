
export async function getFlightData() {
  const res = await fetch('https://tdx.transportdata.tw/api/basic/v2/Air/FIDS/Airport/Departure/TPE?$orderby=ScheduleDepartureTime&$format=JSON');
  const data = await res.json();
  return data;
}