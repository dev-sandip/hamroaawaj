import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserAdminPage from "./user-admin-page";
import ReportAdminPage from "./report-admin-page";

export default function TabsDemo() {
  return (
    <div className="mt-6 h-full w-full flex justify-center items-center">
      {/* <div className="w-full"> */}
      <Tabs defaultValue="reports">
        <TabsList className="grid w-[200px] grid-cols-2 m-auto">
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="mt-6">
          <UserAdminPage />
        </TabsContent>
        <TabsContent value="reports" className="mt-6">
          <ReportAdminPage />
        </TabsContent>
      </Tabs>
      {/* </div> */}
    </div>
  );
}
