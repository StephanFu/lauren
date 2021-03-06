var run = require("../../src/lang/ben/interpreter.js");

function pp(str) {
  console.log(JSON.stringify(str, null, 2));
}

describe("interpreter", function() {
  describe("env", function() {
    it("should be able to interpret if no env passed in", function() {
      expect(run("1")).toEqual(1);
    });
  });

  describe("literals", function() {
    it("should be able to produce a number", function() {
      expect(run("1")).toEqual(1);
    });

    it("should be able to produce a string", function() {
      expect(run('"my name is ben"')).toEqual("my name is ben");
    });
  });

  describe("fn invocation", function() {
    describe("library fns", function() {
      it("should be able to call a library fn with no args", function() {
        expect(run('(print)')).toEqual("\n");
      });

      it("should be able to call a library fn with some args", function() {
        expect(run('(add 1 2 3)')).toEqual(6);
      });
    });

    describe("lambdas", function() {
      it("should be able to invoke a lambda on no args", function() {
        expect(run('({ 1 })')).toEqual(1);
      });

      it("should be able to invoke a lambda on several args used in the lambda", function() {
        expect(run('({?a ?b (add a b)} 1 2)')).toEqual(3);
      });
    });
  });

  describe("do blocks", function() {
    it("should return last expression in a do block", function() {
      expect(run("1\n2\n3")).toEqual(3);
    });
  });
});
