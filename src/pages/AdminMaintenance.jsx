import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Card, Table, Button, Badge, Input, Select } from '../components/UI';

const AdminMaintenance = () => {
  const { maintenance, addMaintenanceBill, flats } = useData();
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
      flatNumber: '',
      amount: '',
      month: '',
      dueDate: ''
  });

  const handleCreate = (e) => {
      e.preventDefault();
      addMaintenanceBill({
          ...formData,
          amount: Number(formData.amount)
      });
      setShowForm(false);
      setFormData({ flatNumber: '', amount: '', month: '', dueDate: '' });
  };

  return (
    <div className="page-container">
      <div className="page-header flex-between">
        <h1 className="page-title">Maintenance Bills</h1>
        <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Generate Bill'}
        </Button>
      </div>

      {showForm && (
          <Card className="mt-4 mb-4 form-card">
              <h3>Generate New Bill</h3>
              <form onSubmit={handleCreate} className="grid form-grid">
                  <Select 
                      label="Flat Number" 
                      required
                      value={formData.flatNumber}
                      onChange={e => setFormData({...formData, flatNumber: e.target.value})}
                      options={[
                          { label: 'Select Flat', value: '' },
                          ...flats.map(f => ({ label: f.number, value: f.number }))
                      ]}
                  />
                  <Input 
                      label="Amount (₹)" 
                      type="number" 
                      required
                      value={formData.amount}
                      onChange={e => setFormData({...formData, amount: e.target.value})}
                  />
                  <Input 
                      label="Billing Month" 
                      placeholder="e.g. March 2024" 
                      required
                      value={formData.month}
                      onChange={e => setFormData({...formData, month: e.target.value})}
                  />
                  <Input 
                      label="Due Date" 
                      type="date" 
                      required
                      value={formData.dueDate}
                      onChange={e => setFormData({...formData, dueDate: e.target.value})}
                  />
                  <div className="form-actions mt-4 col-span-2">
                       <Button type="submit">Publish Bill</Button>
                  </div>
              </form>
          </Card>
      )}

      <Card className="table-card mt-4">
        <Table headers={['Flat', 'Month', 'Amount', 'Due Date', 'Status']}>
          {maintenance.map((bill) => (
            <tr key={bill.id}>
              <td><strong>{bill.flatNumber}</strong></td>
              <td>{bill.month}</td>
              <td>₹{bill.amount}</td>
              <td>{bill.dueDate}</td>
              <td>
                <Badge type={bill.status === 'Paid' ? 'success' : 'danger'}>
                  {bill.status}
                </Badge>
              </td>
            </tr>
          ))}
          {maintenance.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-gray py-4">No maintenance records found.</td>
            </tr>
          )}
        </Table>
      </Card>
    </div>
  );
};

export default AdminMaintenance;
