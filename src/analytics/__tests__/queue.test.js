import queue from '../queue';

describe('analytics queue test cases', () => {
  afterEach(() => {
    queue.removeAll();
  });

  it('should support basic functionalities of a queue', () => {
    expect(queue.push).toBeDefined();
    expect(queue.remove).toBeDefined();
    expect(queue.length).toBeDefined();
    expect(queue.getAll).toBeDefined();
  });

  it('should support push operation', () => {
    expect(queue.getAll()).toEqual([]);
    queue.push('item 1');
    queue.push('item 2');
    expect(queue.getAll()).toEqual(['item 1', 'item 2']);
  });

  it('should allow to check length of the queue', () => {
    queue.push('item 1');
    queue.push('item 2');
    expect(queue.length()).toEqual(2);
  });

  it('should support remove in FIFO manner', () => {
    queue.push('item 1');
    queue.push('item 2');
    queue.remove();
    expect(queue.getAll()).toEqual(['item 2']);
  });
});
