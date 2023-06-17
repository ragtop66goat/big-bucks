import dog from "../../images/dogTraining.jpg";
import { Form } from "react-bootstrap";
import "./contact.css";

export function Contact() {
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
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="name" />
              </Form.Group>
              <Form.Group
                className="mb-3 text-start"
                controlId="formBasicEmail"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Group className="mb-3 text-start" controlId="startDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control type="date" placeholder="start date" />
                </Form.Group>
                <Form.Group className="mb-3 text-start" controlId="endDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control type="date" placeholder="end date" />
                </Form.Group>
              </Form.Group>

              <button type="submit">Submit</button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
