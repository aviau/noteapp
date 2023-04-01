import { useMutation } from '@tanstack/vue-query';
import { invoke } from '@tauri-apps/api/tauri';

export const useGreetMutation = () => {

    return useMutation({
        mutationFn: async (name: string): Promise<string> => {
            const greetMsg: string = await invoke(
                'greet',
                { name: name },
            );
            return greetMsg;
        },
    });

};
