import { OrganizationProvider } from "@/components/organization-context";
import { TeamList } from "@/components/team-list";

export default function Home() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Teams Dashboard</h1>
      <OrganizationProvider>
        <TeamList />
      </OrganizationProvider>
    </div>
  );
}
