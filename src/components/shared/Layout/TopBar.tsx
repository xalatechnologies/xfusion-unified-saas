import { ApplicationSwitcher } from "@/components/shared/ApplicationSwitcher";
import { SearchBar } from "./SearchBar";
import { HelpButton } from "./HelpButton";
import { NotificationButton } from "./NotificationButton";
import { UserMenu } from "./UserMenu";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";

export const TopBar = () => {
  return (
    <TooltipProvider>
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 h-20 p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-shrink-0">
            <ApplicationSwitcher />
          </div>
          
          <SearchBar />

          <div className="flex items-center gap-3 flex-shrink-0">
            <HelpButton />
            <NotificationButton />
            <div className="h-6 w-px bg-border mx-2" />
            <UserMenu />
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
};
