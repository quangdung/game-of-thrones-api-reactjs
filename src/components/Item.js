import { Table } from 'react-bootstrap';

const getResouceType = (url) => {
    const urlArray = url.split('/');
    const resourceType = urlArray[urlArray.length - 2];
    return resourceType.slice(0, -1).toUpperCase();
}

function Item(props) {
    const { item } = props;
    return (item && (
        <div>
            <h3>
                {getResouceType(item.url)}: {(item.name ? item.name : item.aliases)}
            </h3>
            <Table striped bordered hover>
                <tbody>
                    {item && Object.keys(item).map(key => (
                        <tr key={key}>
                            <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                            <td>{
                                Array.isArray(item[key])
                                    ? item[key].map((e, index) => (e + (index < item[key].length - 1 ? ', ' : '')))
                                    : item[key]
                            }</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    ))
}

export default Item;