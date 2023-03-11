function onElementClick(elementUrl, setDataSelected) {
    fetch(elementUrl)
        .then(response => response.json())
        .then(data => setDataSelected(data));
}

export default onElementClick;