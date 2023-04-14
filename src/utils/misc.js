function randomString(length, chars) {
  var result = "";
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

export function basicKey(length) {
  var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return randomString(length, chars);
}

export function getRandomInt(min, max, step) {
  return Math.floor((Math.random() * (max - min)) / step) * step + min;
}