export function validateTitle(title) {
  const re = new RegExp(
    '^[A-Z]+[a-zA-Z]*$'
  );

  return re.test(title);
}

export function validateOrigin(origin) {
  return origin;
}

export function validateEan(ean) {
  const re = new RegExp(
    '^[0-9]+$'
  );
  return re.test(ean);
}

export function validateNull(obj) {
  return obj;
}
