import AppLoader from './appLoader';
export interface FetchingData {
    status: string,
    totalResults: number,
    articles?: Object[],
    sources?: Object[],
}


class AppController extends AppLoader {
    getSources(callback: ((data: FetchingData) => void) | undefined) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: { target: any; currentTarget: any; }, callback: ((data: FetchingData) => void) | undefined) {
        let target = e.target;
        const newsContainer = e.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode;
        }
    }
}

export default AppController;
