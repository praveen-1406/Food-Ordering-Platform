import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi"
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm"

const UserProfilePage = () => {

  const {currentUser,isPending:isGetLoading}=useGetMyUser();
  const {updateUser,isPending:isUpdateLoading}=useUpdateMyUser();

  if(isGetLoading){
    return <span>Loading...</span>;
  }

  if(!currentUser){
    return <span>Unable to load user profile</span>
  }

  return (
    <UserProfileForm 
      currentUser={currentUser}
      onSave={updateUser} 
      isLoading={isUpdateLoading}  
    />
  )
}

export default UserProfilePage
