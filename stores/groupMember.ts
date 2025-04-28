import { defineStore } from 'pinia'

export const useGroupMemberStore = defineStore('groupMember', () => {
    const supabase = useSupabaseClient();
    const supabaseUser = useSupabaseUser();

    const error = ref<string | null>(null);
    const loading = ref(false);
    const groupMember = ref();

    const getActiveGroupMember = (groupId: string) => {
        loading.value = true;
        error.value = null;

        if (!supabaseUser.value) {
            error.value = "Not logged in";
            loading.value = false;
            return Promise.reject("Not logged in");
        }

        return supabase
            .from('group_members')
            .select('*')
            .eq('user_id', supabaseUser.value.id)
            .eq('group_id', groupId)
            .single()
            .then(({ data, error: fetchError }) => {
                loading.value = false;
                if (fetchError) {
                    console.log('Error fetching group member:', fetchError.message);
                    error.value = fetchError.message;
                } else {
                    error.value = null;
                    groupMember.value = data;
                    return data;
                }
            });
    }

    return {
        error,
        loading,
        groupMember,
        getActiveGroupMember,
    }
})
