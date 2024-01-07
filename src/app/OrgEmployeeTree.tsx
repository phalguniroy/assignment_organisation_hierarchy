import CreateIcon from "@mui/icons-material/Create";
import Avatar from "@mui/material/Avatar";

export type Employee = {
  name: string;
  email: string;
  designation: string;
  reporting_manager: string | null;
  children?: Employee[] | null;
  imageUrl?: string;
};

const OrgEmployeeTree = ({
  node,
  isRoot = false,
  key,
}: {
  node: Employee;
  isRoot?: boolean;
  key?: number;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      {!isRoot && <div className="connector-line" />}
      <div className="node">
        <div id="editIcon">
          <CreateIcon height="20px" width="20px" />{" "}
        </div>
        <div 
        id="profileImage">
        <Avatar
          alt="Profile Image"
          src={node.imageUrl || ""}
          sx={{ width: 56, height: 56 }}
        />
        </div>
        

        <h2>{node.name}</h2>
        <p><button>Role</button> { node.designation}</p>
        <p><button>Email</button> {node.email}</p>
        <p>Reporting Manager: {node.reporting_manager}</p>
        {node.children && <div className="connector-line-bottom" />}
      </div>

      {node.children && (
        <div className="children-container">
          {node.children.map((child, index) => (
            <OrgEmployeeTree key={index} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrgEmployeeTree;
