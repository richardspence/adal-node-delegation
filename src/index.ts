

import * as https from 'https';
import * as querystring from 'querystring';
import * as request from 'request';
import * as es6 from 'es6-promise';

export interface ITokenProviderOptions {
    clientId: string;
    clientSecret: string;
    tenant: string;
}

export class TokenProvider {

    constructor(private options: ITokenProviderOptions) {
    }

    public acquireToken(resource, bearerToken): es6.Promise<{}> {

        return new es6.Promise((resolve, reject) => {
            var form = {
                resource,
                client_id: this.options.clientId,
                client_secret: this.options.clientSecret,
                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                assertion: bearerToken,
                requested_token_use: 'on_behalf_of',
                scope: 'openid',
            };

            var options = {
                url: `https://login.windows.net/${this.options.tenant}/oauth2/token`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'adal-node-delegation'
                },
                form,
            };

            ;

            request.post(options, function (err, httpResponse, body) {
                if (err) {
                    console.error('acquire token failed:', err);
                    reject(err);
                }
                resolve(JSON.parse(body));
            });
        });
    }
}