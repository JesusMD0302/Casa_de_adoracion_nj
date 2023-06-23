export function ValidateDate(dateToValidate: string | number | Date) {
  if (new Date(dateToValidate).toString() !== "Invalid Date") {
    const date = dateToValidate;
    return (dateToValidate = new Date(date));
  }

  return dateToValidate;
}
