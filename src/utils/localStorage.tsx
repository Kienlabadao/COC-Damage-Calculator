export function setItem(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(error);
  }
}

export function getItem(key: string) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.warn(error);
  }
}

export function clearItem(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(error);
  }
}

export function clearAll() {
  window.localStorage.clear();
}
