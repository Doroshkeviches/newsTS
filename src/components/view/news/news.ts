import './news.css';

class News {
    draw(data: any[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp  = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true); 

            if (idx % 2) ((newsClone as HTMLElement).querySelector('.news__item')as HTMLElement).classList.add('alt');

            ((newsClone as HTMLElement).querySelector('.news__meta-photo')as HTMLElement).style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.jpg'
            })`;
            ((newsClone as HTMLElement).querySelector('.news__meta-author')as HTMLElement).textContent = item.author || item.source.name;
            ((newsClone as HTMLElement).querySelector('.news__meta-date')as HTMLElement).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            ((newsClone as HTMLElement).querySelector('.news__description-title')as HTMLElement).textContent = item.title;
           ( (newsClone as HTMLElement).querySelector('.news__description-source')as HTMLElement).textContent = item.source.name;
            ((newsClone as HTMLElement).querySelector('.news__description-content')as HTMLElement).textContent = item.description;
           ( (newsClone as HTMLElement).querySelector('.news__read-more a')as HTMLElement).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        document.querySelector('.news')!.innerHTML = '';
        document.querySelector('.news')!.appendChild(fragment);
    }
}

export default News;
