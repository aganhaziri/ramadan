'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  ramadanSchedule,
  ramadanStartDate,
  ramadanEndDate,
  eidInfo,
  type RamadanDay,
} from './data/ramadanSchedule';
import { useLanguage } from './context/LanguageContext';
import { useCity } from './context/CityContext';
import { applyTimeOffset, getScheduleForDate } from './utils/timeUtils';

// Prayer time icons (inline SVG)
function PrayerIcon(type: string) {
  const icons: Record<string, JSX.Element> = {
    imsak: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
    fajr: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    sunrise: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 18a5 5 0 0 0-10 0" />
        <line x1="12" y1="2" x2="12" y2="9" />
        <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
        <line x1="1" y1="18" x2="3" y2="18" />
        <line x1="21" y1="18" x2="23" y2="18" />
        <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
        <line x1="23" y1="22" x2="1" y2="22" />
      </svg>
    ),
    dhuhr: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
    asr: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v10l4-4" />
        <path d="M12 12l-4 4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    maghrib: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 18a5 5 0 0 0-10 0" />
        <line x1="12" y1="9" x2="12" y2="2" />
        <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
        <line x1="1" y1="18" x2="3" y2="18" />
        <line x1="21" y1="18" x2="23" y2="18" />
        <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
      </svg>
    ),
    isha: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  };
  return icons[type] ?? null;
}

function SuhoorIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

function IftarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2" />
      <path d="M17 18a5 5 0 0 0-10 0" />
      <line x1="12" y1="12" x2="12" y2="22" />
    </svg>
  );
}

function NotesIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
    </svg>
  );
}

function EidIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L14.5 8.5L21 9l-5.5 4.5L17 21l-5-3.5L7 21l1.5-7.5L3 9l6.5-.5L12 2z" />
    </svg>
  );
}

function getAdjustedSchedule(day: RamadanDay, offsetMinutes: number) {
  return {
    ...day,
    imsak: applyTimeOffset(day.imsak, offsetMinutes),
    sabah: applyTimeOffset(day.sabah, offsetMinutes),
    lindjaDiellit: applyTimeOffset(day.lindjaDiellit, offsetMinutes),
    dreka: applyTimeOffset(day.dreka, offsetMinutes),
    ikindia: applyTimeOffset(day.ikindia, offsetMinutes),
    aksham: applyTimeOffset(day.aksham, offsetMinutes),
    jacia: applyTimeOffset(day.jacia, offsetMinutes),
  };
}

function getNextMealTime(
  currentTime: string,
  todaySchedule: RamadanDay,
  offsetMinutes: number,
  scheduleIndex: number
) {
  if (!todaySchedule || !todaySchedule.imsak || !todaySchedule.aksham) {
    return null;
  }

  const adj = getAdjustedSchedule(todaySchedule, offsetMinutes);

  if (currentTime > adj.aksham) {
    const nextDay = ramadanSchedule[scheduleIndex + 1];
    if (nextDay?.imsak) {
      return {
        name: 'Suhoor',
        time: applyTimeOffset(nextDay.imsak, offsetMinutes),
      };
    }
    return null;
  }

  if (currentTime < adj.imsak) {
    return { name: 'Suhoor', time: adj.imsak };
  }

  return { name: 'Iftar', time: adj.aksham };
}

