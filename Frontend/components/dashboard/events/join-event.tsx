'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Cookies from 'js-cookie'
import { apiUrl } from "@/components/noncomponents";

interface EventJoinee{
    accType: "manager" | "guest";
}

export default function JoinEvent({accType}: EventJoinee){
    const [error, setError] = useState("");
    const [eventId, setEventId] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        if (!eventId.trim()){
            setError("Event Id code is required.");    
        }
          setError("");
          const cookies = Cookies.get("accessToken");
          if (cookies) {
            const session = JSON.parse(cookies);
            const user = session.user;
            const body = {
                user: user,
                accType: accType,
                eventId: eventId
            }
            const response = (await apiUrl.post(`/events/join`, body)).data
            if (response && response.success){
                console.log("entry to the event granted")
            } else {
                console.log("Incorrect credentials provided")
            return
            }
          } else {
            console.log("session logged out")
          }
      } catch (error) {
        console.log("error submitting the form: ", error)
      }
    };
    return (
        <div className="flex justify-center h-2/4">
          <form
            onSubmit={handleSubmit}
            className={cn(
              "w-full max-w-xl p-6 shadow-lg border border-gray-200 rounded-lg bg-white space-y-6"
            )}
          >
            <h1 className="text-xl font-bold text-center text-primary">
              {accType=="manager"? "Manage an Event" : "Attend an Event"}
            </h1>
            <div className="space-y-3">
              <Label htmlFor="event-id" className="text-sm font-medium">
                Event Id
              </Label>
              <Input
                id="event-id"
                type="text"
                placeholder="Enter the Event Id"
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                className="w-full"
              />
              {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={!eventId}
            >
              Submit
            </Button>
          </form>
        </div>
      );
}
