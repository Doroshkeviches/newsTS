import { FetchingData } from "./controller";

class Loader {
    constructor(public baseLink: string, public options: {apiKey: string}) {
        this.baseLink = baseLink; //можно удалить (ден сказал)
        this.options= options;    //можно удалить 
    }

    public getResp(
        { endpoint, options = {} },
        callback = (data: FetchingData) => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    public errorHandler(res: {
        json(): any; ok: any; status: number; statusText: string | undefined; 
}) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    public makeUrl(options: {}, endpoint: {}) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    public load(method: string, endpoint: {}, callback: { (data: FetchingData): void; (arg0: any): any; }, options  = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => {
                callback(data)
            })
            .catch((err) => console.error(err));
    }
}

export default Loader;
