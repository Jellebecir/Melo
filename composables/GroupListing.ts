export interface GroupListingItem {
    id: string;
    name: string;
    joinCode: string;
    memberCount: number;
    userRank: number;
    isOwner: boolean;
}

interface UseGroupListing {
    loading: Ref<boolean>;
    error: Ref<string | null>;
    groups: Ref<GroupListingItem[]>;
    fetchGroups: () => Promise<void>;
}

export const useGroupListing = (): UseGroupListing => {
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
        
        loading.value = false;
    };

    fetchGroups();

    return {
        loading,
        error,
        groups,
        fetchGroups
    };
}
