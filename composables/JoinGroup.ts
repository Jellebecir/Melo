interface JoinGroupResponse {
    loading: Ref<boolean>;
    error: Ref<string | null>;
    joinGroup: (joinCode: string) => PromiseLike<string>;
};

export const useJoinGroup = (): JoinGroupResponse => {
    const supabase = useSupabaseClient();
    const loading = ref(false);
    const error = ref<string | null>(null);

    const joinGroup = (joinCode: string) => {
        loading.value = true;

        if (!joinCode) {
            error.value = "Join code is required";
            loading.value = false;
            return Promise.reject("Join code is required");
        }

        return supabase.rpc("join_group_by_code", { code: joinCode })
            .then(({data: groupId, error: joinError}) => {
                if (joinError) {
                    error.value = joinError.message;
                }
                
                loading.value = false;
                return Promise.resolve(groupId as unknown as string);
            });
    }

    return {
        loading,
        error,
        joinGroup,
    };
}
