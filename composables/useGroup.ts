export const useGroup = () => {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    const groups = ref([]) // reactive list of user’s groups
    const loading = ref(false)
    const error = ref<string | null>(null)

    // Fetch all groups the user is a member of
    const getUserGroups = async () => {
        loading.value = true
        error.value = null

        if (!user.value) {
            error.value = "Not logged in"
            loading.value = false
            return
        }

        const { data, error: err } = await supabase
            .from("user_groups")
            .select("*")

        if (err) {
            error.value = err.message
        } else {
            groups.value = data;
        }

        loading.value = false
    }

    // Create a group and auto-join as owner
    const createGroup = async (name: string) => {
        if (!user.value) {
            error.value = "Not logged in"
            return
        }

        const { error: createError } = await supabase.rpc("create_group", {
            group_name: name
        })

        if (createError) console.error("Error:", createError.message)
        await getUserGroups() // refresh the list
    }

    return {
        groups,
        loading,
        error,
        getUserGroups,
        createGroup,
    }
}
