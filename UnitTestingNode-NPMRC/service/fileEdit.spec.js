const supertest = require('supertest');
jest.mock('fs');
const fs = require("fs");

// const FileUtil = require('../service/fileutil')

const FileUtil = require('../service/fileutil');
const futil = new FileUtil();
describe("Testing the API for file manipulation", () => {

    it("should return filecontent of   .npmrc  ", done => {
        fs.readFile.mockImplementation((file, option, cb) => cb(null, "data from file"))
        futil.getFile('npmrc').then(res => expect(res).toContain("data"))
            .catch(err => expect(err.message).toBe("Error occured"));
        done();


    });


    it("should return error  the .npmrc content ", done => {
        fs.readFile.mockImplementation((file, option, cb) => cb(new Error("Error occured"), null))
        futil.getFile('npmrc').catch(err => expect(err.message).toBe("Error occured"));
        done();


    });

   
    it("should update the  .npmrc content ", done => {
        let req = {body :{
            'data': [{
                index: 0,
                name: "Hellow New",
                value: "${appdata}"
            },
            {
                index: 1,
                name: "test123",
                value: "${appdata}"
            }]
        }
        }
        const mockContent = 'dta';
        fs.writeFile.mockImplementation((file, option, cb) => cb(null, mockContent));
        futil.write('npmrc', req).then(res => expect(res).toContain("Hellow"));
        done();
    });

        it("should return error if any  in write file", done => {
            let req = {body :{
                'data': [{
                    index: 0,
                    name: "Hellow New",
                    value: "${appdata}"
                },
                {
                    index: 1,
                    name: "test123",
                    value: "${appdata}"
                }]
            }
            }
            const mockContent = 'dta';
            fs.writeFile.mockImplementation((file, option, cb) => cb(new Error("Error occured"), null));
            futil.write('npmrc',req).catch(err => expect(err.message).toBe("Error occured"));
            done();
        });

});
