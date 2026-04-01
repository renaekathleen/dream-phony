import type { DataSet } from '../types';

interface Props {
  data: DataSet;
}

export function ScoreSheet({ data }: Props) {
  return (
    <div className="printable score-sheet">
      <div className="print-header">
        <h2>{data.title}</h2>
        <p className="subtitle">Clue Tracking Sheet</p>
        <p className="instructions">
          Cross off items as you receive clues. When only one option remains in a
          category, that's your admirer's trait!
        </p>
      </div>

      <div className="sheet-grid">
        <div className="sheet-section">
          <h4>Locations</h4>
          {data.locations.map((l) => (
            <div key={l} className="sheet-item">{l}</div>
          ))}
        </div>

        <div className="sheet-section">
          <h4>Activities</h4>
          {data.activities.map((a) => (
            <div key={a} className="sheet-item">{a}</div>
          ))}
        </div>

        <div className="sheet-section">
          <h4>Foods</h4>
          {data.foods.map((f) => (
            <div key={f} className="sheet-item">{f}</div>
          ))}
        </div>

        <div className="sheet-section">
          <h4>Clothing</h4>
          {data.clothing.map((c) => (
            <div key={c} className="sheet-item">{c}</div>
          ))}
        </div>
      </div>

      <div className="suspect-grid">
        <h4>Suspects</h4>
        <div className="suspect-list">
          {data.admirers.map((a) => (
            <div key={a.id} className="sheet-item suspect-item">{a.name}</div>
          ))}
        </div>
      </div>

    </div>
  );
}
