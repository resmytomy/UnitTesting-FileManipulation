const supertest = require('supertest');
jest.mock('fs');
const fs = require("fs");
const app = require('../server');
describe("Testing the API for file manipulation", () => {

    it("should get the .npmrc content ", done => {
        supertest(app)
            .get("/")
            .then(response => {
                console.log(response)
                expect(response.body).toContain("456789");              
            })
            done();
    });

     it("should update the  .npmrc content ", done => {
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
        supertest(app)
            .post("/edit").send(req)
            .then(response => {
                expect(response.toBeTruthy);
                expect(response.body).toContain("test123");    
               
            })
            done();
       
    });



})