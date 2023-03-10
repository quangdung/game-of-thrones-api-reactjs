import onElementClick from "../utility/onElementClick";

function Element(props) {
    const { elements, setDataSelected } = props;

    return (
        <div>
            {elements && (
                <ul>
                    {elements.map(item => (
                        <li
                            key={item.url}
                            onClick={() => onElementClick(item.url, setDataSelected)}
                        >{item.name ? item.name : `${item.aliases} (alias)`}</li>
                    ))}
                </ul>
            )
            }
        </div>
    )
}

export default Element;