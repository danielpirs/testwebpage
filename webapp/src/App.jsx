import { useState } from 'react';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [selectedFruit, setSelectedFruit] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });
  const [clickedButton, setClickedButton] = useState('');
  const [inputText, setInputText] = useState('');

  const openModal = (title, message) => {
    setModalContent({ title, message });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleButtonClick = (label) => {
    setClickedButton(label);
    openModal('Button Clicked', `You clicked the "${label}" button!`);
  };

  return (
    <div className="app-container">
      <header className="app-header" data-testid="app-header">
        <h1 data-testid="app-title">Demo Controls Page</h1>
        <p data-testid="app-subtitle">
          A sample React page with common UI controls for automated testing.
        </p>
      </header>

      <main className="app-main">
        {/* Buttons Section */}
        <section className="card" data-testid="buttons-section">
          <h2>Buttons</h2>
          <div className="button-group">
            <button
              data-testid="btn-primary"
              className="btn btn-primary"
              onClick={() => handleButtonClick('Primary')}
            >
              Primary Button
            </button>
            <button
              data-testid="btn-secondary"
              className="btn btn-secondary"
              onClick={() => handleButtonClick('Secondary')}
            >
              Secondary Button
            </button>
            <button
              data-testid="btn-danger"
              className="btn btn-danger"
              onClick={() => handleButtonClick('Danger')}
            >
              Danger Button
            </button>
            <button
              data-testid="btn-disabled"
              className="btn btn-primary"
              disabled
            >
              Disabled Button
            </button>
          </div>
          {clickedButton && (
            <p data-testid="button-status" className="status-text">
              Last clicked: <strong>{clickedButton}</strong>
            </p>
          )}
        </section>

        {/* Text & Input Section */}
        <section className="card" data-testid="text-section">
          <h2>Text &amp; Input</h2>
          <p data-testid="static-text" className="static-text">
            This is a static paragraph demonstrating text content on the page.
            It contains <strong>bold</strong> and <em>italic</em> formatting.
          </p>
          <div className="form-group">
            <label htmlFor="text-input">Text Input:</label>
            <input
              id="text-input"
              data-testid="text-input"
              type="text"
              className="form-input"
              placeholder="Type something here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
          {inputText && (
            <p data-testid="input-echo" className="status-text">
              You typed: <strong>{inputText}</strong>
            </p>
          )}
          <div className="form-group">
            <label htmlFor="textarea-input">Textarea:</label>
            <textarea
              id="textarea-input"
              data-testid="textarea-input"
              className="form-textarea"
              rows={3}
              placeholder="Enter multiple lines of text..."
            />
          </div>
        </section>

        {/* Dropdown Section */}
        <section className="card" data-testid="dropdown-section">
          <h2>Dropdown</h2>
          <div className="form-group">
            <label htmlFor="fruit-select">Select a fruit:</label>
            <select
              id="fruit-select"
              data-testid="dropdown-select"
              className="form-select"
              value={selectedFruit}
              onChange={(e) => setSelectedFruit(e.target.value)}
            >
              <option value="">-- Choose a fruit --</option>
              <option value="apple">Apple</option>
              <option value="banana">Banana</option>
              <option value="cherry">Cherry</option>
              <option value="grape">Grape</option>
              <option value="orange">Orange</option>
            </select>
          </div>
          {selectedFruit && (
            <p data-testid="dropdown-status" className="status-text">
              Selected fruit: <strong>{selectedFruit}</strong>
            </p>
          )}
        </section>

        {/* Radio Buttons Section */}
        <section className="card" data-testid="radio-section">
          <h2>Radio Buttons</h2>
          <p>Choose your favourite colour:</p>
          <div className="radio-group">
            {['Red', 'Green', 'Blue', 'Yellow', 'Purple'].map((color) => (
              <label key={color} className="radio-label" data-testid={`radio-label-${color.toLowerCase()}`}>
                <input
                  type="radio"
                  name="color"
                  value={color.toLowerCase()}
                  data-testid={`radio-${color.toLowerCase()}`}
                  checked={selectedColor === color.toLowerCase()}
                  onChange={(e) => setSelectedColor(e.target.value)}
                />
                {color}
              </label>
            ))}
          </div>
          {selectedColor && (
            <p data-testid="radio-status" className="status-text">
              Selected colour: <strong>{selectedColor}</strong>
            </p>
          )}
        </section>

        {/* Checkboxes Section */}
        <section className="card" data-testid="checkbox-section">
          <h2>Checkboxes</h2>
          <p>Select your interests:</p>
          <div className="checkbox-group">
            {['Sports', 'Music', 'Travel', 'Technology', 'Cooking'].map((item) => (
              <label key={item} className="checkbox-label" data-testid={`checkbox-label-${item.toLowerCase()}`}>
                <input
                  type="checkbox"
                  value={item.toLowerCase()}
                  data-testid={`checkbox-${item.toLowerCase()}`}
                />
                {item}
              </label>
            ))}
          </div>
        </section>

        {/* Popup / Modal Section */}
        <section className="card" data-testid="modal-section">
          <h2>Popups / Modals</h2>
          <p>Click a button below to open a modal popup:</p>
          <div className="button-group">
            <button
              data-testid="open-info-modal"
              className="btn btn-primary"
              onClick={() => openModal('Information', 'This is an informational popup message. It demonstrates a modal dialog.')}
            >
              Open Info Modal
            </button>
            <button
              data-testid="open-warning-modal"
              className="btn btn-secondary"
              onClick={() => openModal('Warning', 'This is a warning message! Please review before proceeding.')}
            >
              Open Warning Modal
            </button>
            <button
              data-testid="open-confirm-modal"
              className="btn btn-danger"
              onClick={() => openModal('Confirm Action', 'Are you sure you want to proceed with this action?')}
            >
              Open Confirm Modal
            </button>
          </div>
        </section>
      </main>

      <footer className="app-footer" data-testid="app-footer">
        <p>Demo Controls Page &mdash; Built with React &amp; Vite</p>
      </footer>

      <Modal
        isOpen={modalOpen}
        title={modalContent.title}
        message={modalContent.message}
        onClose={closeModal}
      />
    </div>
  );
}

export default App;
