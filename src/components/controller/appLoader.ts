import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '183c2b7283dc4ed7bd56affe969ce881', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
