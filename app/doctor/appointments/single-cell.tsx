import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Video, MapPin, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const AppointmentCell = () => {
  return (
    <Card className="p-4">
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src="/patient-avatar.png" />
          <AvatarFallback>PT</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">John Smith</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-3 w-3" />
                <span>+91 9876543210</span>
              </div>
            </div>
            <Badge variant={getStatusVariant("UPCOMING")}>Upcoming</Badge>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Thursday, March 21, 2024</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>10:30 AM</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Video className="h-4 w-4 text-muted-foreground" />
              <span>Video Consultation</span>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm">Reschedule</Button>
            <Button variant="outline" size="sm">Cancel</Button>
            <Button size="sm">Start Consultation</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "UPCOMING":
      return "default";
    case "PENDING":
      return "secondary";
    case "COMPLETED":
      return "secondary";
    case "CANCELLED":
      return "destructive";
    default:
      return "outline";
  }
};

export default AppointmentCell;
