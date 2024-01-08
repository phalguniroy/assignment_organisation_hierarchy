"use client";
import * as React from "react";
import OrgEmployeeTree, { Employee } from "./OrgEmployeeTree";
import { useEffect, useState } from "react";

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
        imageUrl: employee.imageUrl,
        children: children.length > 0 ? children : null,
      };
      tree.push(employeeNode);
    }

    return tree;
  }

  const hierarchicalTree = buildHierarchy(apiData, null);

  return (
       <div className="container">
        <p>Please zoom out to view the entire tree, including its roots, as horizontal scrolling is enabled. This will allow us to see the complete structure.</p>
      <div className="tree-container">
        <OrgEmployeeTree node={hierarchicalTree[0]} isRoot />
      </div>
    </div>
   
  );
}
