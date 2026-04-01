import type { DataSet } from '../types';
import { formatPhone } from '../validation';

interface Props {
  data: DataSet;
}

export function Cards({ data }: Props) {
  return (
    <div className="printable cards-page">
      <div className="print-header no-print-visible">
        <h2>{data.title} — Cards</h2>
      </div>

      <div className="card-grid">
        {data.admirers.map((a) => (
          <div key={a.id} className="game-card admirer-card">
            <div className="card-name">{a.name}</div>
            <div className="card-phone">{formatPhone(a.phoneNumber)}</div>
            <div className="card-location">{a.location}</div>
          </div>
        ))}
      </div>

      <h3 className="special-cards-heading">Special Cards</h3>
      <p className="special-cards-note">Print 1 of each per player (up to 4 players)</p>

      <div className="card-grid">
        {[1, 2, 3, 4].map((n) => (
          <div key={`speaker-${n}`} className="game-card special-card speaker-card">
            <div className="card-icon">&#128266;</div>
            <div className="card-name">Speakerphone</div>
            <div className="card-desc">
              Force the current player to use speakerphone — everyone hears the clue!
            </div>
          </div>
        ))}
        {[1, 2, 3, 4].map((n) => (
          <div key={`share-${n}`} className="game-card special-card share-card">
            <div className="card-icon">&#129309;</div>
            <div className="card-name">Share a Secret</div>
            <div className="card-desc">
              The current player must share their clue with you.
            </div>
          </div>
        ))}
        {[1, 2, 3, 4].map((n) => (
          <div key={`hangup-${n}`} className="game-card special-card hangup-card">
            <div className="card-icon">&#128532;</div>
            <div className="card-name">Hang Up!</div>
            <div className="card-desc">
              The current player loses their turn and cannot make a call.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
