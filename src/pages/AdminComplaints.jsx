import React from 'react';
import { useData } from '../context/DataContext';
import { Card, Table, Button, Badge } from '../components/UI';

const AdminComplaints = () => {
  const { complaints, resolveComplaint } = useData();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Complaints Management</h1>
      </div>

      <Card className="table-card mt-4">
        <Table headers={['Date', 'Flat No.', 'Subject / Description', 'Status', 'Actions']}>
          {complaints.reverse().map((complaint) => (
            <tr key={complaint.id}>
              <td>{complaint.date}</td>
              <td><strong>{complaint.flatNumber}</strong></td>
              <td>
                  <div><strong>{complaint.title}</strong></div>
                  <div className="text-sm text-gray">{complaint.description}</div>
              </td>
              <td>
                <Badge type={complaint.status === 'Resolved' ? 'success' : 'danger'}>
                  {complaint.status}
                </Badge>
              </td>
              <td>
                  {complaint.status === 'Open' && (
                      <Button 
                        variant="primary" 
                        className="btn-sm"
                        onClick={() => resolveComplaint(complaint.id)}
                       >
                          Mark Resolved
                      </Button>
                  )}
              </td>
            </tr>
          ))}
          {complaints.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-gray py-4">No complaints history.</td>
            </tr>
          )}
        </Table>
      </Card>
    </div>
  );
};

export default AdminComplaints;
