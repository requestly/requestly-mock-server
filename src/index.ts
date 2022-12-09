import express from "express";
import { handleMockEndpoint } from "./core";
import MockSelector from "./core/mockSelector";
import storageService from "./services/storageService";
import { MockServerResponse, Mode, RequestMethod } from "./types";

const app = express();
const port = 3000;

storageService.setMode(Mode.FIREBASE);

// app.all('/', (req, res) => {
//     console.log(storageService.mode);
//     console.log(storageService.getMockSelectorMap());
//     console.log(MockSelector.selectMock("users", RequestMethod.GET))
//     console.log(MockSelector.selectMock("users2", RequestMethod.GET))
//     console.log(MockSelector.selectMock("users", RequestMethod.POST))
//     res.send("Hello World!!!");
// })

app.all(/\/(.+)/, async (req, res) => {
    console.log(req.path);
    const mockResponse: MockServerResponse = await handleMockEndpoint(req);
    console.debug("[Debug] Final Mock Response", mockResponse);
    return res.status(mockResponse.statusCode).set(mockResponse.headers).end(mockResponse.body);
});
  

app.listen(port, () => {
    console.log(`Mock Server Listening on port ${port}`);
})
