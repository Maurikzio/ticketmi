
import { format } from "date-fns";
import { getOrganizationsByUser } from "../query/get-organizations-by-user";

const OrganizationList = async () => {
  const organizationsUser = await getOrganizationsByUser();
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
