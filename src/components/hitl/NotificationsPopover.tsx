import { useState } from "react";
import { Bell, AlertTriangle, AlertCircle, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { hitlNotifications, HITLNotification } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const priorityConfig = {
  high: {
    icon: AlertTriangle,
    badgeClass: "bg-destructive/20 text-destructive border-destructive/30",
    label: "HIGH",
  },
  medium: {
    icon: AlertCircle,
    badgeClass: "bg-warning/20 text-warning border-warning/30",
    label: "MED",
  },
  low: {
    icon: Clock,
    badgeClass: "bg-muted text-muted-foreground border-muted",
    label: "LOW",
  },
};

const typeIcons = {
  new_task: AlertCircle,
  priority_escalation: AlertTriangle,
  sla_warning: Clock,
  assignment: CheckCircle,
};

export function NotificationsPopover() {
  const [notifications, setNotifications] = useState<HITLNotification[]>(hitlNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  // Sort by priority (high first), then by unread status
  const sortedNotifications = [...notifications].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    // Unread first within same priority
    if (a.isRead !== b.isRead) return a.isRead ? 1 : -1;
    return 0;
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end" sideOffset={8}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold">Notifications</h4>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <ScrollArea className="h-[360px]">
          {sortedNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Bell className="h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {sortedNotifications.map((notification) => {
                const config = priorityConfig[notification.priority];
                const TypeIcon = typeIcons[notification.type];

                return (
                  <button
                    key={notification.id}
                    onClick={() => handleMarkAsRead(notification.id)}
                    className={cn(
                      "w-full px-4 py-3 text-left transition-colors hover:bg-muted/50",
                      !notification.isRead && "bg-primary/5"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {/* Priority Indicator */}
                      <div
                        className={cn(
                          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                          notification.priority === "high" && "bg-destructive/20 text-destructive",
                          notification.priority === "medium" && "bg-warning/20 text-warning",
                          notification.priority === "low" && "bg-muted text-muted-foreground"
                        )}
                      >
                        <TypeIcon className="h-3.5 w-3.5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <Badge
                            variant="outline"
                            className={cn("h-5 px-1.5 text-[10px] font-semibold", config.badgeClass)}
                          >
                            {config.label}
                          </Badge>
                          <span className="text-xs font-medium text-foreground truncate">
                            {notification.taskId}
                          </span>
                          {notification.relatedCandidate && (
                            <span className="text-xs text-muted-foreground truncate">
                              - {notification.relatedCandidate}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground/70 mt-1">
                          {notification.createdAt}
                        </p>
                      </div>

                      {/* Unread Indicator */}
                      {!notification.isRead && (
                        <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="border-t border-border p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs text-muted-foreground hover:text-foreground"
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
            >
              Mark all as read
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
