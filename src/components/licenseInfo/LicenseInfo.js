import { FaCheckCircle, FaExternalLinkAlt } from "react-icons/fa";
import "./licenseInfo.css";

export function LicenseInfo({ licenseInfo, type }) {
  const { required, cost, applicationDeadline, links } = licenseInfo;

  return (
    <div className="license-info">
      <h3 className="license-info-heading">License Information</h3>

      <div className="required-licenses">
        <h4>Required Licenses:</h4>
        <ul className="license-list">
          {required.map((license, index) => (
            <li key={index}>
              <FaCheckCircle className="check-icon" />
              <span>{license}</span>
            </li>
          ))}
        </ul>
      </div>

      {type === "permit-only" && applicationDeadline && (
        <div className="application-deadline">
          <strong>Application Deadline:</strong> {applicationDeadline}
        </div>
      )}

      <div className="cost-table">
        <h4>License Costs:</h4>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              {Object.keys(cost.resident).map((key) => (
                <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Resident</td>
              {Object.values(cost.resident).map((value, index) => (
                <td key={index}>${value}</td>
              ))}
            </tr>
            <tr>
              <td>Non-Resident</td>
              {Object.values(cost.nonResident).map((value, index) => (
                <td key={index}>${value}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="license-links">
        {links.purchase && (
          <a
            href={links.purchase}
            target="_blank"
            rel="noopener noreferrer"
            className="license-link"
          >
            Purchase Licenses <FaExternalLinkAlt />
          </a>
        )}
        {links.regulations && (
          <a
            href={links.regulations}
            target="_blank"
            rel="noopener noreferrer"
            className="license-link"
          >
            View Regulations <FaExternalLinkAlt />
          </a>
        )}
        {links.drawResults && (
          <a
            href={links.drawResults}
            target="_blank"
            rel="noopener noreferrer"
            className="license-link"
          >
            Draw Results <FaExternalLinkAlt />
          </a>
        )}
        {links.bearsmart && (
          <a
            href={links.bearsmart}
            target="_blank"
            rel="noopener noreferrer"
            className="license-link"
          >
            Bear Safety <FaExternalLinkAlt />
          </a>
        )}
      </div>
    </div>
  );
}
