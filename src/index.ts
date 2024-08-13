import IConfigFetcher from "./interfaces/configFetcherInterface";
import IlogSink from "./interfaces/logSinkInterface";
import MockServer from "./core/server";
import { Mock as MockSchema, MockMetadata as MockMetadataSchema, Response as MockResponseSchema } from "./types/mock";
import {Log as MockLog} from "./types";
export {
    MockServer,
    IConfigFetcher,
    IlogSink,
    MockSchema,
    MockMetadataSchema,
    MockResponseSchema,
    MockLog,
};
