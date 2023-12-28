import { Table } from "react-bootstrap";

export default function ForecastDisplay({ data }) {
  console.log(data);
  return (
    <div className="container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>High</th>
            <th>Low</th>
            <th>Sunrise</th>
            <th>Sunset</th>
            <th>Precipitation</th>
          </tr>
        </thead>
        <tbody>
          {data?.daily?.map((item, idx) => (
            <tr key={idx}>
              <td>{item.time.substring(5, 10)}</td>
              <td>{item.high}</td>
              <td>{item.low}</td>
              <td>{item.sunrise.substring(11, 16)}</td>
              <td>{item.sunset.substring(11, 16)}</td>
              <td>{item.precip}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
