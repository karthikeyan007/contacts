var database = require('../../libs/registration.js');

describe("multiplication", function () {
  it("should multiply 2 and 3", function () {
    var product = database.multiply(2, 3);
    expect(product).toBe(6);
  });
});  