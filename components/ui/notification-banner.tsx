import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface NotificationBannerProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
  icon?: React.ReactNode;
}

export function NotificationBanner({
  title,
  description,
  buttonText,
  onButtonClick,
  icon = <AlertCircle className="h-4 w-4 text-primary" />,
}: NotificationBannerProps) {
  return (
    <Alert className="mb-6 bg-primary/10 border-primary/20">
      {icon}
      <AlertTitle className="text-primary">{title}</AlertTitle>
      <div className="flex items-center justify-between">
        <AlertDescription className="text-primary/90">
          {description}
        </AlertDescription>
        {buttonText && onButtonClick && (
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-4"
            onClick={onButtonClick}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </Alert>
  );
}