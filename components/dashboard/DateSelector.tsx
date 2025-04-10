"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { format, startOfWeek, addDays, isSameDay, getDate, getMonth, getYear } from "date-fns";

interface DateSelectorProps {
  onDateChange: (date: Date) => void;
}

export default function DateSelector({ onDateChange }: DateSelectorProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date()));
  const [currentMonth, setCurrentMonth] = useState(format(new Date(), "MMMM yyyy"));

  const generateWeekDates = (start: Date) => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(start, i);
      return {
        fullDate: date,
        day: format(date, "EEE"),
        date: format(date, "d"),
        month: getMonth(date),
        year: getYear(date)
      };
    });
  };

  const [dates, setDates] = useState(generateWeekDates(weekStart));

  const handlePreviousWeek = () => {
    const newStart = addDays(weekStart, -7);
    setWeekStart(newStart);
    setDates(generateWeekDates(newStart));
    setCurrentMonth(format(newStart, "MMMM yyyy"));
  };

  const handleNextWeek = () => {
    const newStart = addDays(weekStart, 7);
    setWeekStart(newStart);
    setDates(generateWeekDates(newStart));
    setCurrentMonth(format(newStart, "MMMM yyyy"));
  };

  useEffect(() => {
    setSelectedDate(new Date());
    setWeekStart(startOfWeek(new Date()));
    setDates(generateWeekDates(startOfWeek(new Date())));
    setCurrentMonth(format(new Date(), "MMMM yyyy"));
  }, []);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <Card className="px-4 py-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-full flex flex-col justify-around">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xl font-semibold text-primary">{currentMonth}</h3>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-9 w-9 hover:bg-primary/10"
            onClick={handlePreviousWeek}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-9 w-9 hover:bg-primary/10"
            onClick={handleNextWeek}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="flex gap-4 justify-between px-2 overflow-x-auto">
        {dates.map((item) => (
          <Button
            key={`${item.date}-${item.month}`}
            variant={isSameDay(selectedDate, item.fullDate) ? "default" : "ghost"}
            className={`flex flex-col text-sm items-center py-8 px-4 rounded-xl transition-all duration-200 ${
              isSameDay(selectedDate, item.fullDate)
                ? "bg-primary text-primary-foreground after:absolute after:bottom-1 after:w-1.5 after:h-1.5 after:rounded-full after:bg-primary-foreground" 
                : "hover:bg-primary/10"
            }`}
            onClick={() => handleDateSelect(item.fullDate)}
          >
            <span className={`text-sm mb-1 ${
              isSameDay(selectedDate, item.fullDate) 
                ? "text-primary-foreground" 
                : "text-muted-foreground"
            }`}>
              {item.day}
            </span>
            <span className="text-lg font-semibold">{item.date}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
}