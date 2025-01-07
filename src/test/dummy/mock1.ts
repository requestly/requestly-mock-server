import { RequestMethod } from "../../types";
import { Mock } from "../../types/mock";

export const dummyMock1: Mock = {
  id: "1",
  name: "mock1",
  desc: "Mock 1",
  ownerId: "1",
  method: RequestMethod.POST,
  endpoint: "abcd/:userId/:name",
  responses: [
    {
      id: "1",
      desc: "Mock 1 Response 1",
      latency: 1000,
      statusCode: 201,
      headers: {
        foo: "bar",
        "content-type": "application/json",
      },
      body: '{"Hello":"There","mockId":"1", "statusCode": {{ statusCode }}, "method": "{{ method }}", "urlParams": "{{ urlParam \'userId\' }}", "header": "{{ header \'userid\' \'test\' }}"  }}',
    },
  ],
};

export const dummyMock2: Mock = {
  id: "2",
  name: "mock2",
  desc: "Mock 2",
  ownerId: "2",
  method: RequestMethod.GET,
  endpoint: "users2",
  responses: [
    {
      id: "1",
      desc: "Mock 2 Response 1",
      latency: 0,
      statusCode: 200,
      headers: {
        foo: "bar",
        "content-type": "application/json",
      },
      body: '{"Hello":"There","mockId":"2"}',
    },
  ],
};

export const dummyMock3: Mock = {
  id: "3",
  name: "mock3",
  desc: "Mock 3 : Password protected",
  ownerId: "3",
  method: RequestMethod.GET,
  endpoint: "users3",
  password: "1234",
  responses: [
    {
      id: "1",
      desc: "Mock 3 Response 1",
      latency: 0,
      statusCode: 200,
      headers: {
        foo: "bar",
        "content-type": "application/json",
      },
      body: '{"Hello":"There","mockId":"3"}',
    },
  ],
};

export const dummyMock4: Mock = {
  id: "4",
  name: "mock4",
  desc: "Mock 4 : Password protected",
  ownerId: "4",
  method: RequestMethod.GET,
  endpoint: "users4/:id/:name",
  responses: [
    {
      id: "1",
      desc: "Mock 4 Response 1",
      latency: 0,
      statusCode: 200,
      headers: {
        "x-foo": "bar",
        "content-type": "text/plain",
      },
      body: `the id is {{urlParams}} {{urlParams id}} no way to add space right now so {{urlParams 'name'}} . the url is {{url}} . not passing param to url param {{urlParam}}. Content type is  {{header Content-Type}}. giberish ahead: {{random values}} {{}} {{color: "something"}} {{url 'http://localhost:3000'}} {{urlParam 'id'}} {{ color: "red", display: flex}}`,
    },
  ],
};

export const getSelectorMap = (): any => {
  let selectorMap: any = {};
  selectorMap[dummyMock1.id] = {
    method: dummyMock1.method,
    endpoint: dummyMock1.endpoint,
  };

  selectorMap[dummyMock2.id] = {
    method: dummyMock2.method,
    endpoint: dummyMock2.endpoint,
  };

  selectorMap[dummyMock3.id] = {
    method: dummyMock3.method,
    endpoint: dummyMock3.endpoint,
  };

  selectorMap[dummyMock4.id] = {
    method: dummyMock4.method,
    endpoint: dummyMock4.endpoint,
  };

  return selectorMap;
};
