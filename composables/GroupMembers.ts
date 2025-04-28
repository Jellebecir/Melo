export const useGroupMembers = () => {
    const supabase = useSupabaseClient();

    const members = ref([]);
    const loading = ref(true);
    const error = ref<string | null>(null);

    const getGroupMembers = async (groupId: string) => {
        loading.value = true;
        return supabase.from('group_member_overview')
            .select("*")
            .eq("group_id", groupId)
            .then(({ data, error: fetchError }) => {
                loading.value = false;
                if (fetchError) {
                    console.error('Error fetching group members:', fetchError.message);
                    error.value = fetchError.message;
                } else {
                    members.value = data;
                    return data;
                }
            });
    }

    return {
        members,
        loading,
        getGroupMembers,
    }
}
