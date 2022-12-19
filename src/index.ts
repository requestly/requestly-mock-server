import IConfigFetcher from "./interfaces/configFetcherInterface";
import { setupMockServer, startMockServer } from "./main";
import { Mock as MockSchema, MockMetadata as MockMetadataSchema, Response as MockResponseSchema, MockType as MockType } from "./types/mock";

export {
    startMockServer,
    setupMockServer,
    IConfigFetcher,
    MockSchema,
    MockMetadataSchema,
    MockResponseSchema,
    MockType
};
