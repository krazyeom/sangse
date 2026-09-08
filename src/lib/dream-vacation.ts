export function isDreamVacationPeriod(date = new Date()): boolean {
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const month = kst.getUTCMonth() + 1;
  const day = kst.getUTCDate();

  return month === 9 && day >= 7 && day <= 13;
}

export function isDreamVacationRankExcluded(siteName: string, date = new Date()): boolean {
  return siteName.includes('드림상품권') && isDreamVacationPeriod(date);
}

export function shouldShowDreamVacationRow(siteName: string, date = new Date()): boolean {
  return siteName.includes('드림상품권') && isDreamVacationPeriod(date);
}
