export declare let esign: (apiKey: string, call: string, data: any, sandbox: boolean) => Promise<{
    message: string;
    call: string;
} | {
    message: string;
    call?: undefined;
} | undefined>;
