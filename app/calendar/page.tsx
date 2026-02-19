'use client';

import { useState } from 'react';
import {
  ramadanSchedule,
  cityAdjustments,
  eidInfo,
  type RamadanDay,
} from '../data/ramadanSchedule';
import { useCity } from '../context/CityContext';
import { applyTimeOffset } from '../utils/timeUtils';

function Modal({
  day,
  onClose,
  offsetMinutes,
}: {
  day: RamadanDay;
  onClose: () => void;
  offsetMinutes: number;
}) {
  const adj = {
    imsak: applyTimeOffset(day.imsak, offsetMinutes),
    sabah: applyTimeOffset(day.sabah, offsetMinutes),
    lindjaDiellit: applyTimeOffset(day.lindjaDiellit, offsetMinutes),
    dreka: applyTimeOffset(day.dreka, offsetMinutes),
    ikindia: applyTimeOffset(day.ikindia, offsetMinutes),
    aksham: applyTimeOffset(day.aksham, offsetMinutes),
    jacia: applyTimeOffset(day.jacia, offsetMinutes),
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-container">
        <div className="modal-header">
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="modal-title">{day.date}</h2>
          <p className="modal-subtitle">
            {day.day} · Dita {day.ramadanDay} e Ramazanit
          </p>

          {day.notes && (
            <div className="modal-note">
              <p>{day.notes}</p>
            </div>
          )}
        </div>

        <div className="modal-content">
          <div className="prayer-times-grid">
            <div className="prayer-times-grid-row">
              <div className="prayer-time-card">
                <div className="prayer-time-header">
                  <div>
                    <div className="prayer-name">Imsaku</div>
                    <div className="prayer-description">Fillimi i Agjërimit</div>
                  </div>
                  <div className="prayer-time-imsak">{adj.imsak}</div>
                </div>
              </div>
              <div className="prayer-time-card">
                <div className="prayer-time-header">
                  <div>
                    <div className="prayer-name">Sabahu</div>
                    <div className="prayer-description">Namazi i Sabahut</div>
                  </div>
                  <div className="prayer-time">{adj.sabah}</div>
                </div>
              </div>
              <div className="prayer-time-card">
                <div className="prayer-time-header">
                  <div>
                    <div className="prayer-name">Lindja e Diellit</div>
                  </div>
                  <div className="prayer-time">{adj.lindjaDiellit}</div>
                </div>
              </div>
              <div className="prayer-time-card">
                <div className="prayer-time-header">
                  <div>
                    <div className="prayer-name">Dreka</div>
                    <div className="prayer-description">Namazi i Drekës</div>
                  </div>
                  <div className="prayer-time">{adj.dreka}</div>
                </div>
              </div>
            </div>
            <div className="prayer-times-grid-row">
              <div className="prayer-time-card">
                <div className="prayer-time-header">
                  <div>
                    <div className="prayer-name">Ikindia</div>
                    <div className="prayer-description">Namazi i Ikindisë</div>
                  </div>
                  <div className="prayer-time">{adj.ikindia}</div>
                </div>
              </div>
              <div className="prayer-time-card">
                <div className="prayer-time-header">
                  <div>
                    <div className="prayer-name">Akshami</div>
                    <div className="prayer-description">Përfundimi i Agjërimit</div>
                  </div>
                  <div className="prayer-time-aksham">{adj.aksham}</div>
                </div>
              </div>
              <div className="prayer-time-card">
                <div className="prayer-time-header">
                  <div>
                    <div className="prayer-name">Jacia</div>
                    <div className="prayer-description">Namazi i Jacisë</div>
                  </div>
                  <div className="prayer-time">{adj.jacia}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Calendar() {
  const [selectedDay, setSelectedDay] = useState<RamadanDay | null>(null);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const { selectedCity, setSelectedCity } = useCity();

  // Feb 19, 2026 = Thursday = 4th day (0=Sun, 4=Thu)
  const START_OFFSET = 4;
  const calendarDays: (RamadanDay | null)[] = [];
  for (let i = 0; i < START_OFFSET; i++) {
    calendarDays.push(null);
  }
  calendarDays.push(...ramadanSchedule);
  while (calendarDays.length < 42) {
    calendarDays.push(null);
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Kalendari i Ramazanit 2026 / 1447H</h1>
        <div className="header-right">
          <div className="city-pill">
            <select
              value={selectedCity.id}
              onChange={(e) => {
                const city = cityAdjustments.find((c) => c.id === e.target.value);
                if (city) setSelectedCity(city);
              }}
              className="city-pill-select"
            >
              {cityAdjustments.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="view-buttons">
            <button
              onClick={() => setView('calendar')}
              className={`view-button ${view === 'calendar' ? 'active' : ''}`}
            >
              Pamja e Kalendarit
            </button>
            <button
              onClick={() => setView('list')}
              className={`view-button ${view === 'list' ? 'active' : ''}`}
            >
              Pamja e Listës
            </button>
          </div>
        </div>
      </div>

      <div className="eid-info-bar">
        <span>Fitër Bajrami: {eidInfo.date}</span>
        <span>Namazi: {eidInfo.prayerTime}</span>
      </div>

      {view === 'calendar' ? (
        <div className="calendar-container">
          <div className="calendar-header">
            {['D', 'H', 'M', 'M', 'E', 'P', 'Sh'].map((day) => (
              <div key={day} className="calendar-header-cell">
                {day}
              </div>
            ))}
          </div>

          <div className="calendar-grid">
            {calendarDays.map((day, index) => (
              <div key={index} className={day ? 'calendar-day' : 'calendar-day-empty'}>
                {day ? (
                  <button
                    onClick={() => setSelectedDay(day)}
                    className="calendar-day-button"
                  >
                    <div className="day-header">
                      <span className={`day-number ${day.notes ? 'has-note' : ''}`}>
                        {day.date.split(' ')[0]}
                      </span>
                      {day.notes && <span className="note-indicator"></span>}
                    </div>
                    <div className="day-times">
                      <div className="time-row">
                        <span className="time-imsak">
                          {applyTimeOffset(day.imsak, selectedCity.offsetMinutes)}
                        </span>
                        <span className="time-label">Imsaku</span>
                      </div>
                      <div className="time-row">
                        <span className="time-iftar">
                          {applyTimeOffset(day.aksham, selectedCity.offsetMinutes)}
                        </span>
                        <span className="time-label">Iftari</span>
                      </div>
                    </div>
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="list-container">
          <div style={{ overflowX: 'auto' }}>
            <table className="list-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Dita</th>
                  <th>Imsaku</th>
                  <th>Sabahu</th>
                  <th>Lindja e Diellit</th>
                  <th>Dreka</th>
                  <th>Ikindia</th>
                  <th>Akshami</th>
                  <th>Jacia</th>
                  <th>Shënime</th>
                </tr>
              </thead>
              <tbody>
                {ramadanSchedule.map((day) => (
                  <tr key={day.date} onClick={() => setSelectedDay(day)}>
                    <td>{day.date}</td>
                    <td>{day.day}</td>
                    <td className="list-time list-time-highlight">
                      {applyTimeOffset(day.imsak, selectedCity.offsetMinutes)}
                    </td>
                    <td className="list-time">
                      {applyTimeOffset(day.sabah, selectedCity.offsetMinutes)}
                    </td>
                    <td className="list-time">
                      {applyTimeOffset(day.lindjaDiellit, selectedCity.offsetMinutes)}
                    </td>
                    <td className="list-time">
                      {applyTimeOffset(day.dreka, selectedCity.offsetMinutes)}
                    </td>
                    <td className="list-time">
                      {applyTimeOffset(day.ikindia, selectedCity.offsetMinutes)}
                    </td>
                    <td className="list-time list-time-highlight">
                      {applyTimeOffset(day.aksham, selectedCity.offsetMinutes)}
                    </td>
                    <td className="list-time">
                      {applyTimeOffset(day.jacia, selectedCity.offsetMinutes)}
                    </td>
                    <td>
                      {day.notes && (
                        <span className="list-note">{day.notes}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedDay && (
        <Modal
          day={selectedDay}
          onClose={() => setSelectedDay(null)}
          offsetMinutes={selectedCity.offsetMinutes}
        />
      )}
    </div>
  );
}
