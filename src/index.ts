import {IConfig, ISink, ISource} from "./interfaces/config";
import MockServer from "./core/server";
import { Mock as MockSchema, MockMetadata as MockMetadataSchema, Response as MockResponseSchema } from "./types/mock";

export {
    MockServer,
    IConfig, ISink, ISource,
    MockSchema,
    MockMetadataSchema,
    MockResponseSchema,
};
