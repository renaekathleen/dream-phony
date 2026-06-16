import type { DataSet } from '../types';
import { formatPhone } from '../validation';

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

      <div className="called-section">
        <h4>Called Admirers</h4>
        <p className="sheet-note">Check off each admirer you've called this round</p>
        <div className="called-columns">
          {data.locations.map((loc) => {
            const group = data.admirers.filter((a) => a.location === loc);
            if (group.length === 0) return null;
            return (
              <div key={loc} className="called-location-group">
                <div className="called-location-name">{loc}</div>
                {group.map((a) => (
                  <div key={a.id} className="called-item">
                    <span className="called-name">{a.name}</span>
                    <span className="called-phone">{formatPhone(a.phoneNumber)}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="suspect-grid">
        <h4>Suspects</h4>
        <p className="sheet-note">Cross off admirers who are <em>not</em> your secret admirer</p>
        <div className="suspect-list">
          {data.admirers.map((a) => (
            <div key={a.id} className="sheet-item suspect-item">{a.name}</div>
          ))}
        </div>
      </div>

    </div>
  );
}
