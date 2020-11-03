import { FilterExpensePipe } from './filter-expense.pipe';

describe('FilterExpensePipe', () => {
  it('create an instance', () => {
    const pipe = new FilterExpensePipe();
    expect(pipe).toBeTruthy();
  });
});
