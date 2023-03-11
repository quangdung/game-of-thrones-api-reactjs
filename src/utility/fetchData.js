import { PAGINATION_LINK, PAGINATION_PAGE_SIZE } from "../constants";

function fetchData(url, setData, setPagination, page, pageSize = PAGINATION_PAGE_SIZE) {

    const queryString = page && pageSize ? `?page=${page}&pageSize=${pageSize}` : '';
    // console.log('fetchData:', url, 'page:',page,'pageSize:',pageSize, 'queryString:', queryString)

    fetch(`${url}${queryString}`)
        .then(response => {
            if (setPagination) {
                const link = response.headers.get('Link').split(',');
                const pagination = {};

                for (let linkIndex of PAGINATION_LINK) {
                    const index = link.findIndex(e => e.includes(linkIndex));
                    pagination[linkIndex] = index > -1 ?
                        link[index].split(';')[0].trim().replace(/(?:^<)|(?:>$)/g, '') : null;
                }
                setPagination(pagination);
            }

            return response.json()
        })
        .then(data => {
            if (setData) { setData(data) }
            else { return data };
        });
};

export default fetchData;