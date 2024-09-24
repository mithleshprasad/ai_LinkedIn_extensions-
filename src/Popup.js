/* global chrome */
import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';

const Popup = () => {
  const [selectedReply, setSelectedReply] = useState(
    "Thanks for the message! I'll get back to you soon."
  );
  const [iconReply, seticonReply] = useState(false);

  const handleFillClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'fillChatInput', reply: selectedReply });
    });
  };

  const handleSendClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'sendChatMessage' });
    });
  };
  const handleIconClick = () => {
    seticonReply(prevState => !prevState);
  };

  return (
    <Container className="p-3">
      <button className='btn bg-priamry bg-info text-light ' onClick={handleIconClick}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
</svg>
      </button>
        {iconReply &&
        <>
      <h3 className="mb-3">Select Auto Reply</h3>
      <Form.Group className="mb-3">
        <Form.Label>Auto Reply</Form.Label>
        <Form.Select
          value={selectedReply}
          onChange={(e) => setSelectedReply(e.target.value)}
        >
          <option value="Thanks for the message! I'll get back to you soon.">
            Reply 1
          </option>
          <option value="I appreciate your message. I'll review it shortly.">
            Reply 2
          </option>
        </Form.Select>
      </Form.Group>
      <div className="d-flex justify-content-between">
        <Button variant="primary" onClick={handleFillClick}>
          Fill<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
</svg>
        </Button>
        <Button variant="success" onClick={handleSendClick}>
          Send<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
</svg>
        </Button>
      </div>
      </>
   
    }
    </Container>
  );
};

export default Popup;
