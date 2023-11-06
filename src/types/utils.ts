// ref: https://stackoverflow.com/a/61132308/10473181
export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;