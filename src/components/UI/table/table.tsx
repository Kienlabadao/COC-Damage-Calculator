import { ReactNode } from "react";

export interface Column {
  header: string;
  accessor: string; // Keys for row objects
}

export interface TableRow {
  [key: string]: ReactNode;
}

interface TableProps {
  columns: Column[];
  data: TableRow[]; // Data rows with values as ReactNode
  className?: string;
}

export function Table({ columns, data, className = "" }: TableProps) {
  return (
    <div className="table-container">
      <table className={`text-center align-middle fw-bold ${className}`}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => {
                const value = row[column.accessor];

                return <td key={colIndex}>{value}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
