import { useFirestore } from '../../../hooks/useFirestore';
import { format } from 'date-fns';
import { Trash, Envelope as EnvelopeIcon } from '@phosphor-icons/react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Table from '../ui/Table';
import Modal from '../ui/Modal';
import { useState } from 'react';

/**
 * Messages List Component
 * View and manage contact messages
 */
const MessagesList = () => {
  const { data: messages, loading, update, remove } = useFirestore('messages', {
    orderByField: 'createdAt',
    orderDirection: 'desc'
  });
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = async (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
    if (!message.read) {
      await update(message.id, { read: true });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      await remove(id);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
    </div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <h2 className="text-2xl font-bold text-text-bright">
            Messages ({messages.length})
          </h2>
        </Card.Header>
        <Card.Body>
          {messages.length === 0 ? (
            <p className="text-center text-text-muted py-12">No messages yet</p>
          ) : (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Subject</Table.Th>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {messages.map((message) => (
                  <Table.Row key={message.id} onClick={() => handleView(message)}>
                    <Table.Td>
                      <Badge variant={message.read ? 'default' : 'warning'} size="sm">
                        {message.read ? 'Read' : 'New'}
                      </Badge>
                    </Table.Td>
                    <Table.Td className="font-medium text-text-bright">{message.name}</Table.Td>
                    <Table.Td>{message.email}</Table.Td>
                    <Table.Td>{message.subject}</Table.Td>
                    <Table.Td>{message.createdAt && format(message.createdAt.toDate(), 'MMM d, yyyy')}</Table.Td>
                    <Table.Td>
                      <Button
                        variant="danger"
                        size="sm"
                        icon={<Trash weight="bold" />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(message.id);
                        }}
                      >
                        Delete
                      </Button>
                    </Table.Td>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
        <Modal.Header>Message from {selectedMessage?.name}</Modal.Header>
        <Modal.Body>
          {selectedMessage && (
            <div className="space-y-4">
              <div>
                <p className="text-text-muted text-sm mb-1">Email</p>
                <p className="text-text-bright">{selectedMessage.email}</p>
              </div>
              <div>
                <p className="text-text-muted text-sm mb-1">Subject</p>
                <p className="text-text-bright font-medium">{selectedMessage.subject}</p>
              </div>
              <div>
                <p className="text-text-muted text-sm mb-1">Message</p>
                <p className="text-text-medium whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div>
                <p className="text-text-muted text-sm">
                  Received: {selectedMessage.createdAt && format(selectedMessage.createdAt.toDate(), 'PPpp')}
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Close</Button>
          <Button
            variant="primary"
            icon={<EnvelopeIcon weight="bold" />}
            onClick={() => window.location.href = `mailto:${selectedMessage?.email}`}
          >
            Reply via Email
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MessagesList;
