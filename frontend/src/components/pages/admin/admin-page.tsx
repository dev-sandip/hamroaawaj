import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserAdminPage from "./user-admin-page";
import ReportAdminPage from "./report-admin-page";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CompletReportPage from "./complete-report-page";

const tabs = ["reports", "users", "complete"];

export default function AdminPage() {
  const { q } = useParams() as { q: string };
  const [tab, setTab] = useState(tabs.includes(q) ? q : "reports");
  const navigate = useNavigate();

  const handleChange = (value: string) => {
    setTab(value);
    navigate(`/dashboard/${value}`);
  };

  return (
    <div className="mt-6 h-full w-full flex justify-center items-center">
      {/* <div className="w-full"> */}
      <Tabs defaultValue="reports" value={tab} onValueChange={handleChange}>
        <TabsList className="grid w-[300px] grid-cols-3 m-auto">
          {tabs.map((tab) => (
            <TabsTrigger value={tab} key={tab}>
              {tab.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="users" className="mt-6">
          <UserAdminPage />
        </TabsContent>
        <TabsContent value="reports" className="mt-6">
          <ReportAdminPage />
        </TabsContent>
        <TabsContent value="complete" className="mt-6">
          <CompletReportPage />
        </TabsContent>
      </Tabs>
      {/* </div> */}
    </div>
  );
}
