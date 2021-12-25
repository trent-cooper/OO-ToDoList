const Todo = require('./todoLS');
const TodoList = require('./todolistLS');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('calling toArray returns an array of list items', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('calling first returns the first todo list item', () => {
    expect(list.first()).toEqual(todo1);
  });
  
  test('calling last returns the last todo list item', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('calling shift removes the first item in the list and returns it', () => {
    let test = list.shift();
    expect(list.first()).toEqual(todo2);
    expect(test).toEqual(todo1);
  });

  test('calling pop removes the last item in the list and returns it', () => {
    let test = list.pop();
    expect(list.toArray()).toEqual([todo1, todo2]);
    expect(test).toEqual(todo3);
  });

  test('calling isDone returns true if all items in list are done, false otherwise', () => {
    todo1.markDone();
    todo2.markDone();
    todo3.markDone();
    expect(list.isDone()).toBe(true);

    todo1.markUndone();
    expect(list.isDone()).toBe(false);
  });

  test('calling add with an object not of the Todo type throws a TypeError', () => {
    let obj = {};
    expect(() => TodoList.add(obj)).toThrow(TypeError);
    expect(() => TodoList.add(1)).toThrow(TypeError);
    expect(() => TodoList.add('test')).toThrow(TypeError);
  });

  test('calling itemAt should return item at that index. throws ReferenceError if invalid or no index given', () => {
    expect(list.itemAt(1)).toBe(todo2);
    expect(() => list.itemAt()).toThrow(ReferenceError);
    expect(() => list.itemAt(4)).toThrow(ReferenceError);
  });

  test('calling markDoneAt should mark object done at given index - throws ReferenceError if invalid index', () => {
    list.markDoneAt(0);
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(false);

    expect(() => list.markDoneAt(4)).toThrow(ReferenceError);
    expect(() => list.markDoneAt()).toThrow(ReferenceError);
  });

  test('calling markUndoneAt should mark object undone at given index - throws ReferenceError if invalid index', () => {
    list.markAllDone();
    
    list.markUndoneAt(0);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);

    expect(() => list.markDoneAt(4)).toThrow(ReferenceError);
    expect(() => list.markDoneAt()).toThrow(ReferenceError);
  });

  test('calling markAllDone should mark all objects done', () => {
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });

  test('calling removeAt with index removes and returns todo object - throws ReferenceError if invalid index', () => {
    let test = list.removeAt(0);
    expect(test).toEqual([todo1]);
    expect(list.toArray()).toEqual([todo2, todo3]);

    expect(() => list.removeAt(4)).toThrow(ReferenceError);
    expect(() => list.removeAt()).toThrow(ReferenceError);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);

    todo1.markDone();
    string = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);

    list.markAllDone();
    string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('forEach iterates over each item in list', () => {
    let arr = [];
    list.forEach(todo => arr.push(todo));
    expect(arr).toEqual([todo1, todo2, todo3]);
  });

  test('filter filters list and returns new TodoList object with filtered results', () => {
    list.markDoneAt(0);
    let filterList = list.filter(todo => todo.isDone());

    expect(filterList).not.toBe(list);
    expect(filterList instanceof TodoList).toBe(true);
    expect(filterList.toArray()).toEqual([todo1]);
  });
  
});