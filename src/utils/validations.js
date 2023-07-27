export function validateFields(type, value) {
  let errorMsg = "";
  switch (type) {
    case "job_title":
    case "company_name":
    case "industry":
      errorMsg =
        value.length === 0
          ? "This is a mandatory field and value cannot be empty"
          : "";
      break;
    case "experience_min":
    case "experience_max":
    case "salary_min":
    case "salary_max":
    case "total_employee":
      errorMsg = typeof value !== "number" ? "Only Number allowed" : "";
      break;

    default:
      break;
  }
  return errorMsg;
}

export function checkIsFormValid(formData) {
  let formFields = Object.entries(formData);
  let isFormInvalid = formFields.some((field) => {
    return field[1]?.error?.length !== 0;
  });
  return !isFormInvalid;
}
