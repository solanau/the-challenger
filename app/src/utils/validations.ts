export function validateEmptyField(value) {
    let error;
    if (!value) {
        error = 'Required';
    } else if (value.replaceAll(" ", "").length == 0) {
        error = 'Enter a value';
    }
    return error;
}