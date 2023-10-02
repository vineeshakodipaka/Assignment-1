
import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import { Container, Row, Button,Col, Form ,Card,InputGroup} from 'react-bootstrap';
import { FaUser, FaGasPump,FaCar, FaCog } from 'react-icons/fa';
import { BsSpeedometer } from 'react-icons/bs';
import { GiSteeringWheel } from 'react-icons/gi';
import { FiHeart,FiSearch } from 'react-icons/fi';
  
 // Import icons from react-icons
import './style.css'
 
function CarList() { 
  const [data, setData] = useState([]);
  const [page, setPage] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { 
    fetch("https://64c37c1ceb7fd5d6ebd0ebc4.mockapi.io/todo")
      .then((res) => res.json())
      .then((op) => {
        setData(op);  
        setPage(op.slice(0, 6));
      });
  }, []);

  const handler = (num) => {
    setPage(data.slice((num * 6) - 6, num * 6));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Filter and update the list as the user types
    const filteredData = data.filter((car) =>
      car.Model.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setPage(filteredData.slice(0, 6));
  };

  return (
    <div className="carmodelcls">
      <Container className="container rounded-3 mt-2 mb-2" >
      <Row className='justify-content-md-center'> 
        <Col lg={10}>
        <Form className="mb-3 mt-3" >
          <Row lg={4} xs={2}>
          <Form.Group controlId="searchTerm">
          <InputGroup lg={2} className='rounded-5'  >
            <Form.Control
              className='position-relative rounded-5'
              type="text"
              placeholder="Search...."
              value={searchTerm}
              onChange={handleSearchChange} 
             
            />
          <FiSearch   className='position-absolute end-0 me-2 mt-2'/>
        </InputGroup>
          </Form.Group>
          </Row>
        </Form>
        <Row lg={3} md={2} xs={1}>
          {page.map((car) => ( 
            <Col key={car.id}>
              <Card className='mx-1 mb-2 p-2 rounded-4' >
              
              <Card.Img className='rounded-4' src={car.Image} height="150px" alt={car.Model} style={{width:"100%"}} /> 
              <Row className="mt-3 mb-3 justify-content-between">
              <Col xs={8}>
              <p className="fw-bold">{car.Model}</p>              
              </Col>
              <Col xs={4}>
              <Button className="rounded-4" style={{background:"none",border:"1px dashed black",color:"black"}}>{car.Year}</Button>
              </Col>
              </Row>

              <Row  className="mt-1 mb-1 ">
              <Col>
              <div>
                <FaUser className="reacticon" /> {car.People} People
              </div>
              <div>
                <BsSpeedometer  className="reacticon" /> {car.Distance}
              </div>
              </Col>
              <Col>
              <div>
                <FaGasPump  className="reacticon" /> {car.Type}
              </div>
              <div>
                <GiSteeringWheel  className="reacticon" /> Automatic
              </div>
              </Col>
              </Row>
              <hr/>

              <Row className="mt-1 mb-1 ">
              <Col  xs={5}>
              <p className="mt-2">
                <span className='fw-bold'>${car.Amount}</span>/<span>month</span>
              </p>             
              </Col>
              <Col  xs={7} className='d-flex'>
              
              <FiHeart className="mt-2 reacticon me-3 p-2 fa-heart rounded-4" 
              />
              <Button className="rounded-4" >Rent Now
              </Button>
              </Col>
              </Row>
              </Card>
            </Col>
          ))}
        </Row>
        <Row className="mt-2 justify-content-end mb-5">
         <Col lg={2}>
         <Pagination dta={data} handler={handler} />
         </Col>
        </Row>
        </Col>
      </Row>
      </Container>
    </div>
  );
}

export default CarList;