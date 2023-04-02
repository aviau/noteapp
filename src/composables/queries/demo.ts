import { useMutation } from '@tanstack/vue-query';
import { invoke } from '@tauri-apps/api/tauri';
import { DemoGreetPayload } from '@bindings/DemoGreetPayload';
import { DemoGreetResponse } from '@bindings/DemoGreetResponse';

export const useGreetMutation = () => {

    return useMutation({
        mutationFn: async (name: string): Promise<string> => {
            const payload: DemoGreetPayload = { name: name };
            const response: DemoGreetResponse = await invoke(
                'demo_greet',
                { payload: payload },
            );
            return response.greeting;
        },
    });

};
