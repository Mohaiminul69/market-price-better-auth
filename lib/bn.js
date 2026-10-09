const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBn(value) {
  return String(value).replace(/[0-9]/g, (d) => BN_DIGITS[d]);
}

export function formatPrice(n) {
  return toBn(Math.round(n).toLocaleString("en-IN"));
}

export function formatPct(n) {
  return toBn(Math.abs(n).toFixed(1)) + "%";
}

const UNITS = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export function unitShort(unit) {
  return UNITS[unit] ?? unit;
}

export function unitLabel(unit) {
  return `প্রতি ${unitShort(unit)}`;
}

export function bnDate(date = new Date()) {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);
}
