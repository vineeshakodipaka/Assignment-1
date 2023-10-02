import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import { Container, Row, Col, Form } from 'react-bootstrap';

function CarList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetch("https://64c37c1ceb7fd5d6ebd0ebc4.mockapi.io/todo")
      .then((res) => res.json())
      .then((op) => {
        setData(op);
        setPage(op.slice(0, itemsPerPage));
      });
  }, []);

  const handler = (num) => {
    setCurrentPage(num);
    const startIndex = (num - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    let filteredData = data;
    
    if (searchTerm !== '') {
      filteredData = data.filter((car) =>
        car.Model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setPage(filteredData.slice(startIndex, endIndex));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when the search term changes
    handler(1); // Trigger pagination update with the first page
  };

  return (
    <>
      <Container>
        <Form className="mb-3">
          <Form.Group controlId="searchTerm">
            <Form.Control
              type="text"
              placeholder="Search by Car Model"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Form>
        <Row lg={3}>
          {page.map((car) => (
            <Col key={car.id}>
              <h1>{car.Model}</h1>
              <img src={car.Image} width="100%" height="400px" alt={car.Model} />
            </Col>
          ))}
        </Row>
        <div className="mt-5 d-flex justify-content-end">
          <Pagination dta={data} handler={handler} />
        </div>
      </Container>
    </>
  );
}

export default CarList;
