import React from 'react';
import { Table, Image, Badge, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { format } from 'date-fns';
import {BsEyeFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import Detail from './Detail'

const Product = () => {
  const [product, setProduct] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const cancelToken = React.useRef(null);

  const getData = async () => {
    try {
      setLoading(true);
      const resp = await axios.get('https://api.codingthailand.com/api/course', {
        cancelToken: cancelToken.current.token,
      });
      setProduct(resp.data.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    cancelToken.current = axios.CancelToken.source();

    getData();

    // Cancel request and clear memory when the component unmounts
    return () => {
      cancelToken.current.cancel('Request canceled');
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <p>Error</p>
        <p>{error.response ? error.response.data.message : 'Unknown error'}</p>
      </div>
    );
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>course name</th>
          <th>detail</th>
          <th>date</th>
          <th>views</th>
          <th>picture</th>
          <th>tools</th>
        </tr>
      </thead>
      <tbody>
        {product.map((p, index) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.title}</td>
            <td>{p.detail}</td>
            <td>{format(new Date(p.date), 'dd/MM/yyyy')}</td>
            <td>
              <Badge variant="success">{p.view}</Badge>
            </td>
            <td>
              <Image src={p.picture} thumbnail alt={p.title} width={100} />
            </td>
            <td>
                <Link to={`/Detail/${p.id}/title/${p.title}`}>
                    <BsEyeFill />
                </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Product;
