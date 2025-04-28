interface CreateGroup {
    error: Ref<string | null>;
    loading: Ref<boolean>;
    createGroup: (groupName: string) => PromiseLike<string>;
}

export const useCreateGroup = (): CreateGroup => {
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();
    
    const error = ref<string | null>(null);
    const loading = ref(false);

    const createGroup = async (groupName: string) => {
        loading.value = true;
        error.value = null;
        
        if (!user.value) {
            error.value = "Not logged in"
            return Promise.reject("Not logged in");
        }

        if (!groupName) {
            error.value = "Group name is required";
            loading.value = false;
            return Promise.reject("Group name is required");
        }

        return supabase.rpc("create_group", {
            name: groupName
        }).then(({ data, error: createError }) => {
            loading.value = false;
            if (createError) {
                error.value = createError.message;
            }
            return Promise.resolve(data as unknown as string);
        })
    }

    return {
        error,
        loading,
        createGroup
    }
}
