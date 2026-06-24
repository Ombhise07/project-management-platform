"use client";

import { useEffect, useState } from "react";

import CalendarView from "@/components/calendar/CalendarView";

import { getCalendarEvents } from "@/services/calendar.service";

export default function CalendarPage() {
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await getCalendarEvents();

        setEvents(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Calendar</h1>

      <CalendarView events={events} />
    </div>
  );
}
