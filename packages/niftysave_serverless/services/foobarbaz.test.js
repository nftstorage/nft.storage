const foobarbaz = require('./foobarbaz')

test('example test', () => {
  foobarbaz.jestTest().then(d => expect(d).toBe(3))
  foobarbaz.jestTest().then(d => expect(d).toEqual(3))
})
