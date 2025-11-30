import { useState } from 'react';
import { Plus, Trash } from '@phosphor-icons/react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Card from '../ui/Card';

const ExperienceForm = ({ experiences = [], onSave }) => {
  const [items, setItems] = useState(experiences);

  const handleAdd = () => {
    setItems([...items, {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      location: ''
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
                <Input label="Company" value={item.company} onChange={(e) => handleChange(index, 'company', e.target.value)} />
                <Input label="Position" value={item.position} onChange={(e) => handleChange(index, 'position', e.target.value)} />
                <Input type="date" label="Start Date" value={item.startDate} onChange={(e) => handleChange(index, 'startDate', e.target.value)} />
                <Input type="date" label="End Date" value={item.endDate} onChange={(e) => handleChange(index, 'endDate', e.target.value)} disabled={item.current} />
                <Input label="Location" value={item.location} onChange={(e) => handleChange(index, 'location', e.target.value)} className="md:col-span-2" />
              </div>
              <Textarea label="Description" value={item.description} onChange={(e) => handleChange(index, 'description', e.target.value)} rows={3} />
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={item.current} onChange={(e) => handleChange(index, 'current', e.target.checked)} className="w-5 h-5" />
                <label className="text-text-medium">Currently working here</label>
              </div>
              <Button variant="danger" size="sm" icon={<Trash weight="bold" />} onClick={() => handleRemove(index)}>Remove</Button>
            </div>
          </Card.Body>
        </Card>
      ))}
      <div className="flex gap-4">
        <Button variant="ghost" icon={<Plus weight="bold" />} onClick={handleAdd}>Add Experience</Button>
        <Button variant="primary" onClick={handleSave}>Save All</Button>
      </div>
    </div>
  );
};

export default ExperienceForm;
