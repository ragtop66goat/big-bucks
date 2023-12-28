import dog from "../../images/dogTraining.jpg";
import { Form } from "react-bootstrap";
import "./contact.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setEndDate,
  setName,
  setStartDate,
} from "../../slice/FormSlice";
import { getForeCast } from "../../api/weatherAPI";
import ForecastDisplay from "../../components/forecast display/ForecastDisplay";

export function Contact() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.weatherSlice.forecastData[0]);

  console.log(data);
  return (
    <>
      <div className="secondary-hero">
        <h1>
          <span>Contact</span>
        </h1>
      </div>
      <div className="container">
        <div className="contact-container">
          <img src={dog} alt="dog" className="image" />
          <div className="m-5">
            <h3>Request your dates today</h3>
            <Form className="contact-form bg-light p-3">
              <Form.Group className="mb-3 text-start" controlId="name">
                <Form.Label data-testid="name">Name</Form.Label>
                <Form.Control
                  data-testid="name-input"
                  type="text"
                  placeholder="name"
                  onChange={(e) => dispatch(setName(e.target.value))}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 text-start"
                controlId="formBasicEmail"
              >
                <Form.Label data-testid="email">Email address</Form.Label>
                <Form.Control
                  data-testid="email-input"
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => dispatch(setEmail(e.target.value))}
                />
                <Form.Group className="mb-3 text-start" controlId="startDate">
                  <Form.Label data-testid="start-date">Start Date</Form.Label>
                  <Form.Control
                    data-testid="start-date-input"
                    type="date"
                    placeholder="start date"
                    onChange={(e) => dispatch(setStartDate(e.target.value))}
                  />
                </Form.Group>
                <Form.Group className="mb-3 text-start" controlId="endDate">
                  <Form.Label data-testid="end-date">End Date</Form.Label>
                  <Form.Control
                    data-testid="end-date-input"
                    type="date"
                    placeholder="end date"
                    onChange={(e) => dispatch(setEndDate(e.target.value))}
                  />
                </Form.Group>
              </Form.Group>

              <button type="submit">Submit</button>
            </Form>
          </div>
        </div>
        <h3 className="m-5">Check the local weather</h3>
        <ForecastDisplay data={data} />
        <button onClick={() => dispatch(getForeCast())}>Get Forecast</button>
      </div>
    </>
  );
}
