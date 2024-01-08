import { Card } from "react-bootstrap";

export default function ForecastDisplay({ data }) {
  console.log(data);
  return (
    <div className="container d-flex overflow-auto">
      {data?.daily?.map((item, idx) => (
        <Card key={idx} border="warning" className="m-2 mb-5">
          <Card.Body>
            <Card.Title className="text-center border-bottom border-warning mb-2 p-2">
              {item.time.substring(5, 10)}
            </Card.Title>
            <Card.Subtitle>{`Sunrise: ${item.sunrise.substring(
              11,
              16
            )} Sunset: ${item.sunset.substring(11, 16)}`}</Card.Subtitle>
            <Card.Text>{`Chance of Precipitation: ${item.precip}%`}</Card.Text>
            <Card.Text className="border-top border-warning">{`Temp: ${item.high}/${item.low}`}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
