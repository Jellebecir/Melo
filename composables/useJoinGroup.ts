interface JoinGroupResponse {
    loading: Ref<boolean>;
    error: Ref<string | null>;
    join: (joinCode: string) => Promise<void>;
    onSuccess: (callback: () => void) => void;
};

export const useJoinGroup = (): JoinGroupResponse => {
    const supabase = useSupabaseClient();
    const loading = ref(false);
    const error = ref<string | null>(null);

    const join = (joinCode: string) => {
        loading.value = true;

        if (!joinCode) {
            error.value = "Join code is required";
            loading.value = false;
            return Promise.resolve();
        }

        return supabase.rpc("join_group_by_code", { code: joinCode })
            .then(({error: joinError}) => {
                if (joinError) {
                    error.value = joinError.message;
                }
                loading.value = false;
            }) as Promise<void>;
    }

    const onSuccess = (callback: () => void) => {
        watch(loading, (newLoading) => {
            if (!newLoading && !error.value) {
                // If loading is false and there is no error, call the success callback
                callback();
            }
        });
    }

    return {
        loading,
        error,
        join,
        onSuccess
    };
}
