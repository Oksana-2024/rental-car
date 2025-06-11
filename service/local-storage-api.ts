export function setDataToLocalStorage<T = unknown>(key: string, value: T) {
  try {
    const normolizedState = JSON.stringify(value);
    localStorage.setItem(key, normolizedState);
  } catch (error) {
    console.log(error);
  }
}

export function getDataLocalStorage<R = unknown>(key: string): R | undefined {
  try {
    const normolizedState = localStorage.getItem(key);
    return normolizedState === null ? undefined : JSON.parse(normolizedState);
  } catch (error) {
    console.log(error);
  }
}

export function removeDataLocalStorage(key: string) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
}
