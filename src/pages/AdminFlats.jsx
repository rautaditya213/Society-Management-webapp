import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Card, Table, Button, Badge } from '../components/UI';

const AdminFlats = () => {
  const { flats } = useData();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Flats Directory</h1>
        <Button>Add New Flat (Demo)</Button>
      </div>

      <Card className="table-card mt-4">
        <Table headers={['Flat No.', 'Type', 'Owner/Tenant', 'Status', 'Actions']}>
          {flats.map((flat) => (
            <tr key={flat.id}>
              <td><strong>{flat.number}</strong></td>
              <td>{flat.type}</td>
              <td>{flat.owner}</td>
              <td>
                <Badge type={flat.status === 'Occupied' ? 'success' : 'warning'}>
                  {flat.status}
                </Badge>
              </td>
              <td>
                <Button variant="secondary" className="btn-sm">Edit</Button>
              </td>
            </tr>
          ))}
          {flats.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-gray py-4">No flats data found.</td>
            </tr>
          )}
        </Table>
      </Card>
    </div>
  );
};

export default AdminFlats;
