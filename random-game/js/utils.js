export const shuffleArray = (arr) => {
  let array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export const LOCAL_STORAGE_PREFIX = '26b05b397f0748468a4';

export const getLocalStorageKeys = () => {
  let keysAll = Object.keys(localStorage);
  let keysMyLocalStorage = [];
  for (let i = 0; i < keysAll.length; i++) {
    if (keysAll[i].startsWith('26b05b397f0748468a4')) {
      keysMyLocalStorage.push(keysAll[i]);
    }
  }
  return keysMyLocalStorage.sort().reverse();
}