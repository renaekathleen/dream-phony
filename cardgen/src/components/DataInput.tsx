import { useState } from 'react';
import type { DataSet } from '../types';
import type { ValidationError } from '../validation';
import { validateDataSet } from '../validation';
import { PRESETS, getBlankTemplate } from '../presets';

interface Props {
  onDataLoaded: (data: DataSet) => void;
  currentData: DataSet | null;
}

export function DataInput({ onDataLoaded, currentData }: Props) {
  const [json, setJson] = useState('');
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [parseError, setParseError] = useState('');

  const loadPreset = (key: string) => {
    const preset = PRESETS[key];
    if (preset) {
      setJson(JSON.stringify(preset, null, 2));
      setErrors([]);
      setParseError('');
      onDataLoaded(preset);
    }
  };

  const loadTemplate = () => {
    setJson(getBlankTemplate());
    setErrors([]);
    setParseError('');
  };

  const validate = () => {
    setParseError('');
    setErrors([]);

    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch (e) {
      setParseError(e instanceof Error ? e.message : 'Invalid JSON');
      return;
    }

    const result = validateDataSet(parsed);
    if (result.errors.length > 0) {
      setErrors(result.errors);
      return;
    }

    if (result.data) {
      onDataLoaded(result.data);
    }
  };

  const hasErrors = parseError || errors.length > 0;

  return (
    <section className="data-input">
      <h2>Data Set</h2>

      <div className="preset-buttons">
        <button onClick={() => loadPreset('inclusive')}>Load Inclusive Set</button>
        <button onClick={() => loadPreset('classic')}>Load Classic Set</button>
        <button onClick={loadTemplate} className="secondary">Blank Template</button>
      </div>

      <div className="editor-area">
        <label htmlFor="json-input">Paste or edit JSON data:</label>
        <textarea
          id="json-input"
          value={json}
          onChange={(e) => setJson(e.target.value)}
          rows={20}
          spellCheck={false}
          placeholder="Load a preset above or paste your own JSON..."
        />
        <button onClick={validate} className="primary">
          Validate &amp; Load
        </button>
      </div>

      {parseError && (
        <div className="error-box">
          <strong>JSON Parse Error:</strong> {parseError}
        </div>
      )}

      {errors.length > 0 && (
        <div className="error-box">
          <strong>Validation Errors ({errors.length}):</strong>
          <ul>
            {errors.map((err, i) => (
              <li key={i}>
                <code>{err.field}</code>: {err.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {currentData && !hasErrors && (
        <div className="success-box">
          Loaded: <strong>{currentData.title}</strong> — {currentData.admirers.length} admirers across{' '}
          {currentData.locations.length} locations
        </div>
      )}
    </section>
  );
}
