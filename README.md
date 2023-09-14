# requestly-mock-server

This Repo contains the core express server [@requestly/mock-server](https://www.npmjs.com/package/@requestly/mock-server) package which powers Requestly's Cloud Mock Server. 

## Use with firebase-functions

### Install
``` sh
npm i @requestly/mock-server
```

### Setup
``` javascript
import * as functions from 'firebase-functions';
import { MockServer } from '@requestly/mock-server';
import firebaseConfigFetcher from '../firebaseConfigFetcher';

const startMockServer = () => {
  const expressApp = new MockServer(3000, firebaseConfigFetcher, '/api/mockv2').app;

  return functions.runWith({ minInstances: isProdEnv() ? 1 : 0 }).https.onRequest(expressApp);
};

export const handleMockRequest = startMockServer();
```

``` javascript
class FirebaseConfigFetcher implements IConfigFetcher {
    getMockSelectorMap = (kwargs?: any) => {
        /**
        * Fetch and return mockSelectorMap from firestore
        * {
        *      mockId: {
        *          route: "",
        *          method: "",
        *      }
        * }
        */
    };
    
    getMock = (id: string, kwargs?: any) => {
        /**
        * Fetch mock details from firestore
        */
    }
}

const firebaseConfigFetcher = new FirebaseConfigFetcher();
export default firebaseConfigFetcher;
```



## Requestly Cloud Mock Server Architechture
![image](https://github.com/requestly/requestly-mock-server/assets/16779465/277fbe21-45ad-45d2-ab65-64ea362ce17a)

**STEPS**
1. Request coming from GET `https://username.requestly.dev/users`
2. Firebase Function passes the request to @requestly/mock-server
3. @requestly/mock-server - MockSelector
   a. Fetches all the available mocks using `IConfigFetcher.getMockSelectorMap()` (Firestore in case of Requestly)
   b. Select mock if any endpoint+method matches the incoming request (GET /users)
   c. Fetch Mock using `IConfigFetcher.getMock(mockId)` and pass it to MockProcessor
4. @requestly/mock-server - MockProcessor
   a. Process Mock - Response Rendering
   b. Return Response
