const queue = (() => {
  const storage = []; // this could be local storage / indexed db for offline analytics
  const push = item => storage.push(item);
  const remove = () => storage.shift();
  const removeAll = () => {
    storage.length = 0;
    return true;
  };
  const length = () => storage.length;
  const getAll = () => storage;
  return {
    push,
    remove,
    length,
    getAll,
    removeAll
  };
})();

export default queue;
