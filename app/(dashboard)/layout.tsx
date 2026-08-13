import AppLayout from "@/components/layout/AppLayout";
import { ProjectProvider } from "@/components/providers/ProjectProvider";
import NotificationProvider from "@/components/providers/NotificationProvider";
import { IssueProvider } from "@/components/providers/IssueProvider";
import { MemberProvider } from "@/components/providers/MemberProvider";
import { ActivityProvider } from "@/components/providers/ActivityProvider";
import { CommentProvider } from "@/components/providers/CommentProvider";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProjectProvider>
      <NotificationProvider>
        <ActivityProvider>
          <CommentProvider>
            <IssueProvider>
              <MemberProvider>
                <AppLayout>{children}</AppLayout>
              </MemberProvider>
            </IssueProvider>
          </CommentProvider>
        </ActivityProvider>
      </NotificationProvider>
    </ProjectProvider>
  );
}
