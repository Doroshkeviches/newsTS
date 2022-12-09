import './sources.css';

class Sources {
    draw(data: any[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true);

            ((sourceClone as HTMLElement).querySelector('.source__item-name') as HTMLElement ).textContent = item.name;
            ((sourceClone as HTMLElement).querySelector('.source__item')as HTMLElement ).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        (document.querySelector('.sources')as HTMLElement ).append(fragment);
    }
}

export default Sources;
