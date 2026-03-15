import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Card, Table, Button, Badge } from '../components/UI';

const MemberMaintenance = () => {
  const { user } = useAuth();
  const { maintenance, payMaintenanceBill } = useData();

  const myBills = maintenance.filter(m => m.flatNumber === user.flatNumber);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">My Maintenance Bills</h1>
      </div>

      <Card className="table-card mt-4">
        <Table headers={['Month', 'Amount', 'Due Date', 'Status', 'Action']}>
          {myBills.map((bill) => (
            <tr key={bill.id}>
              <td>{bill.month}</td>
              <td>₹{bill.amount}</td>
              <td>{bill.dueDate}</td>
              <td>
                <Badge type={bill.status === 'Paid' ? 'success' : 'warning'}>
                  {bill.status}
                </Badge>
              </td>
              <td>
                  {bill.status === 'Pending' ? (
                      <Button onClick={() => payMaintenanceBill(bill.id)}>Pay Now</Button>
                  ) : (
                      <span className="text-gray text-sm">Receipt Generated</span>
                  )}
              </td>
            </tr>
          ))}
          {myBills.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-gray py-4">No maintenance bills found for your flat.</td>
            </tr>
          )}
        </Table>
      </Card>
    </div>
  );
};

export default MemberMaintenance;
