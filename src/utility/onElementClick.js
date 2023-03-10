function onElementClick(elementUrl, setDataSelected) {
    console.log('element url selected:', elementUrl);
    fetch(elementUrl)
        .then(response => response.json())
        .then(data => {
            console.log('item:', data.name);
            setDataSelected(data);
        });
}

export default onElementClick;