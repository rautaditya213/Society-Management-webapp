import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Card, Table, Button, Badge, Input } from '../components/UI';

const MemberComplaints = () => {
  const { user } = useAuth();
  const { complaints, raiseComplaint } = useData();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });

  const myComplaints = complaints.filter(c => c.flatNumber === user.flatNumber);

  const handleSubmit = (e) => {
      e.preventDefault();
      raiseComplaint(formData);
      setShowForm(false);
      setFormData({ title: '', description: '' });
  };

  return (
    <div className="page-container">
      <div className="page-header flex-between">
        <h1 className="page-title">My Complaints</h1>
        <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Raise New Complaint'}
        </Button>
      </div>

      {showForm && (
          <Card className="mt-4 mb-4 form-card">
              <h3>Raise Complaint</h3>
              <form onSubmit={handleSubmit} className="flex-col gap-4 mt-2">
                  <Input 
                      label="Concern Subject" 
                      required
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                  <div className="input-group">
                      <label>Detailed Description</label>
                      <textarea 
                          className="input-field" 
                          rows="4"
                          required
                          value={formData.description}
                          onChange={e => setFormData({...formData, description: e.target.value})}
                      />
                  </div>
                  <div>
                    <Button type="submit" variant="primary">Submit Complaint</Button>
                  </div>
              </form>
          </Card>
      )}

      <Card className="table-card mt-4">
        <Table headers={['Date', 'Subject', 'Description', 'Status']}>
          {myComplaints.reverse().map((complaint) => (
            <tr key={complaint.id}>
              <td>{complaint.date}</td>
              <td><strong>{complaint.title}</strong></td>
              <td className="text-gray">{complaint.description}</td>
              <td>
                <Badge type={complaint.status === 'Resolved' ? 'success' : 'warning'}>
                  {complaint.status}
                </Badge>
              </td>
            </tr>
          ))}
          {myComplaints.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center text-gray py-4">No complaints recorded by you.</td>
            </tr>
          )}
        </Table>
      </Card>
    </div>
  );
};

export default MemberComplaints;
