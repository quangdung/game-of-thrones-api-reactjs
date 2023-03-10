import "../styles/style.css";

function Item(props) {
    const { item } = props;
    return (
        <div className="container">
            {item && <h3>{item.name ? item.name : item.aliases}</h3>}
            <div className="json-display">
                {item && Object.keys(item).map(key => (
                    <div key={key} className="json-row">
                        <div className="json-key">{key}:</div>
                        <div className="json-value">{item[key]}</div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Item;