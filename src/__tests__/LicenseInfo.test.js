import { render, screen } from "@testing-library/react";
import { LicenseInfo } from "../components/licenseInfo/LicenseInfo";

describe("LicenseInfo Component Tests", () => {
  const mockLicenseInfoGeneral = {
    required: ["Montana Hunting License", "Deer Tag"],
    cost: {
      resident: { license: 19, tag: 17 },
      nonResident: { license: 101, tag: 142 },
    },
    links: {
      purchase: "https://fwp.mt.gov/buyandapply",
      regulations: "https://fwp.mt.gov/hunt/regulations",
    },
  };

  const mockLicenseInfoPermitOnly = {
    required: ["Montana Hunting License", "Elk Permit (Limited Draw)"],
    cost: {
      resident: { license: 19, permit: 20 },
      nonResident: { license: 101, permit: 884 },
    },
    applicationDeadline: "2026-06-01",
    links: {
      purchase: "https://fwp.mt.gov/buyandapply",
      drawResults: "https://fwp.mt.gov/hunt/draw-results",
    },
  };

  it("should render required licenses list", () => {
    render(
      <LicenseInfo licenseInfo={mockLicenseInfoGeneral} type="general" />,
    );

    expect(screen.getByText("Montana Hunting License")).toBeInTheDocument();
    expect(screen.getByText("Deer Tag")).toBeInTheDocument();
  });

  it("should display resident costs", () => {
    render(
      <LicenseInfo licenseInfo={mockLicenseInfoGeneral} type="general" />,
    );

    expect(screen.getByText("Resident")).toBeInTheDocument();
    expect(screen.getByText("$19")).toBeInTheDocument();
    expect(screen.getByText("$17")).toBeInTheDocument();
  });

  it("should display non-resident costs", () => {
    render(
      <LicenseInfo licenseInfo={mockLicenseInfoGeneral} type="general" />,
    );

    expect(screen.getByText("Non-Resident")).toBeInTheDocument();
    expect(screen.getByText("$101")).toBeInTheDocument();
    expect(screen.getByText("$142")).toBeInTheDocument();
  });

  it("should show purchase link", () => {
    render(
      <LicenseInfo licenseInfo={mockLicenseInfoGeneral} type="general" />,
    );

    const purchaseLink = screen.getByText(/Purchase Licenses/i);
    expect(purchaseLink).toBeInTheDocument();
    expect(purchaseLink.closest("a")).toHaveAttribute(
      "href",
      "https://fwp.mt.gov/buyandapply",
    );
    expect(purchaseLink.closest("a")).toHaveAttribute("target", "_blank");
    expect(purchaseLink.closest("a")).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
  });

  it("should show application deadline when type is permit-only", () => {
    render(
      <LicenseInfo
        licenseInfo={mockLicenseInfoPermitOnly}
        type="permit-only"
      />,
    );

    expect(screen.getByText(/Application Deadline/i)).toBeInTheDocument();
    expect(screen.getByText("2026-06-01")).toBeInTheDocument();
  });

  it("should not show application deadline when type is general", () => {
    render(
      <LicenseInfo licenseInfo={mockLicenseInfoGeneral} type="general" />,
    );

    expect(screen.queryByText(/Application Deadline/i)).not.toBeInTheDocument();
  });

  it("should render regulations link", () => {
    render(
      <LicenseInfo licenseInfo={mockLicenseInfoGeneral} type="general" />,
    );

    const regulationsLink = screen.getByText(/Regulations/i);
    expect(regulationsLink).toBeInTheDocument();
    expect(regulationsLink.closest("a")).toHaveAttribute(
      "href",
      "https://fwp.mt.gov/hunt/regulations",
    );
  });

  it("should render section heading", () => {
    render(
      <LicenseInfo licenseInfo={mockLicenseInfoGeneral} type="general" />,
    );

    expect(screen.getByText("License Information")).toBeInTheDocument();
  });
});
