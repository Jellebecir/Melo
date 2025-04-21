export interface GroupListingItem {
    id: string;
    name: string;
    joinCode: string;
    memberCount: number;
    userRank: number;
    isOwner: boolean;
}

interface GroupListing {
    loading: Ref<boolean>;
    error: Ref<string | null>;
    groups: Ref<GroupListingItem[]>;
}

export const useGroupListing = () => {
    const supabase = useSupabaseClient();
    const loading = ref(false);
    const error = ref<string | null>(null);
    const groups = ref<any[]>([]);

    const fetchGroups = async () => {
        loading.value = true;
        error.value = null;

        const { data, error: fetchError } = await supabase
            .from("user_groups")
            .select("*");

        if (fetchError) {
            error.value = fetchError.message;
        } else {
            groups.value = data || [];
        }
        console.log({ data});
        loading.value = false;
    };

    fetchGroups();

    return {
        loading,
        error,
        groups,
    } as GroupListing;
}
