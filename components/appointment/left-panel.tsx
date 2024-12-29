import { useLocale } from "@react-aria/i18n";
import { CalendarIcon, Clock4, MapPin, Stethoscope } from "lucide-react";
import { useSearchParams } from "next/navigation";

export function LeftPanel({
  showForm,
  timeZone,
  setTimeZone,
}: {
  showForm: boolean | null;
  timeZone: string;
  setTimeZone: (timeZone: string) => void;
}) {
  const { locale } = useLocale();

  const searchParams = useSearchParams();
  const slotParam = searchParams.get("slot");

  return (
    <div className="flex flex-col gap-4 w-[275px] border-r pr-6 ">
      <div className="grid gap-1">
        <p className="text-gray-11 text-sm font-semibold">WeCare</p>
      </div>
      <div className="grid gap-3">
        <p className="text-gray-12 text-xl font-bold">Standard Checkup</p>
        {!showForm && (
          <div className="flex text-gray-12 items-center">
            <CalendarIcon className="size-4 mr-2" />
            <div className="flex flex-col text-sm font-semibold">
              <p>
                {new Date(slotParam as string).toLocaleString(locale, {
                  dateStyle: "full",
                })}
              </p>
              <p>
                {new Date(slotParam as string).toLocaleString(locale, {
                  timeStyle: "short",
                })}
              </p>
            </div>
          </div>
        )}
        <div className="flex items-center text-gray-12">
          <Clock4 className="size-4 mr-2" />
          <p className="text-sm font-semibold">30 mins</p>
        </div>
        <div className="flex items-center text-gray-12">
          <Stethoscope className="size-4 mr-2" />
          <p className="text-sm font-semibold">Dr. Sainath Reddy</p>
        </div>
        <div className="flex items-center text-gray-12">
          <MapPin className="size-4 mr-2" />
          <p className="text-sm font-semibold">WeCare Hospitals</p>
        </div>
      </div>
    </div>
  );
}
