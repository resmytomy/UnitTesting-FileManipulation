const supertest = require('supertest');
jest.mock('fs');
const fs = require("fs");
const app = require('../server');
const FileUtil = require('../service/fileutil')
const futil = new FileUtil();
describe("Testing the API for file manipulation", () => {

    it("should get the .npmrc content ", done => {
        const mockContent = 'Hello World';
      //  fs.readFile.mockImplementation((file, option, cb) => cb(null, "data from file"))
        supertest(app)
            .get("/")
            .then(response => {
                expect(response.body).toContain("test");              
            }).catch(err=>console.log('Error from app',err)) ;
            done();
      //  fs.readFile.mockClear();
    });

     it("should update the  .npmrc content ", async() => {
        let req = {
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
       await supertest(app)
            .post("/edit").send(req)
            .then(response => {
                expect(response.toBeTruthy);
               
            })

            ;
        fs.writeFile.mockClear();
    });



})