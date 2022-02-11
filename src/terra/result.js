export function success(data) {
  return {
    error: false,
    value: data,
    loading: false,
  };
}

export function loading(defaultValue = undefined) {
  return {
    error: false,
    value: defaultValue,
    loading: true,
  };
}

export function error(defaultValue = undefined) {
  return {
    error: true,
    value: defaultValue,
    loading: false,
  };
}
