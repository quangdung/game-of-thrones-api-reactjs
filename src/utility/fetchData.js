function fetchData(url, setData) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('data keys:', Object.keys(data));
            if (setData) { setData(data) }
            else { return data };
        });
};

export default fetchData;