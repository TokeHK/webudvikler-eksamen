import React, { useState } from 'react';

interface KontaktProps {
  onClose: () => void;
}

const KontaktModal: React.FC<KontaktProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      name,
      email,
      subject,
      message,
    };

    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/contact/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('besked sendt!');
        onClose();
      } else {
        alert(`fejl: ${result.message || 'der er sket en fejl'}`);
      }
    } catch (error) {
      alert('fejl: besked blev ikke sendt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal_overlay">
      <div className="modal_content">
        <h2>Kontakt Us</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Navn</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="subject">Emne</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Sender...' : 'Send Besked'}
          </button>
        <button className="modal_close" onClick={onClose}>Luk modal</button>

        </form>
      </div>
    </div>
  );
};

export default KontaktModal;
