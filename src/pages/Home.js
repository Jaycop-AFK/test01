import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { Table, Image, Badge, Spinner } from 'react-bootstrap';

const Home = () => {
  const query = useQuery('getData', () => {
    const controller = new AbortController();
    const signal = controller.signal;

    const promise = fetch('https://api.codingthailand.com/api/news?page=1&per_page=3', {
      method: 'get',
      signal: signal
    }).then(res => res.json());

    promise.cancel = () => controller.abort();

    return promise;
  });

  const { isLoading, error, data } = query;

  if (isLoading) {
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
    <>
      <main role="main">
        <div className="col">
          <div className="row">
            {data.data.map((news, index) => {
              return (
                <div className="col-md-4" key={news.id}>
                  <h2>{news.topic}</h2>
                  <p>{news.detail}</p>
                  <p>category{news.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
