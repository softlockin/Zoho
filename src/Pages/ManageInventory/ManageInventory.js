import React, {useEffect, useState} from 'react';
import {Container, Table} from "react-bootstrap";
import axios from "axios";

const ManageInventory = () => {
    const [products, setProducts] = useState([]);

    useEffect( () => {
         axios.get("http://localhost:5000/products")
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const deleteProduct = (id) => {
        axios.delete(`http://localhost:5000/products/${id}`)
            .then(res => {
                setProducts(products.filter(product => product._id !== id));
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='manage-inventories'>
            <Container>
                <h2 className='text-center mb-5'>Manage Inventories</h2>
                <Table striped bordered hover>
                    <thead align={'center'} valign={'center'}>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Supplier</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody align={'center'} valign={'middle'}>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>
                                <div className="d-flex align-items-center">
                                    <img src={product.image} alt="product" className="img-fluid" width="40" height="40"/>
                                    <h6 className="mb-0 ms-3">{product.name}</h6>
                                </div>
                            </td>
                            <td>${product.price}</td>
                            <td>{product.supplier}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <button className='btn-default btn-secondary btnSm me-3'>Edit</button>
                                <button onClick={() => deleteProduct(product._id)} className='btn-default btnSm'>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default ManageInventory;