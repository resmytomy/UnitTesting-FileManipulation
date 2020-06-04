jest.mock('fs');
const fs = require("fs");
const FileUtil = require('../service/fileutil')
const futil = new FileUtil();
const fileController = require('./file-editorController.js');
const controller = new fileController();
describe("Testing the controller for file manipulation", () => {

  it("should get the .npmrc content on clalling readfilecontroller", async () => {
    fs.readFile.mockImplementation((file, option, cb) => cb(null, "appdata={npm}"));
    futil.getFile = jest.fn();
    futil.getFile.mockReturnValue(Promise.resolve("appdata={npm}"))
    let req;
    let jsonRe;

    let res = {
      json(data) {
        this.jsonRe = data;
      }
    };
    await controller.readFileController(req, res);
    fs.readFile.mockClear();
    expect(res.jsonRe).toContain("appdata");



  });


  it("should retturn error if any  clalling readfilecontroller", async () => {
    fs.readFile.mockImplementation((file, option, cb) => cb(new Error("Error occured"), null));
    futil.getFile = jest.fn();
    futil.getFile.mockReturnValue(Promise.reject(new Error("Error occured")))
    let req;
    let jsonRe;

    let res = {
      send(data) {
   
        this.jsonRe=data;
   
       
      }
    };
    await controller.readFileController(req, res);
    fs.readFile.mockClear();
    expect(res.jsonRe instanceof Error);



  });


  it("should write the .npmrc content on clalling readfilecontroller", async () => {
    fs.writeFile.mockImplementation((file, option, cb) => cb(null, "appdata={npm}"));
    futil.write = jest.fn();
    futil.write.mockReturnValue(Promise.resolve("appdata={npm}"))

    let req = {
      body: {
        data: [{
          index: 0,
          name: "New",
          value: "${nn}"
        },
        {
          index: 1,
          name: "Old",
          value: "${OO}"
        }
        ]
      }
    }
    let jsonRe;

    let res = {
      json(data) {
        this.jsonRe = data;
      }
    };
    await controller.writeFileController(req, res);
    fs.writeFile.mockClear();
    expect(res.jsonRe).toContain("Old");

  });
  it("should return error  on clalling readfile cotroller if ther is nay ", async () => {
    fs.writeFile.mockImplementation((file, option, cb) => cb(new Error("Error occured")));
    futil.write = jest.fn();
    futil.write.mockReturnValue(Promise.reject(new Error("Error occured")))

    let req = {
      body: {
        data: [{
          index: 0,
          name: "New",
          value: "${nn}"
        },
        {
          index: 1,
          name: "Old",
          value: "${OO}"
        }
        ]
      }
    }
    let jsonRe;

    let res = {
      json(data) {
        this.jsonRe = data;
      }
    };
    await controller.writeFileController(req, res);
    fs.writeFile.mockClear();
    expect(res.jsonRe instanceof Error);

  });


})