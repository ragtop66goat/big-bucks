import { render, screen } from "@testing-library/react";
import { DiscountInfo } from "../components/discountInfo/DiscountInfo";

describe("DiscountInfo Component Tests", () => {
  const mockDiscounts = [
    {
      groupSize: "5-7 hunters",
      discount: 10,
      description: "Save 10% when booking for 5-7 hunters",
    },
    {
      groupSize: "8+ hunters",
      discount: 15,
      description: "Save 15% when booking for 8 or more hunters",
    },
  ];

  const mockPromotions = [
    {
      season: "Early Bird",
      deadline: "Book 6 months in advance",
      discount: 12,
      description: "Save 12% on any package",
    },
  ];

  it("should render section heading 'Group Discounts'", () => {
    render(<DiscountInfo discounts={mockDiscounts} promotions={[]} />);

    expect(
      screen.getByText("Group Discounts & Promotions"),
    ).toBeInTheDocument();
  });

  it("should render all discount tiers", () => {
    render(<DiscountInfo discounts={mockDiscounts} promotions={[]} />);

    expect(screen.getByText(/5-7 hunters/)).toBeInTheDocument();
    expect(screen.getByText(/8\+ hunters/)).toBeInTheDocument();
  });

  it("should display discount percentage correctly", () => {
    render(<DiscountInfo discounts={mockDiscounts} promotions={[]} />);

    expect(screen.getByText(/10% OFF/)).toBeInTheDocument();
    expect(screen.getByText(/15% OFF/)).toBeInTheDocument();
  });

  it("should display group size range", () => {
    render(<DiscountInfo discounts={mockDiscounts} promotions={[]} />);

    expect(
      screen.getByText("Save 10% when booking for 5-7 hunters"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Save 15% when booking for 8 or more hunters"),
    ).toBeInTheDocument();
  });

  it("should render seasonal promotions if provided", () => {
    render(
      <DiscountInfo discounts={mockDiscounts} promotions={mockPromotions} />,
    );

    expect(screen.getByText(/Early Bird/)).toBeInTheDocument();
    expect(screen.getByText(/Book 6 months in advance/)).toBeInTheDocument();
    expect(screen.getByText(/12% OFF/)).toBeInTheDocument();
  });

  it("should not render promotions section when promotions array is empty", () => {
    render(<DiscountInfo discounts={mockDiscounts} promotions={[]} />);

    expect(screen.queryByText(/Early Bird/)).not.toBeInTheDocument();
  });
});
