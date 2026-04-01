import type { DataSet } from '../types';
import { formatPhone } from '../validation';

interface Props {
  data: DataSet;
}

export function GameBoard({ data }: Props) {
  const byLocation = data.locations.map((loc) => ({
    location: loc,
    admirers: data.admirers.filter((a) => a.location === loc),
  }));

  return (
    <div className="printable game-board">
      <div className="print-header">
        <h2>{data.title}</h2>
        <p className="subtitle">Game Reference Board</p>
      </div>

      <div className="board-grid">
        {byLocation.map((group) => (
          <div key={group.location} className="location-group">
            <div className="location-name">{group.location}</div>
            <div className="admirer-row-header">
              <span className="col-name">Name</span>
              <span className="col-phone">Phone</span>
              <span className="col-trait">
                {group.admirers[0]?.food !== null ? 'Food' : 'Activity'}
              </span>
              <span className="col-clothing">Clothing</span>
            </div>
            {group.admirers.map((a) => (
              <div key={a.id} className="admirer-row">
                <span className="col-name">{a.name}</span>
                <span className="col-phone">{formatPhone(a.phoneNumber)}</span>
                <span className="col-trait">{a.food ?? a.activity}</span>
                <span className="col-clothing">{a.clothing}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="board-legend">
        <div className="legend-section">
          <h4>Locations</h4>
          <ul>{data.locations.map((l) => <li key={l}>{l}</li>)}</ul>
        </div>
        <div className="legend-section">
          <h4>Activities</h4>
          <ul>{data.activities.map((a) => <li key={a}>{a}</li>)}</ul>
        </div>
        <div className="legend-section">
          <h4>Foods</h4>
          <ul>{data.foods.map((f) => <li key={f}>{f}</li>)}</ul>
        </div>
        <div className="legend-section">
          <h4>Clothing</h4>
          <ul>{data.clothing.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}
