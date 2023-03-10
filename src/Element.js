function Element(props) {
    const { elements, setItem } = props;

    const onElementClick = (elementUrl) => {
        console.log('element url selected:', elementUrl);
        fetch(elementUrl)
            .then(response => response.json())
            .then(data => {
                console.log('item:', data.name);
                setItem(data);
            });
    }

    return (
        <div>
            {elements && (
                <ul>
                    {elements.map(item => (
                        <li
                            key={item.url}
                            onClick={() => onElementClick(item.url)}
                        >{item.name}</li>
                    ))}
                </ul>
            )
            }
        </div>
    )
}

export default Element;