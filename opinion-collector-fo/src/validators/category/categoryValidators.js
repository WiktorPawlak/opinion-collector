export function validateCategoryName(categoryName) {
  const re = new RegExp(
    '^[A-Z]+[a-zA-Z]*$'
  );

  return re.test(categoryName);
}
