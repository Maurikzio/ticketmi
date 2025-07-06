
import { format } from "date-fns";
import { getOrganizationsByUser } from "../query/get-organizations-by-user";
import { redirect } from "next/navigation";

const OrganizationList = async () => {
  const organizationsUser = await getOrganizationsByUser();

  if (!organizationsUser.length) {
    redirect('/onboarding')
  }

  return (
    <div>
      {organizationsUser.map((uo) => (
        <div key={uo.organization.id}>
          <div>Name: {uo.organization.name}</div>
          <div>Joined at: {format(uo.joinedAt, "yyy-MM-dd , HH:mm")}</div>
        </div>
      ))}
    </div>
  )
}
export default OrganizationList;
