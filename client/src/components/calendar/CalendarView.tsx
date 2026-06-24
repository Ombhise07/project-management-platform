"use client";

import { useState } from "react";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";

import { format, parse, startOfWeek, getDay } from "date-fns";

import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarView({ events }: { events: any[] }) {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>("month");

  // for overdue
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const calendarEvents = events.map((event) => ({
    title: event.title,

    start: new Date(event.date),

    end: new Date(new Date(event.date).getTime() + 60 * 60 * 1000),

    resource: {
      ...event,

      isOverdue: event.type === "TASK" && new Date(event.date) < new Date(),
    },
  }));

  // Overdue for showing different colours for different dates
  const eventStyleGetter = (event: any) => {
    if (event.resource?.isOverdue) {
      return {
        style: {
          backgroundColor: "#dc2626",
        },
      };
    }

    if (event.resource?.type === "PROJECT_END") {
      return {
        style: {
          backgroundColor: "#7c3aed",
        },
      };
    }

    if (event.resource?.type === "PROJECT_START") {
      return {
        style: {
          backgroundColor: "#059669",
        },
      };
    }

    return {};
  };

  return (
    <div className="h-[700px]">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(event) => setSelectedEvent(event.resource)}
        date={date}
        onNavigate={(newDate) => setDate(newDate)}
        view={view}
        onView={(newView) => setView(newView)}
        views={["month", "week", "day"]}
      />

      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="w-96 rounded bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">{selectedEvent.title}</h2>

            <p>
              <strong>Type:</strong> {selectedEvent.type}
            </p>

            {selectedEvent.project && (
              <p>
                <strong>Project:</strong> {selectedEvent.project}
              </p>
            )}

            {selectedEvent.priority && (
              <p>
                <strong>Priority:</strong> {selectedEvent.priority}
              </p>
            )}

            <p>
              <strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}
            </p>

            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
