import {helloWorld} from '../src';

test('Hello World should return :', () => {
    expect(helloWorld()).toBe('Hello World!');
});
