function Item(props) {
    const { item } = props;
    return (
        <div>
            {item && <p>{item.name}</p>}
            {item && (
                <ul>
                    {Object.keys(item).map(key => (
                        <li key={key}>{key}: {item[key]}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Item;