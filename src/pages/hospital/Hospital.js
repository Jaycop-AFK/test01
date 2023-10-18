import React from 'react'
import Pagination from 'react-js-pagination'
import axios from 'axios'
import { Table, Spinner } from 'react-bootstrap'

const pageSize = 15


const Hospital = () => {
    
  const [hospital, setHospital] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const cancelToken = React.useRef(null);

  const [page, setPage] = React.useState(1)
  const [total, setTotal] = React.useState(0)

  const getData = async (page) => {
    try {
      setLoading(true);
      const resp = await axios.get(
        `https://api.codingthailand.com/api/hospital2?page=${page}&page_size=${pageSize}`, {
        cancelToken: cancelToken.current.token,
      });
      setHospital(resp.data.data);
      setTotal(resp.data.meta.pagination.total)
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

    getData(page);

    // Cancel request and clear memory when the component unmounts
    return () => {
      cancelToken.current.cancel('Request canceled');
    };
  }, [page]);

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


  const handlePageChange = (pageNumber) =>{
    setPage(pageNumber)
  }

  return (
    <div>
            
            <Table striped bordered hover size='sm'>
      <thead>
        <tr>
          <th>id</th>
          <th>code</th>
          <th>name Hospital</th>
          
        </tr>
      </thead>
      <tbody>
        {hospital.map((h, index) => (
          <tr key={h.id}>
            <td>{h.id}</td>
            <td>{h.code}</td>
            <td>{h._name}</td>
            
          </tr>
        ))}
      </tbody>
    </Table>

            <Pagination
            activePage={page}
            itemsCountPerPage={pageSize}
            totalItemsCount={total}
            pageRangeDisplayed={15}
            onChange={handlePageChange}
            itemClass='page-item'
            linkClass='page-link'

            prevPageText={'back'}
            nextPageText={'next'}
            firstPageText={'first'}
            lastPageText={'last'}
            />

    </div>
  )
}

export default Hospital