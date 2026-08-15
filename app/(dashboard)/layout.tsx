import AppLayout from "@/components/layout/AppLayout";
import { ProjectProvider } from "@/components/providers/ProjectProvider";
import NotificationProvider from "@/components/providers/NotificationProvider";
import { IssueProvider } from "@/components/providers/IssueProvider";
import { MemberProvider } from "@/components/providers/MemberProvider";
import { ActivityProvider } from "@/components/providers/ActivityProvider";
import { CommentProvider } from "@/components/providers/CommentProvider";
import { TeamProvider } from "@/components/providers/TeamProvider";
import { ProjectResourceProvider } from "@/components/providers/ProjectResourceProvider";
import { ProjectMilestoneProvider } from "../../components/providers/ProjectMilestoneProvider";

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
                <TeamProvider>
                  <ProjectResourceProvider>
                    <ProjectMilestoneProvider>
                      <AppLayout>{children}</AppLayout>
                    </ProjectMilestoneProvider>
                  </ProjectResourceProvider>
                </TeamProvider>
              </MemberProvider>
            </IssueProvider>
          </CommentProvider>
        </ActivityProvider>
      </NotificationProvider>
    </ProjectProvider>
  );
}
