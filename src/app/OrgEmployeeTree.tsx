import CreateIcon from "@mui/icons-material/Create";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";

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
    const [showChildren, setShowChildren] = useState(false);
  
    const toggleChildren = () => {
      setShowChildren(!showChildren);
    };
  
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {!isRoot && <div className="connector-line" />}
        {isRoot && (
          <div className="header">
            <h1>Company Hierarchy</h1>
            <Tooltip title='Click on the "Show Children" button to expand the organizational tree starting from the root node' placement="top-start">
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
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
        <div id="details">
        <p><button>Role</button> { node.designation}</p>
        <p><button>Email</button> {node.email}</p>
        {!isRoot && <p><button>Reporting Manager</button> {node.reporting_manager}</p>}
        </div>
        
        
        
          {node.children && (
            <button onClick={toggleChildren}>
              {showChildren ? 'Hide Children' : 'Show Children'}
            </button>
          )}
          {node.children && <div className="connector-line-bottom" />}
        </div>
  
        {showChildren && node.children && (
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
