import { redirect } from "next/navigation";
import { events } from "../lib/content";

// There is a single event, so the listing goes straight to its page.
export default function EventsPage() {
  redirect(`/events/${events[0].slug}`);
}
