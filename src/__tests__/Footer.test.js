import { render, screen } from "@testing-library/react";
import { Footer } from "../components/footer/Footer";

describe("Footer Component Tests", () => {
  test("should render logo, company name, and social media icons in footer", () => {
    render(<Footer />);

    const socialIcons = screen.queryAllByTestId("social");

    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByText("Uncle Big Bucks")).toBeInTheDocument();
    expect(socialIcons).toHaveLength(3);
  });
});