function calculateTimeDifference(targetTime: string): string {
  const [targetHours, targetMinutes] = targetTime.split(':').map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(targetHours, targetMinutes, 0);

  if (target < now) {
    target.setDate(target.getDate() + 1);
  }

  const diff = target.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export default function Home() {
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [nextMealTime, setNextMealTime] = useState('');
  const [nextMealType, setNextMealType] = useState<'Suhoor' | 'Iftar'>('Suhoor');
  const [currentTime, setCurrentTime] = useState('');
  const [todaySchedule, setTodaySchedule] = useState<RamadanDay | null>(null);
  const [isRamadan, setIsRamadan] = useState(true);
  const [showDua, setShowDua] = useState(false);

  const { t } = useLanguage();
  const { selectedCity } = useCity();

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const currentTimeStr = format(now, 'HH:mm');
      setCurrentTime(format(now, 'HH:mm:ss'));

      const schedule = getScheduleForDate(ramadanSchedule, now);
      const inRamadan =
        now >= ramadanStartDate && now <= ramadanEndDate && schedule;

      setIsRamadan(!!inRamadan);

      if (schedule) {
        const adj = getAdjustedSchedule(schedule, selectedCity.offsetMinutes);
        setTodaySchedule(adj);

        const scheduleIndex = ramadanSchedule.findIndex(
          (d) =>
            d.dateObj.getTime() === schedule.dateObj.getTime()
        );

        const next = getNextMealTime(
          currentTimeStr,
          schedule,
          selectedCity.offsetMinutes,
          scheduleIndex
        );

        if (next) {
          setNextMealType(next.name as 'Suhoor' | 'Iftar');
          setNextMealTime(next.time);
          const timeLeft = calculateTimeDifference(next.time);
          const [timeHours, timeMinutes, timeSeconds] = timeLeft.split(':');
          setHours(timeHours);
          setMinutes(timeMinutes);
          setSeconds(timeSeconds);
        } else {
          setHours('0');
          setMinutes('00');
          setSeconds('00');
          setNextMealTime('');
        }
      } else {
        setTodaySchedule(null);
      }
    };

    const interval = setInterval(updateTimes, 1000);
    updateTimes();

    return () => clearInterval(interval);
  }, [selectedCity.offsetMinutes]);

  const getMealTranslation = (meal: string) => {
    if (meal === 'Suhoor') return t.meals.Suhoor;
    return t.meals.Iftar;
  };

  const defaultSchedule =
    ramadanSchedule[0] &&
    getAdjustedSchedule(ramadanSchedule[0], selectedCity.offsetMinutes);

  const displaySchedule = todaySchedule ?? defaultSchedule;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pb-12 pt-2">
      {/* City & Time Badge */}
      <div className="location-badge">
        <CitySelector />
        <p className="current-time">{currentTime}</p>
      </div>

      <div className="w-full max-w-7xl px-4 text-center space-y-10 overflow-x-hidden">
        {/* Dua e Iftarit - Collapsible */}
        <div className="dua-section">
          <button
            onClick={() => setShowDua(!showDua)}
            className="dua-toggle"
            aria-expanded={showDua}
          >
            <span className="dua-icon">🌙</span>
            {t.duaIftarit}
            <span className={`dua-chevron ${showDua ? 'open' : ''}`}>▼</span>
          </button>
          {showDua && (
            <div className="dua-content">
              <p className="dua-text">&ldquo;{t.duaText}&rdquo;</p>
            </div>
          )}
        </div>

        {/* Countdown */}
        {isRamadan && displaySchedule && nextMealTime && (
          <div className="countdown-section">
            <h1 className="countdown-title">
              {t.timeUntil} {getMealTranslation(nextMealType)}
            </h1>

            <div className="countdown-display">
              <div className="time-block">
                <span className="time-number">{hours}</span>
              </div>
              <span className="time-separator">:</span>
              <div className="time-block">
                <span className="time-number">{minutes}</span>
              </div>
              <span className="time-separator">:</span>
              <div className="time-block">
                <span className="time-number">{seconds}</span>
              </div>
            </div>

            <div className="next-prayer">
              {getMealTranslation(nextMealType)} {t.startsAt}
              <div
                className={`next-prayer-time ${
                  nextMealType === 'Suhoor'
                    ? 'prayer-time-imsak'
                    : 'prayer-time-aksham'
                }`}
              >
                {nextMealTime}
              </div>
            </div>
          </div>
        )}

        {/* Eid Banner when not in Ramadan */}
        {!isRamadan && (
          <div className="eid-banner">
            <h2 className="eid-banner-title">{t.eidTitle}</h2>
            <p className="eid-banner-date">{t.eidDate}</p>
            <p className="eid-banner-prayer">{t.eidPrayer}</p>
          </div>
        )}

        {/* Prayer Times Grid - overflow hidden to prevent info-box from crashing layout */}
        {displaySchedule && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto px-4 w-full min-w-0 overflow-x-hidden">
            {/* Left: Prayer Times in centered boxes */}
            <div className="prayer-card prayer-card-centered">
              <h3 className="prayer-card-title">
                {t.prayerTimes}
              </h3>
              <div className="prayer-boxes-grid">
                {[
                  {
                    name: 'Imsak',
                    time: displaySchedule.imsak,
                    highlight: true,
                    icon: 'imsak',
                  },
                  { name: 'Fajr', time: displaySchedule.sabah, highlight: false, icon: 'fajr' },
                  { name: 'Sunrise', time: displaySchedule.lindjaDiellit, highlight: false, icon: 'sunrise' },
                  { name: 'Dhuhr', time: displaySchedule.dreka, highlight: false, icon: 'dhuhr' },
                  { name: 'Asr', time: displaySchedule.ikindia, highlight: false, icon: 'asr' },
                  {
                    name: 'Maghrib',
                    time: displaySchedule.aksham,
                    highlight: true,
                    icon: 'maghrib',
                  },
                  { name: 'Isha', time: displaySchedule.jacia, highlight: false, icon: 'isha' },
                ].map(({ name, time, highlight, icon }) => (
                  <div key={name} className="prayer-box">
                    <span className="prayer-box-icon">{PrayerIcon(icon)}</span>
                    <span className="prayer-box-label">
                      {t.prayers[name as keyof typeof t.prayers]}
                    </span>
                    <span className={`prayer-box-time ${highlight ? 'prayer-time-highlight' : ''}`}>
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Fasting Times + Day Info - Split boxes with icons */}
            <div className="today-section">
              <h3 className="today-section-title">
                {t.today}
                {displaySchedule.date && ` · ${displaySchedule.date}`}
              </h3>

              <div className="fasting-boxes">
                <div className="fast-box fast-box-suhoor">
                  <div className="fast-box-icon">
                    <SuhoorIcon />
                  </div>
                  <div className="fast-box-content">
                    <span className="fast-box-label">{t.startOfFast}</span>
                    <span className="fast-box-time prayer-time-imsak">
                      {displaySchedule.imsak}
                    </span>
                  </div>
                </div>

                <div className="fast-box fast-box-iftar">
                  <div className="fast-box-icon">
                    <IftarIcon />
                  </div>
                  <div className="fast-box-content">
                    <span className="fast-box-label">{t.endOfFast}</span>
                    <span className="fast-box-time prayer-time-aksham">
                      {displaySchedule.aksham}
                    </span>
                  </div>
                </div>
              </div>

              {displaySchedule.notes && (
                <div className="info-box info-box-notes">
                  <div className="info-box-icon">
                    <NotesIcon />
                  </div>
                  <p className="info-box-text">{displaySchedule.notes}</p>
                </div>
              )}

              <div className="info-box info-box-eid">
                <div className="info-box-icon">
                  <EidIcon />
                </div>
                <div className="info-box-content">
                  <span className="info-box-label">{t.eidTitle} - {eidInfo.date}</span>
                  <span className="info-box-detail">{t.eidPrayer}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CitySelector() {
  const { selectedCity, setSelectedCity, cities } = useCity();
  const { t } = useLanguage();

  return (
    <div className="city-selector">
      <label htmlFor="city-select" className="sr-only">
        {t.selectCity}
      </label>
      <select
        id="city-select"
        value={selectedCity.id}
        onChange={(e) => {
          const city = cities.find((c) => c.id === e.target.value);
          if (city) setSelectedCity(city);
        }}
        className="city-select-input"
      >
        {cities.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
            {c.offsetMinutes !== 0
              ? ` (${c.offsetMinutes > 0 ? '+' : ''}${c.offsetMinutes} min)`
              : ''}
          </option>
        ))}
      </select>
    </div>
  );
}
