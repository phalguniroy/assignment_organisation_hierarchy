"use client";
import * as React from "react";
import OrgEmployeeTree, { Employee } from "./OrgEmployeeTree";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

export default function Home() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://backend-assignment-organisation-hierarchy.vercel.app/getEmployeeData"
      );

      const result = await response.json();

      setApiData(result);
      setLoading(false);
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  function buildHierarchy(data: any, managerEmail: string | null) {
    const tree = [];
    const managerEmployees = data.filter(
      (employee: Employee) => employee.reporting_manager === managerEmail
    );

    for (const employee of managerEmployees) {
      const children = buildHierarchy(data, employee?.email);
      const employeeNode: Employee = {
        name: employee.name,
        email: employee.email,
        designation: employee.designation,
        reporting_manager: employee.reporting_manager,
        children: children.length > 0 ? children : null,
      };
      tree.push(employeeNode);
    }

    return tree;
  }

  const hierarchicalTree = buildHierarchy(apiData, null);

  return (
    <div>
      <div className="header">
        <h1>Company Hierarchy</h1>
        <Tooltip title="Please zoom out to see the tree" placement="top-start">
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div className="tree-container">
        <OrgEmployeeTree node={hierarchicalTree[0]} isRoot />
      </div>
    </div>
  );
}
