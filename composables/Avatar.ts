interface UseAvatar {
  id: string;
  name: string;
  avatar_url: string;
}

export const useAvatar = async (): Promise<UseAvatar> => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const emptyAvatar = {
    id: "",
    name: "Unauthenticated User",
    avatar_url: "https://ui-avatars.com/api/?name=User",
  };

  if (!user.value) {
    return emptyAvatar;
  }

  const { data: profileData, error } = await supabase.from('profiles').select('id, full_name, avatar_url').eq('id', user.value.id).single()

  if (error) {
    return emptyAvatar;
  }

  return {
    id: profileData.id,
    name: profileData.full_name,
    avatar_url: profileData.avatar_url ?? emptyAvatar.avatar_url,
  }
}
