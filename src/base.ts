import { get, post } from "request";
import { STAGING_URL, PRODUCTION_URL } from "./constants";
import { FlutterwaveVASOptions } from "./types";

export default class FlutterwaveVASBase {
    readonly merchantKey: string;
    private endpoint: string;

    constructor(merchangeKey: string, options: FlutterwaveVASOptions) {
        this.merchantKey = merchangeKey;
        this.endpoint = options.endpoint
            ? options.endpoint
            : options.sandbox ? STAGING_URL : PRODUCTION_URL;
    }

    buildEndpoint(path: string) {
        return `${this.endpoint}${path}`;
    }

    makeToken() {
        const token = Buffer.from(this.merchantKey).toString('base64');
        return `Basic ${token}`;
    }

    post<T>(uri: string, payload: any): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            post(uri, {
                json: true,
                body: payload,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.makeToken(),
                }
            }, (error, response, body) => {
                if (error) reject(error);
                if (response.statusCode >= 400) reject(body);
                if (body && body.status === 'error') reject(body);

                resolve(body);
            });
        });
    }

    get<T>(uri: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            get(uri, {
                json: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.makeToken(),
                }
            }, (error, response, body) => {
                if (error) reject(error);
                if (response.statusCode >= 400) reject(body);
                if (body && body.status === 'error') reject(body);

                resolve(body);
            });
        });
    }
}