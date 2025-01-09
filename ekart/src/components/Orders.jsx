import useHttp from "../hooks/useHttp";
import Header from "./Header";
import { Table } from "@mui/material";

const requestConfig = {};

function Orders() {
    const userId = JSON.parse(sessionStorage.getItem('accountDetails'))['id']

    const {
        data: loadedOrders,
        isLoading,
        error,
    } = useHttp(`http://localhost:3000/previousOrders/${userId}`, requestConfig, []);
    console.log(loadedOrders)
    return (
        <>
            <Header />
            <p className="page-header">
                Orders page
            </p>
            <Table className="table table-striped">
                <thead>
                    <tr>
                        <th>Item name</th>
                        <th>Quantity</th>
                        <th>Order Price</th>
                    </tr>
                </thead>
                <tbody>
                    {loadedOrders.map((order) => (
                        order['items'].map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                </tr>
                            )
                        }
                        )
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default Orders