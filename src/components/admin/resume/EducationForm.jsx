import { useState } from 'react';
import { Plus, Trash } from '@phosphor-icons/react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Card from '../ui/Card';

const EducationForm = ({ educations = [], onSave }) => {
  const [items, setItems] = useState(educations);

  const handleAdd = () => {
    setItems([...items, {
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    }]);
  };

  const handleRemove = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handleSave = () => {
    onSave(items);
  };

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <Card key={index} variant="bordered">
          <Card.Body>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Institution" value={item.institution} onChange={(e) => handleChange(index, 'institution', e.target.value)} />
                <Input label="Degree" value={item.degree} onChange={(e) => handleChange(index, 'degree', e.target.value)} />
                <Input label="Field of Study" value={item.field} onChange={(e) => handleChange(index, 'field', e.target.value)} />
                <Input type="date" label="Start Date" value={item.startDate} onChange={(e) => handleChange(index, 'startDate', e.target.value)} />
                <Input type="date" label="End Date" value={item.endDate} onChange={(e) => handleChange(index, 'endDate', e.target.value)} />
              </div>
              <Textarea label="Description" value={item.description} onChange={(e) => handleChange(index, 'description', e.target.value)} rows={3} />
              <Button variant="danger" size="sm" icon={<Trash weight="bold" />} onClick={() => handleRemove(index)}>Remove</Button>
            </div>
          </Card.Body>
        </Card>
      ))}
      <div className="flex gap-4">
        <Button variant="ghost" icon={<Plus weight="bold" />} onClick={handleAdd}>Add Education</Button>
        <Button variant="primary" onClick={handleSave}>Save All</Button>
      </div>
    </div>
  );
};

export default EducationForm;
