interface RegisterMatch {
    loading: Ref<boolean>;
    registerMatch: (groupId: string, opponentId: string) => PromiseLike<void>;
}

export const useRegisterMatch = (): RegisterMatch => {
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();

    const loading = ref(false);

    const registerMatch = (groupId: string, opponentId: string): PromiseLike<void> => {
        loading.value = true;

        return supabase.rpc('register_match', {
            p_group_id: groupId,
            p_player_1_id: user.value?.id,
            p_player_2_id: opponentId,
            p_winner_id: opponentId,
        }).then(({ error: err }) => {
            loading.value = false;
            if (err) {
                return Promise.reject(err);
            }
        })
    };

    return { 
        loading, 
        registerMatch
    };
}
