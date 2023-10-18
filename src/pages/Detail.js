import React from 'react';
import Card from 'react-bootstrap/Card';
import { uuseNavigate, useParams, useNavigate } from 'react-router-dom';
import { Table, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';


const Detail = () => {
  const { id, title } = useParams();
  const navigate = useNavigate()
  const [detail, setDetail] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const cancelToken = React.useRef(null);

  const getData = async (id) => {
    try {
      setLoading(true);
      const resp = await axios.get(`https://api.codingthailand.com/api/course/${id}`, {
        cancelToken: cancelToken.current.token,
      });
      setDetail(resp.data.data);
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

    getData(id);

    // Cancel request and clear memory when the component unmounts
    return () => {
      cancelToken.current.cancel('Request canceled');
    };
  }, [id]);

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
    <div>
       <Button variant="secondary" onClick={() => navigate('/product')}> Back</Button>{' '}
      <Table striped bordered hover>
        <h2>
          {title} - {id}
        </h2>
      </Table>
      {detail.length > 0 ? (
        <div className='row'>
          {detail.map((d, index) => (
            <Card key={index} style={{ width: '18rem', marginBottom: '1rem' }}>
              <Card.Body>
                <Card.Title>{d.ch_title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <div className='text-center'>
          <h1>not found</h1>
        </div>
        
      )}
    </div>
  );
};

export default Detail;
